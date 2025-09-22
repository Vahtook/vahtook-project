/**
 * VAHTOOK ADMIN PANEL - SERVER-SENT EVENTS (SSE) CONTEXT
 * 
 * This context manages real-time data streaming from the backend server using Server-Sent Events.
 * It provides live updates for orders, statistics, and system status without requiring manual refresh.
 * 
 * Features:
 * - Real-time order updates (new orders, status changes)
 * - Live statistics updates (order counts by status)
 * - Connection status monitoring with visual indicators
 * - Automatic retry with exponential backoff on connection failures
 * - Manual data refresh capability
 * - Proper error handling and user notifications
 * 
 * SSE Event Types Handled:
 * - connected: Initial connection confirmation
 * - initial_orders: First batch of recent orders
 * - statistics: Order statistics for dashboard
 * - periodic_update: Regular data updates every 10 seconds
 * - new_order: Real-time notification of new orders
 * - status_change: Real-time order status updates
 * - server_shutdown: Graceful server shutdown notification
 * 
 * State Management:
 * - Uses useReducer for complex state logic
 * - Manages connection status, data updates, and error states
 * - Provides clean interface through custom hook
 * 
 * @author Vahtook Development Team
 * @version 1.0.0
 */

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { ordersAPI } from '../api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

// Initial state
const initialState = {
  isConnected: false,
  lastUpdate: null,
  recentOrders: [],
  statistics: {},
  connectionError: null,
  retryCount: 0,
};

// Action types
const actionTypes = {
  CONNECT: 'CONNECT',
  DISCONNECT: 'DISCONNECT',
  CONNECTION_ERROR: 'CONNECTION_ERROR',
  UPDATE_RECENT_ORDERS: 'UPDATE_RECENT_ORDERS',
  UPDATE_STATISTICS: 'UPDATE_STATISTICS',
  NEW_ORDER: 'NEW_ORDER',
  ORDER_UPDATE: 'ORDER_UPDATE',
  SET_RETRY_COUNT: 'SET_RETRY_COUNT',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Reducer
const sseReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.CONNECT:
      return {
        ...state,
        isConnected: true,
        connectionError: null,
        retryCount: 0,
      };

    case actionTypes.DISCONNECT:
      return {
        ...state,
        isConnected: false,
      };

    case actionTypes.CONNECTION_ERROR:
      return {
        ...state,
        isConnected: false,
        connectionError: action.payload,
        retryCount: state.retryCount + 1,
      };

    case actionTypes.UPDATE_RECENT_ORDERS:
      return {
        ...state,
        recentOrders: action.payload,
        lastUpdate: new Date(),
      };

    case actionTypes.UPDATE_STATISTICS:
      return {
        ...state,
        statistics: action.payload,
        lastUpdate: new Date(),
      };

    case actionTypes.NEW_ORDER: {
      // Add new order to the beginning of recent orders
      const newOrdersList = [action.payload, ...state.recentOrders.slice(0, 9)];
      return {
        ...state,
        recentOrders: newOrdersList,
        lastUpdate: new Date(),
      };
    }

    case actionTypes.ORDER_UPDATE: {
      // Update existing order in recent orders
      const updatedOrders = state.recentOrders.map(order =>
        order.id === action.payload.id ? action.payload : order
      );
      return {
        ...state,
        recentOrders: updatedOrders,
        lastUpdate: new Date(),
      };
    }

    case actionTypes.SET_RETRY_COUNT:
      return {
        ...state,
        retryCount: action.payload,
      };

    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        connectionError: null,
      };

    default:
      return state;
  }
};

// Create context
const SSEContext = createContext();

// SSE provider component
export const SSEProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sseReducer, initialState);
  const { token, isAuthenticated } = useAuth();
  const eventSourceRef = React.useRef(null);
  const retryTimeoutRef = React.useRef(null);

  // Handle SSE messages
  const handleSSEMessage = React.useCallback((data) => {
    switch (data.type) {
      case 'connected':
        console.log('SSE connected:', data.message);
        break;

      case 'initial_orders':
        dispatch({
          type: actionTypes.UPDATE_RECENT_ORDERS,
          payload: data.data,
        });
        break;

      case 'statistics':
        dispatch({
          type: actionTypes.UPDATE_STATISTICS,
          payload: data.data,
        });
        break;

      case 'periodic_update':
        if (data.data.recent_orders) {
          dispatch({
            type: actionTypes.UPDATE_RECENT_ORDERS,
            payload: data.data.recent_orders,
          });
        }
        if (data.data.statistics) {
          dispatch({
            type: actionTypes.UPDATE_STATISTICS,
            payload: data.data.statistics,
          });
        }
        break;

      case 'new_order':
        dispatch({
          type: actionTypes.NEW_ORDER,
          payload: data.data.order,
        });
        toast.success(`New order received: ${data.data.order.order_number}`);
        break;

      case 'status_change':
        dispatch({
          type: actionTypes.ORDER_UPDATE,
          payload: data.data.order,
        });
        toast.info(`Order ${data.data.order.order_number} status updated to ${data.data.order.status}`);
        break;

      case 'server_shutdown':
        toast.error('Server is shutting down');
        disconnect();
        break;

      default:
        console.log('Unknown SSE message type:', data.type);
    }
  }, []);

  // Connect to SSE
  const connect = React.useCallback(() => {
    if (!token || !isAuthenticated) {
      return;
    }

    try {
      // Close existing connection
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      // Create new EventSource connection with token in query parameter
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const sseUrl = `${baseUrl}/sse/orders?token=${encodeURIComponent(token)}`;
      
      const eventSource = new EventSource(sseUrl, {
        withCredentials: true,
      });
      
      eventSource.onopen = () => {
        console.log('SSE connection established');
        dispatch({ type: actionTypes.CONNECT });
        dispatch({ type: actionTypes.CLEAR_ERROR });
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          handleSSEMessage(data);
        } catch (error) {
          console.error('Error parsing SSE message:', error);
        }
      };

      eventSource.onerror = (error) => {
        console.error('SSE connection error:', error);
        dispatch({
          type: actionTypes.CONNECTION_ERROR,
          payload: 'Connection to server lost',
        });
        
        eventSource.close();
        
        // Retry connection with exponential backoff
        const retryDelay = Math.min(1000 * Math.pow(2, state.retryCount), 30000);
        retryTimeoutRef.current = setTimeout(() => {
          connect();
        }, retryDelay);
      };

      eventSourceRef.current = eventSource;
    } catch (error) {
      console.error('Failed to establish SSE connection:', error);
      dispatch({
        type: actionTypes.CONNECTION_ERROR,
        payload: 'Failed to connect to server',
      });
    }
  }, [token, isAuthenticated, state.retryCount, handleSSEMessage]);

  // Disconnect from SSE
  const disconnect = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
    
    dispatch({ type: actionTypes.DISCONNECT });
  };

  // Manually refresh data
  const refreshData = async () => {
    try {
      const [ordersResponse, statsResponse] = await Promise.all([
        ordersAPI.getRecent(10),
        ordersAPI.getStatistics(),
      ]);

      if (ordersResponse.data.success) {
        dispatch({
          type: actionTypes.UPDATE_RECENT_ORDERS,
          payload: ordersResponse.data.data.orders,
        });
      }

      if (statsResponse.data.success) {
        dispatch({
          type: actionTypes.UPDATE_STATISTICS,
          payload: statsResponse.data.data.statistics,
        });
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
      toast.error('Failed to refresh data');
    }
  };

  // Effect to handle connection
  useEffect(() => {
    if (isAuthenticated && token) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [isAuthenticated, token, connect]);

  // Context value
  const value = {
    ...state,
    connect,
    disconnect,
    refreshData,
  };

  return <SSEContext.Provider value={value}>{children}</SSEContext.Provider>;
};

// Custom hook to use SSE context
export const useSSE = () => {
  const context = useContext(SSEContext);
  if (!context) {
    throw new Error('useSSE must be used within an SSEProvider');
  }
  return context;
};

export default SSEContext;