const { executeQuery, executeTransaction } = require('../database/connection');

class Order {
  // Create a new order
  static async create(orderData) {
    const {
      customer_name, customer_phone, customer_email,
      pickup_address, pickup_latitude, pickup_longitude,
      destination_address, destination_latitude, destination_longitude,
      receiver_name, receiver_phone,
      vehicle_type, package_description, goods_type, package_weight, package_dimensions,
      estimated_distance, estimated_duration, fare_amount, priority = 'normal',
      payment_method = 'cash'
    } = orderData;

    try {
      // Generate order number
      const order_number = await this.generateOrderNumber();

      const query = `
        INSERT INTO orders (
          order_number, customer_name, customer_phone, customer_email,
          pickup_address, pickup_latitude, pickup_longitude,
          destination_address, destination_latitude, destination_longitude,
          receiver_name, receiver_phone,
          vehicle_type, package_description, goods_type, package_weight, package_dimensions,
          estimated_distance, estimated_duration, fare_amount, priority, payment_method
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        order_number, customer_name, customer_phone, customer_email,
        pickup_address, pickup_latitude, pickup_longitude,
        destination_address, destination_latitude, destination_longitude,
        receiver_name, receiver_phone,
        vehicle_type, package_description, goods_type, package_weight, package_dimensions,
        estimated_distance, estimated_duration, fare_amount, priority, payment_method
      ];

      const result = await executeQuery(query, values);

      if (result.success) {
        return { success: true, orderId: result.data.insertId, orderNumber: order_number };
      }

      return { success: false, error: result.error };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Generate unique order number
  static async generateOrderNumber() {
    const prefix = 'VHT';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return `${prefix}${timestamp}${random}`;
  }

  // Get all orders with pagination and filtering
  static async getAll(options = {}) {
    const {
      page = 1,
      limit = 20,
      status,
      priority,
      vehicle_type,
      search,
      date_from,
      date_to,
      sort_by = 'created_at',
      sort_order = 'DESC'
    } = options;

    try {
      let whereConditions = [];
      let whereValues = [];

      // Build WHERE clause
      if (status) {
        whereConditions.push('status = ?');
        whereValues.push(status);
      }

      if (priority) {
        whereConditions.push('priority = ?');
        whereValues.push(priority);
      }

      if (vehicle_type) {
        whereConditions.push('vehicle_type = ?');
        whereValues.push(vehicle_type);
      }

      if (search) {
        whereConditions.push('(order_number LIKE ? OR customer_name LIKE ? OR customer_phone LIKE ?)');
        const searchPattern = `%${search}%`;
        whereValues.push(searchPattern, searchPattern, searchPattern);
      }

      if (date_from) {
        whereConditions.push('DATE(created_at) >= ?');
        whereValues.push(date_from);
      }

      if (date_to) {
        whereConditions.push('DATE(created_at) <= ?');
        whereValues.push(date_to);
      }

      const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

      // Count total records
      const countQuery = `SELECT COUNT(*) as total FROM orders ${whereClause}`;
      const countResult = await executeQuery(countQuery, whereValues);

      if (!countResult.success) {
        return { success: false, error: countResult.error };
      }

      const total = countResult.data[0].total;
      const totalPages = Math.ceil(total / limit);
      const offset = (page - 1) * limit;

      // Get orders
      const ordersQuery = `
        SELECT * FROM orders 
        ${whereClause}
        ORDER BY ${sort_by} ${sort_order}
        LIMIT ${limit} OFFSET ${offset}
      `;

      const ordersResult = await executeQuery(ordersQuery, whereValues);

      if (ordersResult.success) {
        return {
          success: true,
          data: {
            orders: ordersResult.data,
            pagination: {
              current_page: page,
              total_pages: totalPages,
              total_records: total,
              per_page: limit,
              has_next: page < totalPages,
              has_prev: page > 1
            }
          }
        };
      }

      return { success: false, error: ordersResult.error };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get order by ID
  static async getById(id) {
    const query = 'SELECT * FROM orders WHERE id = ?';
    const result = await executeQuery(query, [id]);

    if (result.success && result.data.length > 0) {
      return { success: true, order: result.data[0] };
    }

    return { success: false, error: 'Order not found' };
  }

  // Get order by order number
  static async getByOrderNumber(orderNumber) {
    const query = 'SELECT * FROM orders WHERE order_number = ?';
    const result = await executeQuery(query, [orderNumber]);

    if (result.success && result.data.length > 0) {
      return { success: true, order: result.data[0] };
    }

    return { success: false, error: 'Order not found' };
  }

  // Update order status
  static async updateStatus(id, newStatus, adminId, adminName, reason = null) {
    try {
      // Get current order details
      const orderResult = await this.getById(id);
      if (!orderResult.success) {
        return { success: false, error: 'Order not found' };
      }

      const currentOrder = orderResult.order;
      const previousStatus = currentOrder.status;

      // Prepare queries for transaction
      const queries = [
        {
          query: `
            UPDATE orders 
            SET status = ?, updated_at = CURRENT_TIMESTAMP 
            WHERE id = ?
          `,
          params: [newStatus, id]
        },
        {
          query: `
            INSERT INTO order_status_history 
            (order_id, previous_status, new_status, changed_by_admin_id, changed_by_admin_name, change_reason)
            VALUES (?, ?, ?, ?, ?, ?)
          `,
          params: [id, previousStatus, newStatus, adminId, adminName, reason]
        }
      ];

      // Execute transaction
      const result = await executeTransaction(queries);

      if (result.success) {
        return { 
          success: true, 
          message: `Order status updated from ${previousStatus} to ${newStatus}`,
          previousStatus,
          newStatus
        };
      }

      return { success: false, error: result.error };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Update order details
  static async update(id, updateData) {
    const allowedFields = [
      'customer_name', 'customer_phone', 'customer_email',
      'pickup_address', 'destination_address', 'vehicle_type',
      'package_description', 'package_weight', 'package_dimensions',
      'estimated_distance', 'estimated_duration', 'fare_amount',
      'priority', 'driver_id', 'driver_name', 'driver_phone',
      'pickup_time', 'delivery_time', 'notes', 'admin_notes'
    ];

    const updateFields = [];
    const updateValues = [];

    for (const [key, value] of Object.entries(updateData)) {
      if (allowedFields.includes(key)) {
        updateFields.push(`${key} = ?`);
        updateValues.push(value);
      }
    }

    if (updateFields.length === 0) {
      return { success: false, error: 'No valid fields to update' };
    }

    updateValues.push(id);

    const query = `
      UPDATE orders 
      SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const result = await executeQuery(query, updateValues);

    if (result.success) {
      return { success: true, message: 'Order updated successfully' };
    }

    return { success: false, error: result.error };
  }

  // Get order status history
  static async getStatusHistory(orderId) {
    const query = `
      SELECT * FROM order_status_history 
      WHERE order_id = ? 
      ORDER BY created_at DESC
    `;

    const result = await executeQuery(query, [orderId]);

    if (result.success) {
      return { success: true, history: result.data };
    }

    return { success: false, error: result.error };
  }

  // Get recent orders (for dashboard)
  static async getRecent(limit = 10) {
    const query = `
      SELECT * FROM orders 
      ORDER BY created_at DESC 
      LIMIT ${limit}
    `;

    const result = await executeQuery(query, []);

    if (result.success) {
      return { success: true, orders: result.data };
    }

    return { success: false, error: result.error };
  }

  // Get orders by status
  static async getByStatus(status, limit = null) {
    let query = 'SELECT * FROM orders WHERE status = ? ORDER BY created_at DESC';
    const params = [status];

    if (limit) {
      query += ' LIMIT ?';
      params.push(limit);
    }

    const result = await executeQuery(query, params);

    if (result.success) {
      return { success: true, orders: result.data };
    }

    return { success: false, error: result.error };
  }

  // Get order statistics
  static async getStatistics() {
    const queries = [
      { name: 'total', query: 'SELECT COUNT(*) as count FROM orders' },
      { name: 'new', query: 'SELECT COUNT(*) as count FROM orders WHERE status = "new"' },
      { name: 'confirmed', query: 'SELECT COUNT(*) as count FROM orders WHERE status = "confirmed"' },
      { name: 'assigned', query: 'SELECT COUNT(*) as count FROM orders WHERE status = "assigned"' },
      { name: 'delivered', query: 'SELECT COUNT(*) as count FROM orders WHERE status = "delivered"' },
      { name: 'today', query: 'SELECT COUNT(*) as count FROM orders WHERE DATE(created_at) = CURDATE()' }
    ];

    try {
      const stats = {};
      
      for (const { name, query } of queries) {
        const result = await executeQuery(query);
        if (result.success) {
          stats[name] = result.data[0].count;
        } else {
          stats[name] = 0;
        }
      }

      return { success: true, statistics: stats };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Delete order (soft delete by updating status)
  static async delete(id) {
    const query = `
      UPDATE orders 
      SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const result = await executeQuery(query, [id]);

    if (result.success) {
      return { success: true, message: 'Order cancelled successfully' };
    }

    return { success: false, error: result.error };
  }
}

module.exports = Order;