import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/customer/Home";
import Restaurants from "./pages/customer/Restaurants";
import RestaurantDetail from "./pages/customer/RestaurantDetail";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import Orders from "./pages/customer/Orders";
import OrderDetail from "./pages/customer/OrderDetail";
import OrderConfirmation from "./pages/customer/OrderConfirmation";
import Profile from "./pages/customer/Profile";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminRestaurants from "./pages/admin/AdminRestaurants";
import AdminMenuItems from "./pages/admin/AdminMenuItems";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminPayments from "./pages/admin/AdminPayments";
import Customers from "./pages/admin/Customers";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/restaurants" element={<Restaurants />} />
                  <Route
                    path="/restaurant/:id"
                    element={<RestaurantDetail />}
                  />

                  {/* Customer Private Routes */}
                  <Route
                    path="/cart"
                    element={
                      <PrivateRoute>
                        <Cart />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <PrivateRoute>
                        <Checkout />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      <PrivateRoute>
                        <Orders />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/order/:id"
                    element={
                      <PrivateRoute>
                        <OrderDetail />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/order-confirmation"
                    element={
                      <PrivateRoute>
                        <OrderConfirmation />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    }
                  />

                  {/* Admin Routes */}
                  <Route
                    path="/admin"
                    element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/customers"
                    element={
                      <AdminRoute>
                        <Customers />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/restaurants"
                    element={
                      <AdminRoute>
                        <AdminRestaurants />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/menu-items"
                    element={
                      <AdminRoute>
                        <AdminMenuItems />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/orders"
                    element={
                      <AdminRoute>
                        <AdminOrders />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/payments"
                    element={
                      <AdminRoute>
                        <AdminPayments />
                      </AdminRoute>
                    }
                  />

                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
