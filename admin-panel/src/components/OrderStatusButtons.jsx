/**
 * VAHTOOK ADMIN PANEL - ORDER STATUS BUTTONS COMPONENT
 * 
 * This component provides interactive status change buttons for orders.
 * Allows admins to quickly update order status with visual feedback and real-time updates.
 * 
 * Features:
 * - 5 status buttons: NEW, CONFIRMED, ASSIGNED, IN TRANSIT, DELIVERED
 * - Visual feedback: active state highlighting, loading spinners
 * - Real-time updates via API calls
 * - Error handling with toast notifications
 * - Disabled state during API requests to prevent double-clicks
 * - Parent callback integration for UI updates
 * 
 * Props:
 * - orderId: ID of the order to update
 * - currentStatus: Current status of the order for highlighting
 * - onStatusChange: Callback function to update parent component state
 * 
 * Status Flow:
 * NEW → CONFIRMED → ASSIGNED → IN TRANSIT → DELIVERED
 * 
 * @author Vahtook Development Team
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const OrderStatusButtons = ({ orderId, currentStatus, onStatusChange }) => {
  // Loading state to prevent multiple simultaneous requests
  const [isUpdating, setIsUpdating] = useState(false);

  // Status button configuration with colors and labels
  const statuses = [
    { 
      key: 'new', 
      label: 'NEW', 
      className: 'bg-blue-500 hover:bg-blue-600 text-white',
      activeClassName: 'bg-blue-600 ring-2 ring-blue-300'
    },
    { 
      key: 'confirmed', 
      label: 'CONFIRMED', 
      className: 'bg-green-500 hover:bg-green-600 text-white',
      activeClassName: 'bg-green-600 ring-2 ring-green-300'
    },
    { 
      key: 'assigned', 
      label: 'ASSIGNED', 
      className: 'bg-yellow-500 hover:bg-yellow-600 text-white',
      activeClassName: 'bg-yellow-600 ring-2 ring-yellow-300'
    },
    { 
      key: 'in_transit', 
      label: 'IN TRANSIT', 
      className: 'bg-orange-500 hover:bg-orange-600 text-white',
      activeClassName: 'bg-orange-600 ring-2 ring-orange-300'
    },
    { 
      key: 'delivered', 
      label: 'DELIVERED', 
      className: 'bg-gray-500 hover:bg-gray-600 text-white',
      activeClassName: 'bg-gray-600 ring-2 ring-gray-300'
    }
  ];

  // Handle status change API call
  const handleStatusChange = async (newStatus) => {
    // Prevent unnecessary requests
    if (newStatus === currentStatus || isUpdating) return;

    setIsUpdating(true);
    
    try {
      // Get authentication token
      const token = localStorage.getItem('admin_token');
      
      // Make API call to update order status
      const response = await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        // Show success message
        toast.success(`Order status updated to ${newStatus.toUpperCase()}`);
        
        // Update parent component state via callback
        if (onStatusChange) {
          onStatusChange(orderId, newStatus);
        }
      } else {
        toast.error(response.data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Status update error:', error);
      toast.error(
        error.response?.data?.message || 
        'Failed to update order status'
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {statuses.map((status) => {
        const isActive = currentStatus === status.key;
        const buttonClass = isActive 
          ? `${status.className} ${status.activeClassName}`
          : status.className;

        return (
          <button
            key={status.key}
            onClick={() => handleStatusChange(status.key)}
            disabled={isUpdating}
            className={`
              ${buttonClass}
              px-3 py-1.5 rounded-md text-xs font-medium
              transition-all duration-200 ease-in-out
              ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              ${!isActive ? 'hover:scale-105 hover:shadow-md' : ''}
            `}
          >
            {isUpdating && currentStatus === status.key ? (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{status.label}</span>
              </div>
            ) : (
              status.label
            )}
          </button>
        );
      })}
    </div>
  );
};

export default OrderStatusButtons;