const Order = require('../models/Order');
const { verifyToken } = require('../middleware/auth');

class SSEController {
  constructor() {
    this.clients = new Map(); // Store connected clients
    this.lastUpdateTime = new Date();
  }

  // SSE endpoint for real-time order updates
  async connect(req, res) {
    try {
      // Get token from Authorization header or query parameter
      const authHeader = req.headers['authorization'];
      const tokenFromHeader = authHeader && authHeader.split(' ')[1];
      const tokenFromQuery = req.query.token;
      const token = tokenFromHeader || tokenFromQuery;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Access token required'
        });
      }

      const decoded = verifyToken(token);
      if (!decoded) {
        return res.status(401).json({
          success: false,
          message: 'Invalid token'
        });
      }

      // Set SSE headers
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': req.headers.origin || '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Cache-Control'
      });

      const clientId = `${decoded.adminId}-${Date.now()}`;
      
      // Store client connection
      this.clients.set(clientId, {
        response: res,
        adminId: decoded.adminId,
        connectedAt: new Date()
      });

      console.log(`SSE client connected: ${clientId} (Admin: ${decoded.adminId})`);

      // Send initial connection message
      this.sendToClient(clientId, {
        type: 'connected',
        message: 'Connected to order updates',
        timestamp: new Date().toISOString()
      });

      // Send initial data
      await this.sendInitialData(clientId);

      // Handle client disconnect
      req.on('close', () => {
        console.log(`SSE client disconnected: ${clientId}`);
        this.clients.delete(clientId);
      });

      req.on('error', (error) => {
        console.error(`SSE client error for ${clientId}:`, error);
        this.clients.delete(clientId);
      });

    } catch (error) {
      console.error('SSE connection error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to establish SSE connection'
      });
    }
  }

  // Send data to a specific client
  sendToClient(clientId, data) {
    const client = this.clients.get(clientId);
    if (client && client.response) {
      try {
        const formattedData = `data: ${JSON.stringify(data)}\n\n`;
        client.response.write(formattedData);
      } catch (error) {
        console.error(`Error sending data to client ${clientId}:`, error);
        this.clients.delete(clientId);
      }
    }
  }

  // Send data to all connected clients
  broadcast(data) {
    for (const [clientId, client] of this.clients) {
      this.sendToClient(clientId, data);
    }
  }

  // Send initial data when client connects
  async sendInitialData(clientId) {
    try {
      // Send recent orders
      const recentOrdersResult = await Order.getRecent(10);
      if (recentOrdersResult.success) {
        this.sendToClient(clientId, {
          type: 'initial_orders',
          data: recentOrdersResult.orders,
          timestamp: new Date().toISOString()
        });
      }

      // Send statistics
      const statsResult = await Order.getStatistics();
      if (statsResult.success) {
        this.sendToClient(clientId, {
          type: 'statistics',
          data: statsResult.statistics,
          timestamp: new Date().toISOString()
        });
      }

    } catch (error) {
      console.error('Error sending initial data:', error);
    }
  }

  // Periodic update function (called every 10 seconds)
  async sendPeriodicUpdates() {
    try {
      if (this.clients.size === 0) {
        return; // No clients connected
      }

      // Get recent orders and statistics
      const [recentOrdersResult, statsResult] = await Promise.all([
        Order.getRecent(10),
        Order.getStatistics()
      ]);

      const updateData = {
        type: 'periodic_update',
        timestamp: new Date().toISOString(),
        data: {}
      };

      if (recentOrdersResult.success) {
        updateData.data.recent_orders = recentOrdersResult.orders;
      }

      if (statsResult.success) {
        updateData.data.statistics = statsResult.statistics;
      }

      // Broadcast to all clients
      this.broadcast(updateData);

      console.log(`Periodic update sent to ${this.clients.size} clients`);

    } catch (error) {
      console.error('Error in periodic updates:', error);
    }
  }

  // Send update when order status changes
  async notifyOrderUpdate(orderId, updateType = 'status_change') {
    try {
      if (this.clients.size === 0) {
        return; // No clients connected
      }

      const orderResult = await Order.getById(orderId);
      if (!orderResult.success) {
        return;
      }

      const updateData = {
        type: updateType,
        data: {
          order: orderResult.order
        },
        timestamp: new Date().toISOString()
      };

      // Broadcast to all clients
      this.broadcast(updateData);

      console.log(`Order update notification sent for order ${orderId}`);

    } catch (error) {
      console.error('Error sending order update notification:', error);
    }
  }

  // Send update when new order is created
  async notifyNewOrder(orderId) {
    await this.notifyOrderUpdate(orderId, 'new_order');
  }

  // Get connected clients info
  getClientsInfo() {
    const clientsInfo = [];
    for (const [clientId, client] of this.clients) {
      clientsInfo.push({
        clientId,
        adminId: client.adminId,
        connectedAt: client.connectedAt,
        connectedFor: Date.now() - client.connectedAt.getTime()
      });
    }
    return clientsInfo;
  }

  // Start periodic updates
  startPeriodicUpdates() {
    // Send updates every 10 seconds
    setInterval(() => {
      this.sendPeriodicUpdates();
    }, 10000);

    console.log('SSE periodic updates started (10 second interval)');
  }

  // Stop all connections
  disconnect() {
    for (const [clientId, client] of this.clients) {
      try {
        this.sendToClient(clientId, {
          type: 'server_shutdown',
          message: 'Server is shutting down',
          timestamp: new Date().toISOString()
        });
        client.response.end();
      } catch (error) {
        console.error(`Error disconnecting client ${clientId}:`, error);
      }
    }
    this.clients.clear();
  }
}

// Create singleton instance
const sseController = new SSEController();

module.exports = sseController;