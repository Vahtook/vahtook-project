/**
 * VAHTOOK ADMIN PANEL - API INTEGRATION
 * 
 * This file handles all API communications between the admin panel and the backend server.
 * It provides a centralized location for all API endpoints and handles:
 * - Authentication (JWT tokens)
 * - Request/Response interceptors
 * - Error handling
 * - Order management operations
 * - Real-time connections (Server-Sent Events)
 * 
 * API Structure:
 * - authAPI: Admin authentication operations
 * - ordersAPI: Order management and status updates
 * - sseAPI: Real-time event streaming
 * 
 * Security Features:
 * - Automatic token attachment to requests
 * - Token expiration handling with automatic logout
 * - Secure API communication
 * 
 * @author Vahtook Development Team
 * @version 1.0.0
 */

import axios from 'axios';

// API base URL - uses environment variable or defaults to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// REQUEST INTERCEPTOR: Add authentication token to all requests
api.interceptors.request.use(
  (config) => {
    // Get admin token from localStorage and attach to Authorization header
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR: Handle token expiration and authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token is expired or invalid (401), logout user automatically
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// AUTHENTICATION API
// Handles admin login, profile management, and token verification
export const authAPI = {
  // Admin login with email/username and password
  login: (credentials) => api.post('/admin/login', credentials),
  
  // Get current admin profile information
  getProfile: () => api.get('/admin/profile'),
  
  // Verify if current token is valid
  verifyToken: () => api.get('/admin/verify-token'),
};

// ORDERS API
// Comprehensive order management operations
export const ordersAPI = {
  // Get all orders with optional filtering and pagination
  getAll: (params = {}) => api.get('/orders', { params }),
  
  // Get specific order by ID
  getById: (id) => api.get(`/orders/${id}`),
  
  // Get recent orders for dashboard (default: 10 orders)
  getRecent: (limit = 10) => api.get(`/orders/recent?limit=${limit}`),
  
  // Get orders filtered by status
  getByStatus: (status) => api.get(`/orders/status/${status}`),
  
  // Get order statistics for dashboard cards
  getStatistics: () => api.get('/orders/statistics'),
  
  // Update order status (used by status buttons)
  updateStatus: (id, data) => api.put(`/orders/${id}/status`, data),
  
  // Update order details
  update: (id, data) => api.put(`/orders/${id}`, data),
  
  // Create new order
  create: (data) => api.post('/orders', data),
  
  // Delete/cancel order
  delete: (id) => api.delete(`/orders/${id}`),
  
  // Get order status change history
  getHistory: (id) => api.get(`/orders/${id}/history`),
  
  // Search orders by multiple criteria
  search: (query, params = {}) => api.get(`/orders/search?q=${encodeURIComponent(query)}`, { params }),
};

// SERVER-SENT EVENTS (SSE) API
// Handles real-time data streaming for live updates
export const sseAPI = {
  // Establish SSE connection for real-time order updates
  connect: (token) => {
    const eventSource = new EventSource(`${API_BASE_URL}/sse/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return eventSource;
  },
  
  // Get connected SSE clients (for debugging)
  getClients: () => api.get('/sse/clients'),
};

export default api;