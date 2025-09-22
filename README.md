# 🚀 Vahtook Admin Panel

A modern, real-time logistics management admin panel built with React and Node.js.

## ✨ Features

- **Real-time Updates** - Live order tracking with Server-Sent Events
- **Order Management** - Complete CRUD operations with advanced filtering
- **Status Workflow** - 5-step order status management (NEW → CONFIRMED → ASSIGNED → IN TRANSIT → DELIVERED)
- **Dashboard Analytics** - Statistics overview with recent orders
- **Secure Authentication** - JWT-based admin authentication
- **Responsive Design** - Mobile-friendly interface with Tailwind CSS

## 🏗 Architecture

```
Frontend (React + Vite)  ←→  Backend (Express.js)  ←→  Database (MySQL)
     ↓                           ↓                        ↓
- Dashboard               - RESTful API              - Orders Table
- Orders Management       - JWT Authentication       - Admins Table  
- Real-time Updates       - Server-Sent Events       - Status History
- Status Buttons          - CORS Security
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MySQL 8.0+
- npm or yarn

### 1. Clone & Install
```bash
git clone <repository-url>
cd vahtook-project

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies  
cd ../admin-panel && npm install
```

### 2. Database Setup
```bash
cd backend/
cp .env.example .env
# Edit .env with your MySQL credentials
node setup-database.js
```

### 3. Start Development Servers
```bash
# Terminal 1: Backend
cd backend/
npm run dev

# Terminal 2: Frontend
cd admin-panel/
npm run dev
```

### 4. Access Application
- **Admin Panel**: http://localhost:3001
- **API Server**: http://localhost:5000
- **Login**: admin@vahtook.com / admin123

## 📖 Documentation

For complete setup instructions, see: [ADMIN_PANEL_SETUP.md](./ADMIN_PANEL_SETUP.md)

## 🛠 Development

### Available Scripts

**Backend:**
```bash
npm run dev      # Start with auto-restart
npm run start    # Production start
npm run setup    # Initialize database
npm run check-db # Verify database
```

**Frontend:**
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

### Project Structure

```
vahtook-project/
├── admin-panel/           # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Main application pages
│   │   ├── contexts/      # React contexts (Auth, SSE)
│   │   └── api/           # API integration layer
│   └── package.json
├── backend/               # Express.js backend
│   ├── controllers/       # Request handlers
│   ├── models/            # Database models
│   ├── routes/            # API route definitions
│   ├── middleware/        # Authentication & validation
│   └── database/          # Database schema & connection
└── ADMIN_PANEL_SETUP.md   # Complete setup guide
```

## 🔐 Security Features

- JWT token-based authentication
- Automatic token expiration handling
- CORS protection
- SQL injection prevention
- XSS protection with Helmet.js
- Rate limiting on API endpoints

## 🌐 API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `GET /api/admin/verify-token` - Token verification

### Orders Management
- `GET /api/orders` - List orders with filtering
- `GET /api/orders/:id` - Get specific order
- `PUT /api/orders/:id/status` - Update order status
- `GET /api/orders/statistics` - Get dashboard statistics

### Real-time Updates
- `GET /api/sse/orders` - Server-Sent Events stream

## 🎨 UI Components

### Status Management
- **OrderStatusButtons**: Interactive status change buttons
- **StatusBadge**: Visual status indicators
- **OrderDetailsModal**: Comprehensive order information

### Dashboard
- **StatCard**: Statistics display cards
- **OrderCard**: Recent orders with expand/collapse
- **LiveIndicator**: Real-time connection status

### Shared
- **Layout**: Navigation and sidebar
- **ProtectedRoute**: Authentication guard
- **LoadingSpinner**: Loading states

## 📊 Real-time Features

The admin panel uses Server-Sent Events (SSE) for real-time updates:

- **Live Connection Status**: Visual indicator of server connection
- **Automatic Updates**: Data refreshes every 10 seconds
- **Instant Notifications**: New orders and status changes
- **Cross-client Sync**: Changes appear on all connected admin panels

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=vahtook_admin
JWT_SECRET=your_secret_key
PORT=5000
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Deployment

### Production Build
```bash
# Backend
cd backend/
npm install --production
npm start

# Frontend
cd admin-panel/
npm run build
# Serve dist/ folder with nginx
```

### Environment Setup
- Set `NODE_ENV=production`
- Use secure JWT secrets
- Configure production database
- Set up SSL certificates
- Configure reverse proxy

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Follow coding standards and add comments
4. Test thoroughly
5. Create pull request

## 📝 License

This project is proprietary software developed for Vahtook logistics operations.

## 📞 Support

- Documentation: [ADMIN_PANEL_SETUP.md](./ADMIN_PANEL_SETUP.md)
- Issues: Contact development team
- Email: support@vahtook.com

---

**Built with ❤️ by the Vahtook Development Team**