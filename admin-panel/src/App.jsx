/**
 * VAHTOOK ADMIN PANEL - MAIN APPLICATION COMPONENT
 * 
 * This is the root component of the Vahtook logistics admin panel.
 * It sets up the overall application structure including:
 * - Authentication flow (Login vs Protected routes)
 * - Real-time updates via Server-Sent Events (SSE)
 * - Route management for different admin pages
 * - Global toast notifications for user feedback
 * 
 * Architecture:
 * 1. AuthProvider: Manages admin authentication state
 * 2. Router: Handles navigation between pages
 * 3. ProtectedRoute: Ensures only authenticated admins can access the panel
 * 4. SSEProvider: Manages real-time data connections for live updates
 * 5. Layout: Provides consistent navigation and sidebar
 * 
 * Routes:
 * - /login: Public login page
 * - /dashboard: Main overview page (default)
 * - /orders: Order management page
 * 
 * @author Vahtook Development Team
 * @version 1.0.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { SSEProvider } from './contexts/SSEContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import './App.css';

function App() {
  return (
    // AuthProvider wraps entire app to provide authentication state globally
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* PUBLIC ROUTES - No authentication required */}
            <Route path="/login" element={<Login />} />
            
            {/* PROTECTED ROUTES - Authentication required */}
            <Route path="/*" element={
              <ProtectedRoute>
                {/* SSEProvider manages real-time data connections within protected area */}
                <SSEProvider>
                  {/* Layout provides consistent navigation and sidebar */}
                  <Layout>
                    <Routes>
                      {/* Dashboard: Main overview with statistics and recent orders */}
                      <Route path="/dashboard" element={<Dashboard />} />
                      
                      {/* Orders: Full order management with filtering and status updates */}
                      <Route path="/orders" element={<Orders />} />
                      
                      {/* Default redirect to dashboard */}
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      
                      {/* Catch-all redirect for unknown routes */}
                      <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </Layout>
                </SSEProvider>
              </ProtectedRoute>
            } />
          </Routes>
          
          {/* GLOBAL TOAST NOTIFICATIONS */}
          {/* Displays success/error messages throughout the app */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: '#4aed88',
                },
              },
              error: {
                duration: 5000,
                theme: {
                  primary: '#f56565',
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
