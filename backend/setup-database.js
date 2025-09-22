const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Database configuration for initial setup (without database name)
const setupConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  port: process.env.DB_PORT || 3306
};

// Database configuration with database name
const dbConfig = {
  ...setupConfig,
  database: process.env.DB_NAME || 'vahtook_admin'
};

async function setupDatabase() {
  let connection;
  
  try {
    console.log('🔍 Connecting to MySQL server...');
    connection = await mysql.createConnection(setupConfig);
    console.log('✅ Connected to MySQL server');

    // Create database
    console.log('🗄️  Creating database...');
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'vahtook_admin'}`);
    console.log('✅ Database created successfully');

    // Close initial connection
    await connection.end();

    // Connect to the specific database
    console.log('🔗 Connecting to vahtook_admin database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to vahtook_admin database');

    // Create tables
    console.log('📊 Creating tables...');
    
    // Create admins table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        role ENUM('super_admin', 'admin', 'operator') DEFAULT 'admin',
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create orders table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(20) UNIQUE NOT NULL,
        customer_name VARCHAR(100) NOT NULL,
        customer_phone VARCHAR(20) NOT NULL,
        customer_email VARCHAR(100),
        pickup_address TEXT NOT NULL,
        pickup_latitude DECIMAL(10, 8),
        pickup_longitude DECIMAL(11, 8),
        destination_address TEXT NOT NULL,
        destination_latitude DECIMAL(10, 8),
        destination_longitude DECIMAL(11, 8),
        vehicle_type ENUM('bike', 'three_wheeler', 'four_wheeler', 'truck') NOT NULL,
        package_description TEXT,
        package_weight DECIMAL(8, 2),
        dimensions VARCHAR(100),
        fare_amount DECIMAL(10, 2) NOT NULL,
        status ENUM('new', 'confirmed', 'assigned', 'picked_up', 'in_transit', 'delivered', 'cancelled') DEFAULT 'new',
        priority ENUM('normal', 'high', 'urgent') DEFAULT 'normal',
        payment_method ENUM('cash', 'card', 'upi', 'wallet') DEFAULT 'cash',
        payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
        driver_id INT,
        driver_name VARCHAR(100),
        driver_phone VARCHAR(20),
        estimated_delivery DATETIME,
        actual_delivery DATETIME,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_order_number (order_number),
        INDEX idx_status (status),
        INDEX idx_customer_phone (customer_phone),
        INDEX idx_created_at (created_at)
      )
    `);

    // Create order status history table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS order_status_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        old_status VARCHAR(50),
        new_status VARCHAR(50) NOT NULL,
        changed_by INT,
        reason TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        INDEX idx_order_id (order_id),
        INDEX idx_created_at (created_at)
      )
    `);

    console.log('✅ Tables created successfully');

    // Insert default admin user
    console.log('👤 Creating default admin user...');
    const passwordHash = await bcrypt.hash('adminvahtook123', 10);
    
    await connection.execute(`
      INSERT INTO admins (username, email, password_hash, full_name, role) 
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE email=VALUES(email), password_hash=VALUES(password_hash)
    `, ['admin', 'adminpanel@vahtook.com', passwordHash, 'Super Admin', 'super_admin']);

    console.log('✅ Default admin user created');
    console.log('📝 Login credentials: adminpanel@vahtook.com / adminvahtook123');

    // Insert sample orders
    console.log('📦 Creating sample orders...');
    
    const sampleOrders = [
      {
        order_number: 'VTK001',
        customer_name: 'John Doe',
        customer_phone: '+91-9876543210',
        customer_email: 'john.doe@email.com',
        pickup_address: 'Connaught Place, New Delhi, Delhi 110001',
        destination_address: 'India Gate, New Delhi, Delhi 110003',
        vehicle_type: 'bike',
        package_description: 'Document delivery',
        package_weight: 0.5,
        fare_amount: 150.00,
        status: 'new',
        priority: 'normal',
        payment_method: 'cash'
      },
      {
        order_number: 'VTK002',
        customer_name: 'Alice Smith',
        customer_phone: '+91-9876543211',
        customer_email: 'alice.smith@email.com',
        pickup_address: 'Khan Market, New Delhi, Delhi 110003',
        destination_address: 'Lajpat Nagar, New Delhi, Delhi 110024',
        vehicle_type: 'three_wheeler',
        package_description: 'Food delivery',
        package_weight: 2.5,
        fare_amount: 250.00,
        status: 'confirmed',
        priority: 'high',
        payment_method: 'upi'
      },
      {
        order_number: 'VTK003',
        customer_name: 'Bob Johnson',
        customer_phone: '+91-9876543212',
        customer_email: 'bob.johnson@email.com',
        pickup_address: 'Karol Bagh, New Delhi, Delhi 110005',
        destination_address: 'Dwarka, New Delhi, Delhi 110075',
        vehicle_type: 'four_wheeler',
        package_description: 'Electronics delivery',
        package_weight: 15.0,
        fare_amount: 800.00,
        status: 'assigned',
        priority: 'normal',
        payment_method: 'card',
        driver_name: 'Rajesh Kumar',
        driver_phone: '+91-9876543220'
      },
      {
        order_number: 'VTK004',
        customer_name: 'Sarah Wilson',
        customer_phone: '+91-9876543213',
        customer_email: 'sarah.wilson@email.com',
        pickup_address: 'Saket, New Delhi, Delhi 110017',
        destination_address: 'Vasant Kunj, New Delhi, Delhi 110070',
        vehicle_type: 'bike',
        package_description: 'Medicine delivery',
        package_weight: 1.0,
        fare_amount: 180.00,
        status: 'delivered',
        priority: 'urgent',
        payment_method: 'cash',
        driver_name: 'Amit Singh',
        driver_phone: '+91-9876543221',
        actual_delivery: new Date()
      },
      {
        order_number: 'VTK005',
        customer_name: 'Mike Davis',
        customer_phone: '+91-9876543214',
        customer_email: 'mike.davis@email.com',
        pickup_address: 'Rohini, New Delhi, Delhi 110085',
        destination_address: 'Janakpuri, New Delhi, Delhi 110058',
        vehicle_type: 'truck',
        package_description: 'Furniture delivery',
        package_weight: 250.0,
        fare_amount: 1500.00,
        status: 'in_transit',
        priority: 'normal',
        payment_method: 'upi',
        driver_name: 'Suresh Verma',
        driver_phone: '+91-9876543222'
      }
    ];

    for (const order of sampleOrders) {
      await connection.execute(`
        INSERT INTO orders (
          order_number, customer_name, customer_phone, customer_email,
          pickup_address, destination_address, vehicle_type, package_description,
          package_weight, fare_amount, status, priority, payment_method,
          driver_name, driver_phone, actual_delivery
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE id=id
      `, [
        order.order_number, order.customer_name, order.customer_phone, order.customer_email,
        order.pickup_address, order.destination_address, order.vehicle_type, order.package_description,
        order.package_weight, order.fare_amount, order.status, order.priority, order.payment_method,
        order.driver_name || null, order.driver_phone || null, order.actual_delivery || null
      ]);
    }

    console.log('✅ Sample orders created successfully');
    console.log('🎉 Database setup complete!');
    console.log('');
    console.log('📊 Summary:');
    console.log('- Database: vahtook_admin');
    console.log('- Admin user: adminpanel@vahtook.com (password: adminvahtook123)');
    console.log('- Sample orders: 5 orders with different statuses');
    console.log('');
    console.log('🚀 You can now start the backend server with: npm run dev');

  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.error('');
    console.error('💡 Common issues:');
    console.error('- Make sure MySQL is running');
    console.error('- Check your .env file credentials');
    console.error('- Verify DB_PASSWORD matches your MySQL root password');
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the setup
setupDatabase();