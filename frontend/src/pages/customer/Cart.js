import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext"; // Import useAuth hook
import { useNotification } from "../../contexts/NotificationContext"; // Import useNotification hook

const Cart = () => {
  const { cartItems, getTotalPrice, clearCart, updateQuantity, removeItem } =
    useCart();
  const { user } = useAuth();
  const { showInfo } = useNotification();
  const [loading, setLoading] = useState(false);

  console.log("Cart component - user:", user);
  console.log("Cart component - cartItems:", cartItems);

  const isEmpty = cartItems.length === 0;

  const handleQuantityChange = (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      removeItem(itemId);
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the entire cart?")) {
      clearCart();
    }
  };

  const totalPrice = getTotalPrice();
  const deliveryFee = 40; // ₹40 delivery fee
  const tax = totalPrice * 0.05; // 5% GST

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Add some delicious items to get started!
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              Browse Restaurants
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cart</h1>
          <p className="text-gray-600">Review your order before checkout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
                </h2>
                <button
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Clear Cart
                </button>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.itemId}
                    className="border-b border-gray-200 pb-4 last:border-b-0"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Item Image */}
                      <div className="w-20 h-20 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-lg flex items-center justify-center text-white text-2xl">
                        🍕
                      </div>

                      {/* Item Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {item.itemName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.restaurant?.restaurantName}
                        </p>
                        <p className="text-lg font-bold text-primary-600">
                          ${item.price}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.itemId, item.quantity - 1)
                          }
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.itemId, item.quantity + 1)
                          }
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Item Total and Remove */}
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(item.itemId)}
                          className="text-red-600 hover:text-red-800 mt-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
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

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{(totalPrice + deliveryFee + tax).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  to="/checkout"
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  to="/restaurants"
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Restaurant Info */}
              {cartItems[0]?.restaurant && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Ordering from:</p>
                  <p className="font-medium text-gray-900">
                    {cartItems[0].restaurant.restaurantName}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
