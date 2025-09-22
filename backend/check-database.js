const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'vahtook_admin',
  port: process.env.DB_PORT || 3306
};

async function checkDatabase() {
  let connection;
  
  try {
    console.log('🔍 Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database successfully');

    // Check if database exists
    console.log('\n📊 Checking database and tables...');
    
    // Check admins table
    console.log('\n👥 ADMINS TABLE:');
    const [admins] = await connection.execute('SELECT id, username, email, full_name, role, created_at FROM admins');
    console.log(`Found ${admins.length} admin(s):`);
    admins.forEach(admin => {
      console.log(`  - ${admin.full_name} (${admin.email}) - Role: ${admin.role}`);
    });

    // Check orders table
    console.log('\n📦 ORDERS TABLE:');
    const [orders] = await connection.execute('SELECT id, order_number, customer_name, status, fare_amount, created_at FROM orders ORDER BY created_at DESC');
    console.log(`Found ${orders.length} order(s):`);
    orders.forEach(order => {
      console.log(`  - ${order.order_number}: ${order.customer_name} - Status: ${order.status} - ₹${order.fare_amount}`);
    });

    // Check order status distribution
    console.log('\n📈 ORDER STATUS DISTRIBUTION:');
    const [statusCount] = await connection.execute('SELECT status, COUNT(*) as count FROM orders GROUP BY status');
    statusCount.forEach(status => {
      console.log(`  - ${status.status}: ${status.count} orders`);
    });

    // Check total revenue
    console.log('\n💰 REVENUE SUMMARY:');
    const [revenue] = await connection.execute('SELECT SUM(fare_amount) as total_revenue, AVG(fare_amount) as avg_fare FROM orders');
    if (revenue[0].total_revenue) {
      console.log(`  - Total Revenue: ₹${revenue[0].total_revenue}`);
      console.log(`  - Average Fare: ₹${revenue[0].avg_fare.toFixed(2)}`);
    }

    console.log('\n✅ Database check completed successfully!');

  } catch (error) {
    console.error('❌ Database check failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure MySQL is running (try starting XAMPP or MySQL service)');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('💡 Database "vahtook_admin" does not exist. Run setup-database.js first.');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('💡 Check your MySQL credentials in .env file');
    }
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

console.log('🔍 Checking Vahtook Admin Panel Database...');
console.log('📂 Database:', process.env.DB_NAME || 'vahtook_admin');
console.log('🔗 Host:', process.env.DB_HOST || 'localhost');
console.log('👤 User:', process.env.DB_USER || 'root');
console.log('');

checkDatabase();