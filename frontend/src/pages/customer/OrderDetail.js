import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, MapPin, CreditCard } from 'lucide-react';
import axios from 'axios';

const OrderDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  const fetchOrderDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/orders/${id}`);
      setOrder(response.data.data);
    } catch (error) {
      console.error('Error fetching order detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PLACED':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'CONFIRMED':
        return <CheckCircle className="h-5 w-5 text-yellow-500" />;
      case 'PREPARING':
        return <Package className="h-5 w-5 text-orange-500" />;
      case 'DELIVERED':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'CANCELLED':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PLACED':
        return 'bg-blue-100 text-blue-800';
      case 'CONFIRMED':
        return 'bg-yellow-100 text-yellow-800';
      case 'PREPARING':
        return 'bg-orange-100 text-orange-800';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h2>
          <Link to="/orders" className="text-primary-600 hover:text-primary-700">
            Back to Orders
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
            to="/orders"
            className="flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Orders
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order #{order.orderId}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {getStatusIcon(order.status)}
              <span className={`ml-2 px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            <p className="text-gray-600">
              Placed on {new Date(order.orderDateTime).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Information</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-gray-600 w-24">Name:</span>
                  <span className="font-medium">{order.customer?.customerName}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 w-24">Email:</span>
                  <span className="font-medium">{order.customer?.emailId}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 w-24">Contact:</span>
                  <span className="font-medium">{order.customer?.contactNumber}</span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.orderItems?.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b last:border-b-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-lg flex items-center justify-center text-white">
                        🍕
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.itemName}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-gray-600">${item.price} each</p>
                    </div>
                  </div>
                )) || (
                  <p className="text-gray-500">No items found</p>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-gray-900">$2.99</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">${(order.totalAmount * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${(order.totalAmount + 2.99 + order.totalAmount * 0.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="border-t pt-6">
                <h3 className="font-medium text-gray-900 mb-3">Payment Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{order.payment?.paymentMethod}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.payment?.paymentStatus === 'SUCCESS' 
                        ? 'bg-green-100 text-green-800' 
                        : order.payment?.paymentStatus === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {order.payment?.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="border-t pt-6 mt-6">
                <h3 className="font-medium text-gray-900 mb-3">Delivery Address</h3>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    {order.customer?.address || 'Not provided'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
