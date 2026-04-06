import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft,
  X,
} from "lucide-react";
import axios from "axios";
import ConfirmDialog from "../../components/ConfirmDialog";

const Orders = () => {
  const { user } = useAuth();
  const { showSuccess, showError, showInfo } = useNotification();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    orderId: null,
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      console.log("Fetching customer orders...");
      const response = await axios.get("http://localhost:8080/api/orders");
      console.log("Orders response:", response.data);

      const customerOrders = response.data.data || [];
      console.log("Customer orders:", customerOrders);

      setOrders(customerOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      console.error("Error details:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = (orderId) => {
    setConfirmDialog({
      isOpen: true,
      orderId: orderId,
    });
  };

  const confirmCancelOrder = async () => {
    const { orderId } = confirmDialog;

    try {
      const response = await axios.put(
        `http://localhost:8080/api/orders/${orderId}/cancel`,
      );

      if (response.data.statusCode === 200) {
        showSuccess("Order cancelled successfully!");
        // Refresh orders list
        fetchOrders();
      } else {
        showError("Failed to cancel order");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      showError(error.response?.data?.message || "Failed to cancel order");
    } finally {
      setConfirmDialog({ isOpen: false, orderId: null });
    }
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({ isOpen: false, orderId: null });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "PLACED":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "CONFIRMED":
        return <CheckCircle className="h-5 w-5 text-yellow-500" />;
      case "PREPARING":
        return <Package className="h-5 w-5 text-orange-500" />;
      case "DELIVERED":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "CANCELLED":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PLACED":
        return "bg-blue-100 text-blue-800";
      case "CONFIRMED":
        return "bg-yellow-100 text-yellow-800";
      case "PREPARING":
        return "bg-orange-100 text-orange-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-600 mb-8">
              Start ordering to see your orders here
            </p>
            <Link
              to="/restaurants"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              Browse Restaurants
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                      <span className="ml-2 text-lg font-semibold text-gray-900">
                        Order #{order.orderId}
                      </span>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.orderDateTime).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Order Items:
                  </h4>
                  <div className="space-y-2">
                    {order.orderItems?.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.quantity}x {item.itemName}
                        </span>
                        <span className="text-gray-900 font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    )) || (
                      <p className="text-gray-500 text-sm">No items found</p>
                    )}
                  </div>
                </div>

                {/* Order Actions */}
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Order placed on{" "}
                      {new Date(order.orderDateTime).toLocaleString()}
                    </div>
                    <div className="flex space-x-2">
                      {(order.status === "PLACED" ||
                        order.status === "CONFIRMED") && (
                        <button
                          onClick={() => handleCancelOrder(order.orderId)}
                          className="flex items-center text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancel Order
                        </button>
                      )}
                      <button
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        onClick={() =>
                          showInfo("Order details feature coming soon!")
                        }
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={closeConfirmDialog}
        onConfirm={confirmCancelOrder}
        title="Cancel Order"
        message="Are you sure you want to cancel this order? This action cannot be undone."
        confirmText="Cancel Order"
        cancelText="Keep Order"
        type="danger"
      />
    </div>
  );
};

export default Orders;
