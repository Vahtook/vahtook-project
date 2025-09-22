const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'vahtook_admin'
};

async function fixDatabaseSchema() {
  let connection;
  
  try {
    console.log('🔍 Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database successfully');

    // Check if the order_status_history table exists and its structure
    console.log('📊 Checking order_status_history table structure...');
    
    const [columns] = await connection.execute(`
      SHOW COLUMNS FROM order_status_history
    `);
    
    console.log('Current columns:', columns.map(col => col.Field));
    
    // Check if we need to add the previous_status column
    const hasPreviousStatus = columns.some(col => col.Field === 'previous_status');
    const hasOldStatus = columns.some(col => col.Field === 'old_status');
    
    if (!hasPreviousStatus && hasOldStatus) {
      console.log('🔧 Renaming old_status column to previous_status...');
      await connection.execute(`
        ALTER TABLE order_status_history 
        CHANGE COLUMN old_status previous_status ENUM('new', 'confirmed', 'assigned', 'picked_up', 'in_transit', 'delivered', 'cancelled')
      `);
      console.log('✅ Column renamed successfully');
    } else if (!hasPreviousStatus && !hasOldStatus) {
      console.log('🔧 Adding previous_status column...');
      await connection.execute(`
        ALTER TABLE order_status_history 
        ADD COLUMN previous_status ENUM('new', 'confirmed', 'assigned', 'picked_up', 'in_transit', 'delivered', 'cancelled') AFTER order_id
      `);
      console.log('✅ Column added successfully');
    } else {
      console.log('✅ previous_status column already exists');
    }

    // Update the new_status column to use ENUM if it's not already
    console.log('🔧 Updating new_status column to use ENUM...');
    await connection.execute(`
      ALTER TABLE order_status_history 
      MODIFY COLUMN new_status ENUM('new', 'confirmed', 'assigned', 'picked_up', 'in_transit', 'delivered', 'cancelled') NOT NULL
    `);
    console.log('✅ new_status column updated');

    // Check if we need to add the admin-related columns
    const hasAdminId = columns.some(col => col.Field === 'changed_by_admin_id');
    const hasAdminName = columns.some(col => col.Field === 'changed_by_admin_name');
    const hasChangeReason = columns.some(col => col.Field === 'change_reason');

    if (!hasAdminId) {
      console.log('🔧 Adding changed_by_admin_id column...');
      await connection.execute(`
        ALTER TABLE order_status_history 
        ADD COLUMN changed_by_admin_id INT AFTER new_status
      `);
      console.log('✅ changed_by_admin_id column added');
    }

    if (!hasAdminName) {
      console.log('🔧 Adding changed_by_admin_name column...');
      await connection.execute(`
        ALTER TABLE order_status_history 
        ADD COLUMN changed_by_admin_name VARCHAR(100) AFTER changed_by_admin_id
      `);
      console.log('✅ changed_by_admin_name column added');
    }

    if (!hasChangeReason) {
      console.log('🔧 Adding change_reason column...');
      await connection.execute(`
        ALTER TABLE order_status_history 
        ADD COLUMN change_reason VARCHAR(255) AFTER changed_by_admin_name
      `);
      console.log('✅ change_reason column added');
    }

    // Remove the old 'changed_by' and 'reason' columns if they exist
    const hasChangedBy = columns.some(col => col.Field === 'changed_by');
    const hasReason = columns.some(col => col.Field === 'reason');

    if (hasChangedBy) {
      console.log('🔧 Removing old changed_by column...');
      await connection.execute(`
        ALTER TABLE order_status_history 
        DROP COLUMN changed_by
      `);
      console.log('✅ changed_by column removed');
    }

    if (hasReason) {
      console.log('🔧 Removing old reason column...');
      await connection.execute(`
        ALTER TABLE order_status_history 
        DROP COLUMN reason
      `);
      console.log('✅ reason column removed');
    }

    // Show final structure
    console.log('📊 Final table structure:');
    const [finalColumns] = await connection.execute(`
      SHOW COLUMNS FROM order_status_history
    `);
    
    finalColumns.forEach(col => {
      console.log(`  - ${col.Field}: ${col.Type}`);
    });

    console.log('🎉 Database schema fixed successfully!');

  } catch (error) {
    console.error('❌ Schema fix failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the fix
fixDatabaseSchema();