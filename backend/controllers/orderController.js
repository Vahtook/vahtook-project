const Order = require('../models/Order');
const sseController = require('./sseController');

class OrderController {
  // Create a new order from frontend booking
  static async createOrder(req, res) {
    console.log('🎬 STEP 1: Method entry');
    console.log('🎬 STEP 2: req exists:', !!req);
    console.log('🎬 STEP 3: res exists:', !!res);
    console.log('🎬 STEP 4: req.body exists:', !!req.body);
    
    try {
      console.log('🎬 STEP 5: About to stringify request body');
      console.log('📥 Received booking request:', JSON.stringify(req.body, null, 2));
      
      const {
        address,
        selectedOption,
        vehicleType,
        value: goodsDescription
      } = req.body;

      console.log('🔍 Extracted data:', {
        address,
        selectedOption,
        vehicleType,
        goodsDescription
      });

      // Validate required fields
      if (!address || !address.pickup || !address.destination || !selectedOption || !vehicleType) {
        console.log('❌ Validation failed - missing basic fields');
        return res.status(400).json({
          success: false,
          message: 'Missing required booking information'
        });
      }

      // Check specific customer data
      if (!address.pickup.name) {
        console.log('❌ Missing customer name:', address.pickup);
        return res.status(400).json({
          success: false,
          message: 'customer_name is required'
        });
      }

      if (!address.pickup.phone) {
        console.log('❌ Missing customer phone:', address.pickup);
        return res.status(400).json({
          success: false,
          message: 'customer_phone is required'
        });
      }

      console.log('✅ All validations passed');

      // Map frontend vehicle types to database types
      const vehicleTypeMap = {
        'bike': 'bike',
        'auto': 'three_wheeler', 
        'truck': 'truck',
        'fourWheeler': 'four_wheeler'
      };

      // Prepare order data for database
      const orderData = {
        // Customer information from pickup details
        customer_name: address.pickup.name,
        customer_phone: address.pickup.phone,
        customer_email: null, // Not collected in booking form
        
        // Pickup information
        pickup_address: address.pickup.location,
        pickup_latitude: null, // Can be added later if needed
        pickup_longitude: null,
        
        // Destination information  
        destination_address: address.destination.location,
        destination_latitude: null,
        destination_longitude: null,
        
        // Order details
        vehicle_type: vehicleTypeMap[vehicleType] || vehicleType,
        package_description: `${selectedOption}${goodsDescription ? ': ' + goodsDescription : ''}`,
        package_weight: null, // Not specified in booking
        package_dimensions: null,
        estimated_distance: null,
        estimated_duration: null,
        fare_amount: 0, // To be calculated/updated later
        priority: 'normal',
        
        // Additional booking information
        receiver_name: address.destination.name,
        receiver_phone: address.destination.phone,
        goods_type: selectedOption,
        payment_method: 'cash'
      };

      const result = await Order.create(orderData);

      if (result.success) {
        // Notify admin panel via SSE about new order
        try {
          await sseController.notifyNewOrder(result.orderId);
        } catch (sseError) {
          console.error('SSE notification error:', sseError);
          // Don't fail the order creation if SSE fails
        }

        res.status(201).json({
          success: true,
          message: 'Booking confirmed successfully',
          data: {
            orderId: result.orderId,
            orderNumber: result.orderNumber
          }
        });
      } else {
        res.status(500).json({
          success: false,
          message: result.error || 'Failed to create order'
        });
      }
    } catch (error) {
      console.error('Create order error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get all orders with filtering and pagination
  static async getAllOrders(req, res) {
    try {
      const options = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 20,
        status: req.query.status,
        priority: req.query.priority,
        vehicle_type: req.query.vehicle_type,
        search: req.query.search,
        date_from: req.query.date_from,
        date_to: req.query.date_to,
        sort_by: req.query.sort_by || 'created_at',
        sort_order: req.query.sort_order || 'DESC'
      };

      const result = await Order.getAll(options);

      if (result.success) {
        res.json({
          success: true,
          data: result.data
        });
      } else {
        res.status(500).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      console.error('Get all orders error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get order by ID
  static async getOrderById(req, res) {
    try {
      const { id } = req.params;
      const result = await Order.getById(id);

      if (result.success) {
        res.json({
          success: true,
          data: {
            order: result.order
          }
        });
      } else {
        res.status(404).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      console.error('Get order by ID error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Create new order
  static async createOrder(req, res) {
    try {
      const orderData = req.body;

      // Validate required fields
      const requiredFields = [
        'customer_name', 'customer_phone', 'pickup_address',
        'destination_address', 'vehicle_type'
      ];

      for (const field of requiredFields) {
        if (!orderData[field]) {
          return res.status(400).json({
            success: false,
            message: `${field} is required`
          });
        }
      }

      const result = await Order.create(orderData);

      if (result.success) {
        res.status(201).json({
          success: true,
          message: 'Order created successfully',
          data: {
            orderId: result.orderId,
            orderNumber: result.orderNumber
          }
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      console.error('Create order error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Update order status
  static async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, reason } = req.body;

      if (!status) {
        return res.status(400).json({
          success: false,
          message: 'Status is required'
        });
      }

      // Validate status
      const validStatuses = ['new', 'confirmed', 'assigned', 'picked_up', 'in_transit', 'delivered', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status'
        });
      }

      const result = await Order.updateStatus(
        id, 
        status, 
        req.admin.id, 
        req.admin.full_name, 
        reason
      );

      if (result.success) {
        // Notify all connected clients via SSE
        await sseController.notifyOrderUpdate(id, 'status_change');

        res.json({
          success: true,
          message: result.message,
          data: {
            previousStatus: result.previousStatus,
            newStatus: result.newStatus
          }
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      console.error('Update order status error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Update order details
  static async updateOrder(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const result = await Order.update(id, updateData);

      if (result.success) {
        res.json({
          success: true,
          message: result.message
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      console.error('Update order error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get order status history
  static async getOrderHistory(req, res) {
    try {
      const { id } = req.params;
      const result = await Order.getStatusHistory(id);

      if (result.success) {
        res.json({
          success: true,
          data: {
            history: result.history
          }
        });
      } else {
        res.status(500).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      console.error('Get order history error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get recent orders (for dashboard)
  static async getRecentOrders(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const result = await Order.getRecent(limit);

      if (result.success) {
        res.json({
          success: true,
          data: {
            orders: result.orders
          }
        });
      } else {
        res.status(500).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      console.error('Get recent orders error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get orders by status
  static async getOrdersByStatus(req, res) {
    try {
      const { status } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit) : null;
      
      const result = await Order.getByStatus(status, limit);

      if (result.success) {
        res.json({
          success: true,
          data: {
            orders: result.orders,
            status: status
          }
        });
      } else {
        res.status(500).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      console.error('Get orders by status error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get order statistics
  static async getStatistics(req, res) {
    try {
      const result = await Order.getStatistics();

      if (result.success) {
        res.json({
          success: true,
          data: {
            statistics: result.statistics
          }
        });
      } else {
        res.status(500).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      console.error('Get statistics error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Delete order
  static async deleteOrder(req, res) {
    try {
      const { id } = req.params;
      const result = await Order.delete(id);

      if (result.success) {
        res.json({
          success: true,
          message: result.message
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      console.error('Delete order error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Search orders
  static async searchOrders(req, res) {
    try {
      const { q } = req.query;
      
      if (!q) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
      }

      const options = {
        search: q,
        limit: parseInt(req.query.limit) || 20,
        page: parseInt(req.query.page) || 1
      };

      const result = await Order.getAll(options);

      if (result.success) {
        res.json({
          success: true,
          data: result.data,
          query: q
        });
      } else {
        res.status(500).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      console.error('Search orders error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = OrderController;