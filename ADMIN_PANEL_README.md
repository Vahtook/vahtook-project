# Vahtook Admin Panel Setup Guide

## Overview
This is a complete admin panel for the Vahtook logistics website built with React (frontend) and Node.js/Express (backend) with MySQL database.

## Features
- ✅ Admin Authentication System
- ✅ Dashboard with Real-time Order Updates
- ✅ Order Management with Status Controls
- ✅ Server-Sent Events (SSE) for Live Updates
- ✅ Responsive UI with Tailwind CSS
- ✅ MySQL Database Integration
- ✅ JWT Authentication
- ✅ Order Status Tracking
- ✅ Real-time Notifications

## Project Structure
```
vahtook-project/
├── backend/                 # Node.js/Express API
│   ├── controllers/         # Business logic
│   ├── database/           # Database connection & schema
│   ├── middleware/         # Authentication middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   └── server.js           # Main server file
├── admin-panel/            # React Admin Frontend
│   ├── src/
│   │   ├── api/            # API client
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   └── pages/          # Page components
│   └── package.json
└── frontend/               # Main website (existing)
```

## Setup Instructions

### 1. Database Setup
1. Install MySQL and create a database:
```sql
CREATE DATABASE vahtook_admin;
```

2. Import the schema:
```bash
mysql -u root -p vahtook_admin < backend/database/schema.sql
```

### 2. Backend Setup
1. Navigate to backend directory:
```bash
cd backend
```

2. Create `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your database credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=vahtook_admin
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
```

4. Install dependencies:
```bash
npm install
```

5. Start the backend server:
```bash
npm run dev
```
Backend will run on http://localhost:5000

### 3. Admin Panel Setup
1. Navigate to admin panel directory:
```bash
cd admin-panel
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```
Admin panel will run on http://localhost:3001

## Default Admin Credentials
- **Email:** admin@vahtook.com
- **Password:** admin123

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `GET /api/admin/profile` - Get admin profile
- `GET /api/admin/verify-token` - Verify JWT token

### Orders
- `GET /api/orders` - Get all orders (with pagination & filters)
- `GET /api/orders/recent` - Get recent orders
- `GET /api/orders/statistics` - Get order statistics
- `PUT /api/orders/:id/status` - Update order status
- `GET /api/orders/:id` - Get order by ID

### Real-time Updates
- `GET /api/sse/orders` - Server-Sent Events endpoint for live updates

## Features Breakdown

### Dashboard
- Real-time order statistics
- Recent orders with expandable details
- Live connection status indicator
- Quick status update buttons
- Auto-refresh every 10 seconds

### Orders Page
- Complete order listing with pagination
- Advanced filtering (status, priority, vehicle type)
- Search functionality
- Bulk operations
- Status management

### Authentication
- Secure JWT-based authentication
- Role-based access control
- Protected routes
- Auto token refresh

### Real-time Features
- Server-Sent Events for live updates
- Auto-refresh of orders every 10 seconds
- Real-time notifications for new orders
- Connection status monitoring

## Order Status Flow
1. **New** → 2. **Confirmed** → 3. **Assigned** → 4. **Picked Up** → 5. **In Transit** → 6. **Delivered**

## Tech Stack

### Backend
- Node.js & Express.js
- MySQL with mysql2 driver
- JWT for authentication
- bcryptjs for password hashing
- Server-Sent Events for real-time updates
- CORS for cross-origin requests
- Helmet for security

### Frontend
- React 18 with Hooks
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- Lucide React for icons
- React Hot Toast for notifications
- Server-Sent Events for real-time updates

## Security Features
- JWT token authentication
- Password hashing with bcryptjs
- CORS configuration
- Rate limiting
- Input validation
- Protected routes

## Development Commands

### Backend
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
```

### Admin Panel
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Troubleshooting

### Database Connection Issues
1. Ensure MySQL is running
2. Check database credentials in `.env`
3. Verify database exists and schema is imported

### CORS Issues
1. Check CORS configuration in `server.js`
2. Ensure frontend URL is in allowed origins

### Authentication Issues
1. Check JWT_SECRET in `.env`
2. Verify token is being sent in Authorization header
3. Check token expiration settings

## Next Steps
- Add more admin management features
- Implement driver management
- Add reporting and analytics
- Mobile app integration
- Payment integration
- Advanced notifications

## Support
For any issues or questions, please check the code comments or create an issue in the repository.