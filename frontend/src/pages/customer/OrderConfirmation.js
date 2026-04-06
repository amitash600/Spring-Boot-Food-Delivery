import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { CheckCircle, MapPin, User, Clock, ArrowLeft, Home } from 'lucide-react';

const OrderConfirmation = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get order data from location state or generate sample confirmation
    const order = location.state?.order;
    
    if (order) {
      setOrderData(order);
    } else {
      // Generate a sample confirmation if no order data passed
      setOrderData({
        orderId: 'ORD' + Date.now(),
        orderDateTime: new Date().toISOString(),
        status: 'PENDING',
        totalAmount: 0,
        deliveryAddress: user?.address || 'Not provided',
        recipientName: user?.customerName || 'Not provided',
        specialInstructions: 'None',
        paymentMethod: 'CARD',
        paymentStatus: 'PENDING',
        orderItems: []
      });
    }
    setLoading(false);
  }, [location.state, user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'text-yellow-600 bg-yellow-100';
      case 'CONFIRMED':
        return 'text-blue-600 bg-blue-100';
      case 'PREPARING':
        return 'text-purple-600 bg-purple-100';
      case 'OUT_FOR_DELIVERY':
        return 'text-orange-600 bg-orange-100';
      case 'DELIVERED':
        return 'text-green-600 bg-green-100';
      case 'CANCELLED':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'PENDING':
        return 'Order Pending';
      case 'CONFIRMED':
        return 'Order Confirmed';
      case 'PREPARING':
        return 'Preparing';
      case 'OUT_FOR_DELIVERY':
        return 'Out for Delivery';
      case 'DELIVERED':
        return 'Delivered';
      case 'CANCELLED':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const getPaymentMethodText = (method) => {
    switch (method) {
      case 'CARD':
        return 'Credit/Debit Card';
      case 'UPI':
        return 'UPI Payment';
      case 'NET_BANKING':
        return 'Net Banking';
      case 'CASH':
        return 'Cash on Delivery';
      default:
        return method;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
          <Link to="/orders" className="text-primary-600 hover:text-primary-700">
            View Your Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Success Message */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-8 text-center">
            <CheckCircle className="h-16 w-16 text-white mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Order Placed Successfully!</h1>
            <p className="text-green-100">Thank you for your order. We'll confirm it shortly.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Order ID</label>
                  <p className="text-lg font-semibold text-gray-900">{orderData.orderId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Order Time</label>
                  <p className="text-gray-900">
                    {new Date(orderData.orderDateTime).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(orderData.status)}`}>
                    {getStatusText(orderData.status)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Payment Method</label>
                  <p className="text-gray-900">{getPaymentMethodText(orderData.paymentMethod)}</p>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    <User className="h-4 w-4 inline mr-2" />
                    Recipient Name
                  </label>
                  <p className="text-gray-900">{orderData.recipientName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    Delivery Address
                  </label>
                  <p className="text-gray-900">{orderData.deliveryAddress}</p>
                </div>
                {orderData.specialInstructions && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Special Instructions</label>
                    <p className="text-gray-900">{orderData.specialInstructions}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Items */}
            {orderData.orderItems && orderData.orderItems.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
                
                <div className="space-y-3">
                  {orderData.orderItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="font-medium text-gray-900">{item.itemName}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{orderData.totalAmount ? orderData.totalAmount.toFixed(2) : '0.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-gray-900">₹40.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">₹{(orderData.totalAmount * 0.05).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-primary-600">
                      ₹{orderData.totalAmount ? (orderData.totalAmount + 40 + (orderData.totalAmount * 0.05)).toFixed(2) : '0.00'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <Link
                  to="/orders"
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  View All Orders
                </Link>
                <Link
                  to="/"
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
