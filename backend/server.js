require('dotenv').config(); // must be first

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Import database connection
const { testConnection, initializeDatabase } = require('./database/connection');

// Import routes
const mapRouter = require('./routes/mapRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
const sseRoutes = require('./routes/sseRoutes');

// Import SSE controller
const sseController = require('./controllers/sseController');

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for SSE
  crossOriginEmbedderPolicy: false
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173', 
    'http://localhost:3001',
    'http://localhost:3002', // Add port 3002 for admin panel
    'https://www.vahtook.com',
    process.env.FRONTEND_URL,
    process.env.ADMIN_PANEL_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`📡 ${new Date().toISOString()} - ${req.method} ${req.url}`);
  if (req.method === 'POST') {
    console.log('📦 Request body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// Initialize database
async function initializeApp() {
  try {
    console.log('🚀 Starting Vahtook Admin Panel Server...');
    
    // Test database connection
    console.log('🔍 Testing database connection...');
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.log('⚠️  Database connection failed, but server will continue without database');
      console.log('📝 Note: Authentication and order features will not work without database');
    } else {
      // Initialize database schema
      await initializeDatabase();
      console.log('✅ Database initialized successfully');
    }
    
    console.log('✅ Server initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize application:', error);
    console.log('⚠️  Continuing without database...');
  }
}

// Health check
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/orders', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sse', sseRoutes);
app.use('/api/map', mapRouter);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// 404 handler
app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

// Start server
initializeApp().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`🌟 Vahtook Admin Panel API running on http://localhost:${PORT}`);
    console.log(`📊 Admin Panel URL: ${process.env.ADMIN_PANEL_URL || 'http://localhost:3001'}`);
    console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    
    // Start SSE periodic updates
    sseController.startPeriodicUpdates();
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('🔄 SIGTERM received, shutting down gracefully...');
    sseController.disconnect();
    server.close(() => {
      console.log('✅ Server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('🔄 SIGINT received, shutting down gracefully...');
    sseController.disconnect();
    server.close(() => {
      console.log('✅ Server closed');
      process.exit(0);
    });
  });
}).catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});
