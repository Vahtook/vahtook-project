-- Vahtook Admin Panel Database Schema

-- Create database (run this first)
CREATE DATABASE IF NOT EXISTS vahtook_admin;
USE vahtook_admin;

-- Admins table for authentication
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
);

-- Orders table for storing all order information
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
    package_weight DECIMAL(8, 2), -- in kg
    package_dimensions VARCHAR(100), -- LxWxH format
    estimated_distance DECIMAL(8, 2), -- in km
    estimated_duration INT, -- in minutes
    fare_amount DECIMAL(10, 2),
    status ENUM('new', 'confirmed', 'assigned', 'picked_up', 'in_transit', 'delivered', 'cancelled') DEFAULT 'new',
    priority ENUM('low', 'normal', 'high', 'urgent') DEFAULT 'normal',
    driver_id INT,
    driver_name VARCHAR(100),
    driver_phone VARCHAR(20),
    pickup_time DATETIME,
    delivery_time DATETIME,
    notes TEXT,
    admin_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_order_number (order_number),
    INDEX idx_customer_phone (customer_phone)
);

-- Order status history for tracking changes
CREATE TABLE IF NOT EXISTS order_status_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    previous_status ENUM('new', 'confirmed', 'assigned', 'picked_up', 'in_transit', 'delivered', 'cancelled'),
    new_status ENUM('new', 'confirmed', 'assigned', 'picked_up', 'in_transit', 'delivered', 'cancelled') NOT NULL,
    changed_by_admin_id INT,
    changed_by_admin_name VARCHAR(100),
    change_reason VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    INDEX idx_order_id (order_id),
    INDEX idx_created_at (created_at)
);

-- Insert a default admin user (password: admin123 - hashed)
INSERT INTO admins (username, email, password_hash, full_name, role) 
VALUES ('admin', 'admin@vahtook.com', '$2b$10$8K1p/a8jqO.xTQTOIL3vfOPkAo9K6KQHkBfkpI3.0GtDGz8LZQq1K', 'Super Admin', 'super_admin')
ON DUPLICATE KEY UPDATE id=id;

-- Insert some sample orders for testing
INSERT INTO orders (
    order_number, customer_name, customer_phone, customer_email,
    pickup_address, destination_address, vehicle_type, package_description,
    package_weight, fare_amount, status, priority
) VALUES 
(
    'VHT001', 'John Doe', '+91-9876543210', 'john@example.com',
    '123 MG Road, Bangalore, Karnataka 560001', '456 Brigade Road, Bangalore, Karnataka 560025',
    'bike', 'Documents and small package', 0.5, 150.00, 'new', 'normal'
),
(
    'VHT002', 'Jane Smith', '+91-9876543211', 'jane@example.com',
    '789 Commercial Street, Bangalore, Karnataka 560001', '321 Indiranagar, Bangalore, Karnataka 560038',
    'three_wheeler', 'Groceries and household items', 15.0, 280.00, 'confirmed', 'high'
),
(
    'VHT003', 'Raj Kumar', '+91-9876543212', 'raj@example.com',
    '101 Whitefield, Bangalore, Karnataka 560066', '202 Electronic City, Bangalore, Karnataka 560100',
    'four_wheeler', 'Furniture and electronics', 45.0, 450.00, 'assigned', 'normal'
),
(
    'VHT004', 'Priya Sharma', '+91-9876543213', 'priya@example.com',
    '555 Koramangala, Bangalore, Karnataka 560034', '777 HSR Layout, Bangalore, Karnataka 560102',
    'bike', 'Food delivery', 2.0, 120.00, 'delivered', 'urgent'
)
ON DUPLICATE KEY UPDATE id=id;