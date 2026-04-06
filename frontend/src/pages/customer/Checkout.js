import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { useNotification } from "../../contexts/NotificationContext";
import {
  ArrowLeft,
  CreditCard,
  MapPin,
  User,
  ShoppingCart,
} from "lucide-react";
import axios from "axios";

const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { showSuccess, showError, showInfo } = useNotification();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState({
    paymentMethod: "CARD",
    deliveryAddress: user?.address || "",
    recipientName: user?.customerName || "",
    specialInstructions: "",
  });

  const totalPrice = getTotalPrice();
  const deliveryFee = 40; // ₹40 delivery fee
  const tax = totalPrice * 0.05; // 5% GST
  const finalTotal = totalPrice + deliveryFee + tax;

  const handleChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      showInfo("Please login to place an order");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      showError("Your cart is empty");
      navigate("/restaurants");
      return;
    }

    if (!orderData.deliveryAddress.trim()) {
      showError("Please enter a delivery address");
      return;
    }

    if (!orderData.recipientName.trim()) {
      showError("Please enter recipient name");
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        orderItems: cartItems.map((item) => ({
          menuItem: { itemId: item.itemId },
          quantity: item.quantity,
        })),
        payment: {
          paymentMethod: orderData.paymentMethod,
          paymentStatus: "PENDING",
        },
        deliveryAddress: orderData.deliveryAddress,
        recipientName: orderData.recipientName,
        specialInstructions: orderData.specialInstructions,
        totalAmount: finalTotal,
      };

      const response = await axios.post(
        "http://localhost:8080/api/orders",
        orderPayload,
      );

      if (response.data.statusCode === 201) {
        const createdOrder = response.data.data;
        showSuccess(
          "Order placed successfully! Order ID: " + createdOrder.orderId,
        );
        clearCart();

        // Navigate to order confirmation page with order data
        navigate("/order-confirmation", {
          state: {
            order: {
              ...createdOrder,
              orderItems: cartItems.map((item) => ({
                itemName: item.itemName,
                price: item.price,
                quantity: item.quantity,
              })),
            },
          },
        });
      } else {
        showError("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      showError(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Add items to your cart to proceed with checkout
          </p>
          <Link
            to="/restaurants"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            Browse Restaurants
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
            to="/cart"
            className="flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Delivery Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-2" />
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    name="recipientName"
                    value={orderData.recipientName}
                    onChange={handleChange}
                    placeholder="Enter recipient name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    Delivery Address
                  </label>
                  <textarea
                    name="deliveryAddress"
                    value={orderData.deliveryAddress}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter your delivery address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    name="specialInstructions"
                    value={orderData.specialInstructions}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Any special requests for your order"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                <CreditCard className="h-5 w-5 inline mr-2" />
                Payment Method
              </h2>

              <div className="space-y-3">
                {["CARD", "UPI", "NET_BANKING", "CASH"].map((method) => (
                  <label
                    key={method}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={orderData.paymentMethod === method}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <span className="text-gray-700">
                      {method === "CARD"
                        ? "Credit/Debit Card"
                        : method === "UPI"
                          ? "UPI Payment"
                          : method === "NET_BANKING"
                            ? "Net Banking"
                            : "Cash on Delivery"}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              {/* Order Items */}
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item.itemId}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-gray-600">
                      {item.quantity}x {item.itemName}
                    </span>
                    <span className="text-gray-900 font-medium">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">
                    ₹{totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-gray-900">
                    ₹{deliveryFee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-lg font-bold text-primary-600">
                      ₹{finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full mt-6 flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Placing Order...
                  </div>
                ) : (
                  "Place Order"
                )}
              </button>

              {/* Restaurant Info */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Ordering from:</p>
                <p className="text-sm font-medium text-gray-900">
                  {cartItems[0]?.restaurant?.restaurantName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
