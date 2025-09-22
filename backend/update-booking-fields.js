// Update database schema to add booking-specific fields
require('dotenv').config();
const mysql = require('mysql2/promise');

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'vahtook_admin'
};

async function updateBookingFields() {
    let connection;
    
    try {
        console.log('🔍 Connecting to database...');
        connection = await mysql.createConnection(dbConfig);
        console.log('✅ Connected to database successfully');

        // Check current columns in orders table
        console.log('\n📊 Checking current orders table structure...');
        const [columns] = await connection.execute(`
            SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'orders'
            ORDER BY ORDINAL_POSITION
        `, [process.env.DB_NAME || 'vahtook_admin']);

        console.log('Current columns:');
        columns.forEach(col => {
            console.log(`  - ${col.COLUMN_NAME}: ${col.DATA_TYPE}${col.IS_NULLABLE === 'YES' ? ' (nullable)' : ''}`);
        });

        // Add new fields for customer booking data
        const fieldsToAdd = [
            {
                name: 'receiver_name',
                sql: 'ADD COLUMN receiver_name VARCHAR(100) NULL AFTER destination_longitude',
                description: 'Name of the person receiving the package'
            },
            {
                name: 'receiver_phone',
                sql: 'ADD COLUMN receiver_phone VARCHAR(20) NULL AFTER receiver_name',
                description: 'Phone number of the receiver'
            },
            {
                name: 'goods_type',
                sql: 'ADD COLUMN goods_type VARCHAR(100) NULL AFTER receiver_phone',
                description: 'Type of goods being transported'
            },
            {
                name: 'payment_method',
                sql: "ADD COLUMN payment_method ENUM('cash', 'online', 'card') DEFAULT 'cash' AFTER goods_type",
                description: 'Payment method chosen by customer'
            }
        ];

        console.log('\n🔧 Adding new booking fields...');
        
        for (const field of fieldsToAdd) {
            try {
                // Check if field already exists
                const fieldExists = columns.some(col => col.COLUMN_NAME === field.name);
                
                if (fieldExists) {
                    console.log(`✅ Field '${field.name}' already exists`);
                } else {
                    await connection.execute(`ALTER TABLE orders ${field.sql}`);
                    console.log(`✅ Added field '${field.name}' - ${field.description}`);
                }
            } catch (error) {
                if (error.code === 'ER_DUP_FIELDNAME') {
                    console.log(`✅ Field '${field.name}' already exists`);
                } else {
                    console.error(`❌ Error adding field '${field.name}':`, error.message);
                }
            }
        }

        // Verify the updated structure
        console.log('\n📊 Updated orders table structure:');
        const [updatedColumns] = await connection.execute(`
            SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'orders'
            ORDER BY ORDINAL_POSITION
        `, [process.env.DB_NAME || 'vahtook_admin']);

        updatedColumns.forEach(col => {
            console.log(`  - ${col.COLUMN_NAME}: ${col.DATA_TYPE}${col.IS_NULLABLE === 'YES' ? ' (nullable)' : ''}`);
        });

        console.log('\n✅ Database schema update completed successfully!');

    } catch (error) {
        console.error('❌ Database update failed:', error);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
            console.log('🔒 Database connection closed');
        }
    }
}

// Run the update
updateBookingFields();