/**
 * VAHTOOK ADMIN PANEL - DASHBOARD PAGE
 * 
 * The main dashboard provides an overview of the logistics operations including:
 * - Real-time connection status with live updates indicator
 * - Key statistics (total orders, new orders, in-progress, delivered)
 * - Recent orders list with expandable details
 * - Order details modal for comprehensive order information
 * 
 * Features:
 * - Live status indicator shows real-time connection to backend
 * - Statistics cards display current order counts by status
 * - Recent orders section shows latest orders with expand/collapse functionality
 * - Order details modal provides complete order information
 * - Automatic data refresh every 10 seconds via SSE
 * 
 * Data Sources:
 * - SSEContext: Provides real-time data and connection status
 * - Orders: Recent orders list
 * - Statistics: Order counts by status
 * 
 * @author Vahtook Development Team
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { useSSE } from '../contexts/SSEContext';
import {
  Package,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  User,
  Calendar,
  DollarSign,
} from 'lucide-react';
import OrderDetailsModal from '../components/OrderDetailsModal';

const Dashboard = () => {
  // Get real-time data and connection status from SSE context
  const { recentOrders, statistics } = useSSE();
  
  // State for order expansion in recent orders list
  const [expandedOrder, setExpandedOrder] = useState(null);
  
  // State for order details modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Status color mapping for order status badges
  const statusColors = {
    new: 'bg-blue-100 text-blue-800 border-blue-200',
    confirmed: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    assigned: 'bg-purple-100 text-purple-800 border-purple-200',
    picked_up: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    in_transit: 'bg-orange-100 text-orange-800 border-orange-200',
    delivered: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
  };

  // Status icon mapping for visual representation
  const statusIcons = {
    new: AlertCircle,
    confirmed: Clock,
    assigned: User,
    picked_up: Package,
    in_transit: TrendingUp,
    delivered: CheckCircle,
    cancelled: AlertCircle,
  };

  // Toggle order expansion in recent orders list
  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Open order details modal
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Close order details modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Orders"
          value={statistics.total || 0}
          icon={Package}
          color="blue"
        />
        <StatCard
          title="New Orders"
          value={statistics.new || 0}
          icon={AlertCircle}
          color="red"
        />
        <StatCard
          title="In Progress"
          value={(statistics.confirmed || 0) + (statistics.assigned || 0)}
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Delivered"
          value={statistics.delivered || 0}
          icon={CheckCircle}
          color="green"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Recent Orders
          </h3>
          
          {recentOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
              <p className="mt-1 text-sm text-gray-500">
                No recent orders to display.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  isExpanded={expandedOrder === order.id}
                  onToggleExpand={() => toggleOrderExpansion(order.id)}
                  onViewOrder={handleViewOrder}
                  statusColors={statusColors}
                  statusIcons={statusIcons}
                  formatCurrency={formatCurrency}
                  formatDate={formatDate}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        formatCurrency={formatCurrency}
        formatDate={formatDate}
      />
    </div>
  );
};

// Statistics Card Component
// eslint-disable-next-line no-unused-vars
const StatCard = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`${colorClasses[color]} rounded-md p-3`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="text-lg font-medium text-gray-900">
                {value}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

// Order Card Component
const OrderCard = ({
  order,
  isExpanded,
  onToggleExpand,
  onViewOrder,
  statusColors,
  statusIcons,
  formatCurrency,
  formatDate,
}) => {
  const StatusIcon = statusIcons[order.status];

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      {/* Order Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h4 className="text-lg font-medium text-gray-900">
              {order.order_number}
            </h4>
            <p className="text-sm text-gray-500">
              {order.customer_name} • {formatDate(order.created_at)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Status Badge */}
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[order.status]}`}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {order.status.replace('_', ' ').toUpperCase()}
          </div>
          
          {/* Expand/Collapse Button */}
          <button
            onClick={onToggleExpand}
            className="inline-flex items-center p-1 border border-gray-300 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Order Details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer Information */}
            <div className="space-y-3">
              <h5 className="font-medium text-gray-900">Customer Information</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-400 mr-2" />
                  <span>{order.customer_name}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <span>{order.customer_phone}</span>
                </div>
                {order.customer_email && (
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-2">@</span>
                    <span>{order.customer_email}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Order Details */}
            <div className="space-y-3">
              <h5 className="font-medium text-gray-900">Order Details</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Package className="h-4 w-4 text-gray-400 mr-2" />
                  <span>{order.vehicle_type.replace('_', ' ').toUpperCase()}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                  <span>{formatCurrency(order.fare_amount)}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span>{formatDate(order.created_at)}</span>
                </div>
              </div>
            </div>

            {/* Pickup Location */}
            <div className="space-y-3">
              <h5 className="font-medium text-gray-900">Pickup Location</h5>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span className="text-sm text-gray-600">{order.pickup_address}</span>
              </div>
            </div>

            {/* Destination */}
            <div className="space-y-3">
              <h5 className="font-medium text-gray-900">Destination</h5>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                <span className="text-sm text-gray-600">{order.destination_address}</span>
              </div>
            </div>
          </div>

          {/* Package Description */}
          {order.package_description && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h5 className="font-medium text-gray-900 mb-2">Package Description</h5>
              <p className="text-sm text-gray-600">{order.package_description}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-3">
            <button 
              onClick={() => onViewOrder(order)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Full Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;