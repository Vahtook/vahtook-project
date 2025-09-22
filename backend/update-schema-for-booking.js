const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'vahtook_admin'
};

async function updateSchemaForBookingIntegration() {
  let connection;
  
  try {
    console.log('🔍 Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database successfully');

    // Check current table structure
    console.log('📊 Checking current orders table structure...');
    const [columns] = await connection.execute(`SHOW COLUMNS FROM orders`);
    const existingColumns = columns.map(col => col.Field);
    
    // Add receiver information fields if they don't exist
    const fieldsToAdd = [
      {
        name: 'receiver_name',
        definition: 'VARCHAR(100) AFTER destination_longitude',
        description: 'Name of the person receiving the delivery'
      },
      {
        name: 'receiver_phone', 
        definition: 'VARCHAR(20) AFTER receiver_name',
        description: 'Phone number of the receiver'
      },
      {
        name: 'goods_type',
        definition: 'VARCHAR(100) AFTER package_description',
        description: 'Type/category of goods being delivered'
      },
      {
        name: 'payment_method',
        definition: "ENUM('cash', 'card', 'upi', 'wallet') DEFAULT 'cash' AFTER priority",
        description: 'Payment method selected by customer'
      }
    ];

    for (const field of fieldsToAdd) {
      if (!existingColumns.includes(field.name)) {
        console.log(`🔧 Adding ${field.name} column...`);
        await connection.execute(`
          ALTER TABLE orders 
          ADD COLUMN ${field.name} ${field.definition}
        `);
        console.log(`✅ Added ${field.name} column: ${field.description}`);
      } else {
        console.log(`✅ ${field.name} column already exists`);
      }
    }

    // Update fare_amount to allow NULL values for orders without calculated prices
    console.log('🔧 Updating fare_amount to allow NULL values...');
    await connection.execute(`
      ALTER TABLE orders 
      MODIFY COLUMN fare_amount DECIMAL(10, 2) DEFAULT NULL
    `);
    console.log('✅ Updated fare_amount column');

    // Show final table structure
    console.log('📊 Final table structure:');
    const [finalColumns] = await connection.execute(`SHOW COLUMNS FROM orders`);
    finalColumns.forEach(col => {
      console.log(`  - ${col.Field}: ${col.Type} ${col.Null === 'YES' ? '(nullable)' : '(required)'}`);
    });

    console.log('🎉 Database schema updated for booking integration!');

  } catch (error) {
    console.error('❌ Schema update failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the update
updateSchemaForBookingIntegration();