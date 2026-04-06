import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, User, LogOut, Menu, X, Store } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const cartItemCount = getTotalItems();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Store className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">FoodDelivery</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Customer Links */}
            {isAuthenticated && !isAdmin && (
              <>
                <Link
                  to="/restaurants"
                  className={`text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/restaurants') ? 'text-primary-600 bg-primary-50' : ''
                  }`}
                >
                  Restaurants
                </Link>
                <Link
                  to="/orders"
                  className={`text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/orders') ? 'text-primary-600 bg-primary-50' : ''
                  }`}
                >
                  My Orders
                </Link>
                <Link
                  to="/cart"
                  className={`relative text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/cart') ? 'text-primary-600 bg-primary-50' : ''
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </>
            )}

            {/* Admin Links */}
            {isAuthenticated && isAdmin && (
              <>
                <Link
                  to="/admin"
                  className={`text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/admin') ? 'text-primary-600 bg-primary-50' : ''
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/orders"
                  className={`text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/admin/orders') ? 'text-primary-600 bg-primary-50' : ''
                  }`}
                >
                  Orders
                </Link>
                <Link
                  to="/admin/restaurants"
                  className={`text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/admin/restaurants') ? 'text-primary-600 bg-primary-50' : ''
                  }`}
                >
                  Restaurants
                </Link>
              </>
            )}

            {/* Auth Links */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-700">{user.customerName || user.username}</span>
                </div>
                <Link
                  to="/profile"
                  className={`text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/profile') ? 'text-primary-600 bg-primary-50' : ''
                  }`}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Customer Links */}
              {isAuthenticated && !isAdmin && (
                <>
                  <Link
                    to="/restaurants"
                    className="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Restaurants
                  </Link>
                  <Link
                    to="/orders"
                    className="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/cart"
                    className="relative block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cart
                    {cartItemCount > 0 && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                </>
              )}

              {/* Admin Links */}
              {isAuthenticated && isAdmin && (
                <>
                  <Link
                    to="/admin"
                    className="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/orders"
                    className="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  <Link
                    to="/admin/restaurants"
                    className="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Restaurants
                  </Link>
                </>
              )}

              {/* Auth Links */}
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 px-3 py-2">
                    <User className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-700">{user.customerName || user.username}</span>
                  </div>
                  <Link
                    to="/profile"
                    className="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-base font-medium w-full text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block bg-primary-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-primary-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
