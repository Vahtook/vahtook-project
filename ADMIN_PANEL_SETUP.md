# VAHTOOK ADMIN PANEL - COMPLETE SETUP GUIDE

Welcome to the Vahtook Admin Panel! This guide will help you set up the complete logistics admin panel from scratch.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Project Structure](#project-structure)
4. [Database Setup](#database-setup)
5. [Backend Setup](#backend-setup)
6. [Frontend Setup](#frontend-setup)
7. [Running the Application](#running-the-application)
8. [Features Overview](#features-overview)
9. [Development Workflow](#development-workflow)
10. [Troubleshooting](#troubleshooting)
11. [API Documentation](#api-documentation)

## 🔍 Overview

The Vahtook Admin Panel is a comprehensive logistics management system with:

- **Real-time order tracking** with live updates
- **Status management** with 5-button status workflow
- **Dashboard** with statistics and recent orders
- **Order management** with filtering and search
- **Secure authentication** with JWT tokens
- **Server-Sent Events** for real-time updates

### Technology Stack

**Frontend:**
- React 18 with Vite
- Tailwind CSS for styling
- Axios for API calls
- React Router for navigation
- React Hot Toast for notifications

**Backend:**
- Node.js with Express.js
- MySQL database
- JWT authentication
- Server-Sent Events (SSE)
- bcryptjs for password hashing

## 🛠 Prerequisites

Before starting, ensure you have:

### Required Software
```bash
# Node.js (v16 or higher)
node --version

# npm (comes with Node.js)
npm --version

# MySQL Server (v8.0 or higher)
mysql --version

# Git (for version control)
git --version
```

### Development Tools (Recommended)
- **VS Code** with extensions:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - MySQL extension
- **MySQL Workbench** for database management
- **Postman** for API testing

## 📁 Project Structure

```
vahtook-project/
├── admin-panel/                 # Frontend React application
│   ├── src/
│   │   ├── api/                # API integration
│   │   ├── components/         # Reusable components
│   │   ├── contexts/           # React contexts (Auth, SSE)
│   │   ├── pages/              # Main pages (Dashboard, Orders)
│   │   └── assets/             # Static assets
│   ├── package.json
│   └── vite.config.js
├── backend/                     # Backend Node.js application
│   ├── controllers/            # Route handlers
│   ├── database/               # Database connection and schema
│   ├── middleware/             # Authentication middleware
│   ├── models/                 # Database models
│   ├── routes/                 # API routes
│   ├── .env                    # Environment variables
│   ├── package.json
│   └── server.js               # Main server file
├── start-backend.bat           # Windows batch file to start backend
├── start-frontend.bat          # Windows batch file to start frontend
└── ADMIN_PANEL_SETUP.md        # This setup guide
```

## 🗄 Database Setup

### Step 1: Install MySQL

1. Download MySQL from [https://dev.mysql.com/downloads/](https://dev.mysql.com/downloads/)
2. Install with default settings
3. Remember your root password

### Step 2: Create Database

```sql
-- Open MySQL Workbench or command line and run:
CREATE DATABASE vahtook_admin;
USE vahtook_admin;
```

### Step 3: Configure Database Connection

1. Navigate to `backend/` folder
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Edit `.env` file with your database credentials:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=vahtook_admin
   DB_PORT=3306

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_change_this
   JWT_EXPIRES_IN=24h

   # Server Configuration
   PORT=5000

   # Frontend URLs
   FRONTEND_URL=http://localhost:5173
   ADMIN_PANEL_URL=http://localhost:3001
   ```

### Step 4: Setup Database Schema

```bash
# From the backend/ directory
cd backend/
node setup-database.js
```

This will:
- Create all necessary tables
- Insert a default admin user
- Add sample orders for testing

**Default Login Credentials:**
- Email: `admin@vahtook.com`
- Password: `admin123`

## 🚀 Backend Setup

### Step 1: Install Dependencies

```bash
# Navigate to backend directory
cd backend/

# Install all dependencies
npm install
```

### Step 2: Verify Database Connection

```bash
# Test database connection
node check-database.js
```

You should see:
```
✅ Connected to database successfully
👥 ADMINS TABLE: Found 1 admin(s)
📦 ORDERS TABLE: Found 4 order(s)
```

### Step 3: Start Backend Server

```bash
# Development mode with auto-restart
npm run dev

# OR Production mode
npm start

# OR using batch file (Windows)
# Double-click start-backend.bat
```

Backend will start on: `http://localhost:5000`

### API Endpoints Available:
- `POST /api/admin/login` - Admin authentication
- `GET /api/orders` - Get all orders with filtering
- `PUT /api/orders/:id/status` - Update order status
- `GET /api/sse/orders` - Server-Sent Events endpoint

## 🎨 Frontend Setup

### Step 1: Install Dependencies

```bash
# Navigate to admin-panel directory
cd admin-panel/

# Install all dependencies
npm install
```

### Step 2: Configure Environment

1. Create `.env` file in `admin-panel/` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Step 3: Start Frontend Development Server

```bash
# Development mode with hot reload
npm run dev

# OR using batch file (Windows)
# Double-click start-frontend.bat
```

Frontend will start on: `http://localhost:3001`

## 🏃‍♂️ Running the Application

### Method 1: Manual Startup

**Terminal 1 (Backend):**
```bash
cd backend/
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd admin-panel/
npm run dev
```

### Method 2: Batch Files (Windows)

1. Double-click `start-backend.bat`
2. Double-click `start-frontend.bat`

### Method 3: Using npm scripts

```bash
# From project root, if you have package.json scripts configured
npm run start:backend
npm run start:frontend
```

## 🎯 Features Overview

### 1. Authentication System
- Secure JWT-based login
- Auto-logout on token expiration
- Protected routes

### 2. Dashboard
- Real-time connection status indicator
- Statistics cards (Total, New, In Progress, Delivered)
- Recent orders with expandable details
- Manual refresh capability

### 3. Orders Management
- Complete order list with pagination
- Advanced filtering (status, priority, vehicle type)
- Search functionality
- Status update buttons (NEW → CONFIRMED → ASSIGNED → IN TRANSIT → DELIVERED)
- Order details modal

### 4. Real-time Updates
- Server-Sent Events for live data
- Automatic updates every 10 seconds
- Connection status monitoring
- Toast notifications for new orders and status changes

### 5. Status Management
- 5-button status workflow
- Visual feedback with loading states
- Database persistence
- Real-time broadcasting to all connected clients

## 💻 Development Workflow

### Adding New Features

1. **Backend Changes:**
   ```bash
   cd backend/
   # Add new routes in routes/
   # Add controllers in controllers/
   # Update models if needed
   npm run dev  # Auto-restart on changes
   ```

2. **Frontend Changes:**
   ```bash
   cd admin-panel/
   # Add components in src/components/
   # Add pages in src/pages/
   # Update API calls in src/api/
   npm run dev  # Hot reload
   ```

### Code Style Guidelines

- Use meaningful variable names
- Add comments for complex logic
- Follow React hooks best practices
- Use Tailwind CSS for styling
- Handle errors gracefully

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature-name

# Make changes and commit
git add .
git commit -m "Add: description of changes"

# Push and create pull request
git push origin feature/new-feature-name
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Database Connection Failed
```bash
# Check MySQL service is running
# Windows: services.msc → MySQL80
# Verify credentials in .env file
# Test connection: node check-database.js
```

#### 2. Port Already in Use
```bash
# Backend (5000)
lsof -ti:5000 | xargs kill -9

# Frontend (3001)
lsof -ti:3001 | xargs kill -9
```

#### 3. CORS Errors
- Ensure `FRONTEND_URL` in backend `.env` matches frontend URL
- Check backend CORS configuration in `server.js`

#### 4. SSE Connection Issues
- Verify backend is running on correct port
- Check browser network tab for SSE connection
- Look for authentication token in requests

#### 5. Status Buttons Not Working
- Check database schema: `node fix-database-schema.js`
- Verify JWT token in localStorage
- Check backend logs for errors

### Debug Mode

**Backend Debug:**
```bash
DEBUG=* npm run dev
```

**Frontend Debug:**
- Open browser DevTools
- Check Console and Network tabs
- Monitor SSE connection in Network → EventStream

### Database Reset

```bash
# If you need to start fresh
cd backend/
node setup-database.js
```

## 📚 API Documentation

### Authentication

**Login**
```http
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@vahtook.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "admin": {
      "id": 1,
      "username": "admin",
      "email": "admin@vahtook.com",
      "full_name": "Super Admin"
    }
  }
}
```

### Orders

**Get All Orders**
```http
GET /api/orders?page=1&limit=20&status=new&search=VTK001
Authorization: Bearer jwt_token_here
```

**Update Order Status**
```http
PUT /api/orders/1/status
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "status": "confirmed"
}
```

### Server-Sent Events

**Connect to Real-time Updates**
```http
GET /api/sse/orders?token=jwt_token_here
```

**Event Types:**
- `connected` - Initial connection
- `periodic_update` - Every 10 seconds
- `new_order` - New order created
- `status_change` - Order status updated

## 🚀 Deployment

### Environment Setup

**Production Backend (.env):**
```env
NODE_ENV=production
DB_HOST=your_production_db_host
DB_USER=your_production_db_user
DB_PASSWORD=your_production_db_password
JWT_SECRET=your_very_secure_secret_key
PORT=5000
```

**Production Frontend (.env):**
```env
VITE_API_URL=https://your-api-domain.com/api
```

### Build Commands

**Backend:**
```bash
cd backend/
npm install --production
npm start
```

**Frontend:**
```bash
cd admin-panel/
npm run build
# Serve the dist/ folder with nginx or similar
```

## 🤝 Team Collaboration

### Setting Up for Team Members

1. **Clone Repository:**
   ```bash
   git clone <repository_url>
   cd vahtook-project
   ```

2. **Follow Setup Steps:**
   - Install Prerequisites
   - Database Setup
   - Backend Setup
   - Frontend Setup

3. **Test Everything:**
   ```bash
   # Test backend
   cd backend/ && npm run dev

   # Test frontend
   cd admin-panel/ && npm run dev
   ```

4. **Access Application:**
   - Frontend: `http://localhost:3001`
   - Backend API: `http://localhost:5000`
   - Login: `admin@vahtook.com` / `admin123`

### Code Review Checklist

- [ ] Code is commented and self-documenting
- [ ] Error handling is implemented
- [ ] API endpoints are tested
- [ ] UI is responsive and user-friendly
- [ ] No console errors in browser
- [ ] Database changes are documented

## 📞 Support

If you encounter any issues:

1. Check this setup guide
2. Review the troubleshooting section
3. Check existing code comments
4. Look at browser developer tools
5. Contact the development team

---

**Happy Coding! 🎉**

*This admin panel is designed to be maintainable, scalable, and user-friendly. Feel free to extend it based on your specific needs.*