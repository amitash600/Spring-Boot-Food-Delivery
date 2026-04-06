import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Store,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Clock,
  Star,
} from "lucide-react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalRestaurants: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [orders, setOrders] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [customersRes, restaurantsRes, ordersRes] = await Promise.all([
        axios.get("http://localhost:8080/api/admin/customers"),
        axios.get("http://localhost:8080/api/admin/restaurants"),
        axios.get("http://localhost:8080/api/admin/orders"),
      ]);

      const customers = customersRes.data.data || [];
      const restaurants = restaurantsRes.data.data || [];
      const ordersData = ordersRes.data.data || [];

      setOrders(ordersData);
      setStats({
        totalCustomers: customers.length,
        totalRestaurants: restaurants.length,
        totalOrders: ordersData.length,
        totalRevenue: ordersData
          .filter((order) => order.status !== "CANCELLED")
          .reduce((sum, order) => sum + order.totalAmount, 0),
      });

      setRecentOrders(ordersData.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Customers",
      value: stats.totalCustomers,
      icon: Users,
      color: "bg-blue-500",
      link: "/admin/customers",
    },
    {
      title: "Total Restaurants",
      value: stats.totalRestaurants,
      icon: Store,
      color: "bg-green-500",
      link: "/admin/restaurants",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "bg-purple-500",
      link: "/admin/orders",
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "bg-yellow-500",
      link: "/admin/payments",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your food delivery
            platform.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3 mr-4`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Orders
              </h2>
              <Link
                to="/admin/orders"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {recentOrders.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No orders yet</p>
              ) : (
                recentOrders.map((order) => (
                  <div
                    key={order.orderId}
                    className="border-b border-gray-200 pb-4 last:border-b-0"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">
                          Order #{order.orderId}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.customer?.customerName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.orderDateTime).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ₹{order.totalAmount.toFixed(2)}
                        </p>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            order.status === "DELIVERED"
                              ? "bg-green-100 text-green-800"
                              : order.status === "CANCELLED"
                                ? "bg-red-100 text-red-800"
                                : order.status === "PREPARING"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/admin/customers"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
              >
                <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">
                  Manage Customers
                </p>
              </Link>

              <Link
                to="/admin/restaurants"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
              >
                <Store className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">
                  Manage Restaurants
                </p>
              </Link>

              <Link
                to="/admin/menu-items"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
              >
                <ShoppingCart className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">
                  Manage Menu Items
                </p>
              </Link>

              <Link
                to="/admin/orders"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
              >
                <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">View Orders</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Platform Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900">
                  {stats.totalOrders}
                </span>
              </div>
              <p className="text-sm text-gray-600">Total Orders This Month</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900">
                  ₹
                  {(
                    stats.totalRevenue /
                      orders.filter((order) => order.status !== "CANCELLED")
                        .length || 0
                  ).toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-gray-600">Average Order Value</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900">4.5</span>
              </div>
              <p className="text-sm text-gray-600">Average Customer Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
