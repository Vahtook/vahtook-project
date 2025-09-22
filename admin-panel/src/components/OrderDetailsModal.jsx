import React from 'react';
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Package,
  Calendar,
  DollarSign,
  Clock,
  Truck,
  FileText,
  Info,
} from 'lucide-react';

const OrderDetailsModal = ({ order, isOpen, onClose, formatCurrency, formatDate }) => {
  if (!isOpen || !order) return null;

  const statusColors = {
    new: 'bg-blue-100 text-blue-800 border-blue-200',
    confirmed: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    assigned: 'bg-purple-100 text-purple-800 border-purple-200',
    picked_up: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    in_transit: 'bg-orange-100 text-orange-800 border-orange-200',
    delivered: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
  };

  const priorityColors = {
    low: 'text-gray-600',
    normal: 'text-blue-600',
    high: 'text-orange-600',
    urgent: 'text-red-600',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-medium text-gray-900">Order Details</h3>
              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[order.status]}`}>
                {order.status.replace('_', ' ').toUpperCase()}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {/* Order Header */}
            <div className="mb-6 bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{order.order_number}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Created on {formatDate(order.created_at)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(order.fare_amount)}</p>
                  <p className={`text-sm font-medium ${priorityColors[order.priority]}`}>
                    {order.priority.toUpperCase()} PRIORITY
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customer Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-500" />
                  Customer Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.customer_name}</p>
                      <p className="text-xs text-gray-500">Customer Name</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.customer_phone}</p>
                      <p className="text-xs text-gray-500">Phone Number</p>
                    </div>
                  </div>
                  {order.customer_email && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{order.customer_email}</p>
                        <p className="text-xs text-gray-500">Email Address</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Receiver Information */}
              {(order.receiver_name || order.receiver_phone) && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-green-500" />
                    Receiver Information
                  </h4>
                  <div className="space-y-3">
                    {order.receiver_name && (
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{order.receiver_name}</p>
                          <p className="text-xs text-gray-500">Receiver Name</p>
                        </div>
                      </div>
                    )}
                    {order.receiver_phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{order.receiver_phone}</p>
                          <p className="text-xs text-gray-500">Receiver Phone</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Order Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-green-500" />
                  Order Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Truck className="h-4 w-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {order.vehicle_type.replace('_', ' ').toUpperCase()}
                      </p>
                      <p className="text-xs text-gray-500">Vehicle Type</p>
                    </div>
                  </div>
                  {order.goods_type && (
                    <div className="flex items-center">
                      <Package className="h-4 w-4 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{order.goods_type}</p>
                        <p className="text-xs text-gray-500">Goods Type</p>
                      </div>
                    </div>
                  )}
                  {order.payment_method && (
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{order.payment_method.toUpperCase()}</p>
                        <p className="text-xs text-gray-500">Payment Method</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{formatCurrency(order.fare_amount)}</p>
                      <p className="text-xs text-gray-500">Total Fare</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{formatDate(order.created_at)}</p>
                      <p className="text-xs text-gray-500">Order Created</p>
                    </div>
                  </div>
                  {order.updated_at && order.updated_at !== order.created_at && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{formatDate(order.updated_at)}</p>
                        <p className="text-xs text-gray-500">Last Updated</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Pickup Location */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-green-500" />
                  Pickup Location
                </h4>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order.pickup_address}</p>
                    {order.pickup_latitude && order.pickup_longitude && (
                      <p className="text-xs text-gray-500 mt-1">
                        Coordinates: {order.pickup_latitude}, {order.pickup_longitude}
                      </p>
                    )}
                  </div>
                </div>
                {order.pickup_time && (
                  <div className="mt-3 flex items-center">
                    <Clock className="h-4 w-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{formatDate(order.pickup_time)}</p>
                      <p className="text-xs text-gray-500">Scheduled Pickup Time</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Destination */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-red-500" />
                  Destination
                </h4>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order.destination_address}</p>
                    {order.destination_latitude && order.destination_longitude && (
                      <p className="text-xs text-gray-500 mt-1">
                        Coordinates: {order.destination_latitude}, {order.destination_longitude}
                      </p>
                    )}
                  </div>
                </div>
                {order.delivery_time && (
                  <div className="mt-3 flex items-center">
                    <Clock className="h-4 w-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{formatDate(order.delivery_time)}</p>
                      <p className="text-xs text-gray-500">Delivered At</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Package Details */}
            {(order.package_description || order.package_weight || order.package_dimensions) && (
              <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-purple-500" />
                  Package Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {order.package_description && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Description</p>
                      <p className="text-sm font-medium text-gray-900">{order.package_description}</p>
                    </div>
                  )}
                  {order.package_weight && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Weight</p>
                      <p className="text-sm font-medium text-gray-900">{order.package_weight} kg</p>
                    </div>
                  )}
                  {order.package_dimensions && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Dimensions</p>
                      <p className="text-sm font-medium text-gray-900">{order.package_dimensions}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Driver Information */}
            {(order.driver_id || order.driver_name || order.driver_phone) && (
              <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-orange-500" />
                  Driver Information
                </h4>
                <div className="space-y-3">
                  {order.driver_name && (
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{order.driver_name}</p>
                        <p className="text-xs text-gray-500">Driver Name</p>
                      </div>
                    </div>
                  )}
                  {order.driver_phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{order.driver_phone}</p>
                        <p className="text-xs text-gray-500">Driver Phone</p>
                      </div>
                    </div>
                  )}
                  {order.driver_id && (
                    <div className="flex items-center">
                      <Info className="h-4 w-4 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">#{order.driver_id}</p>
                        <p className="text-xs text-gray-500">Driver ID</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Additional Information */}
            {(order.estimated_distance || order.estimated_duration || order.notes || order.admin_notes) && (
              <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-indigo-500" />
                  Additional Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.estimated_distance && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Estimated Distance</p>
                      <p className="text-sm font-medium text-gray-900">{order.estimated_distance} km</p>
                    </div>
                  )}
                  {order.estimated_duration && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Estimated Duration</p>
                      <p className="text-sm font-medium text-gray-900">{order.estimated_duration} mins</p>
                    </div>
                  )}
                </div>
                {order.notes && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-500 mb-1">Customer Notes</p>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{order.notes}</p>
                  </div>
                )}
                {order.admin_notes && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-500 mb-1">Admin Notes</p>
                    <p className="text-sm text-gray-900 bg-yellow-50 p-3 rounded-md border border-yellow-200">{order.admin_notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;