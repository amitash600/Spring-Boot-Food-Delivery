import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { ShoppingCart, Search, Plus, Edit, Trash2 } from "lucide-react";
import axios from "axios";

const AdminMenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    itemName: "",
    price: "",
    availability: true,
  });
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  const handleEdit = (item) => {
    console.log("Edit menu item:", item);
    setEditingItem(item);
    setEditFormData({
      itemName: item.itemName,
      price: item.price,
      availability: item.availability,
    });
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
    }, 5000);
  };

  const handleSaveEdit = async () => {
    try {
      console.log("Saving menu item:", editingItem.itemId, editFormData);
      console.log("Current token:", localStorage.getItem("token"));
      console.log("Form data types:", {
        itemName: typeof editFormData.itemName,
        price: typeof editFormData.price,
        availability: typeof editFormData.availability,
      });

      // Ensure price is a number
      const formData = {
        ...editFormData,
        price: parseFloat(editFormData.price) || 0,
      };

      console.log("Processed form data:", formData);

      const token = localStorage.getItem("token");
      if (!token) {
        showNotification("error", "Please log in again. Session expired.");
        return;
      }

      // Use PUT endpoint directly
      const response = await axios.put(
        `http://localhost:8080/api/admin/menuitems/${editingItem.itemId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log("API Response:", response.data);

      // Update the item in the list
      setMenuItems(
        menuItems.map((item) =>
          item.itemId === editingItem.itemId ? { ...item, ...formData } : item,
        ),
      );

      // Close modal
      setEditingItem(null);

      showNotification("success", "Menu item updated successfully!");
    } catch (error) {
      console.error("Error updating menu item:", error);
      console.error("Error status:", error.response?.status);
      console.error("Error details:", error.response?.data);

      if (error.response?.status === 404) {
        showNotification(
          "error",
          "Menu item not found. It may have been deleted.",
        );
      } else if (error.response?.status === 401) {
        showNotification(
          "error",
          "Authentication failed. Please log in again.",
        );
      } else if (error.response?.status === 403) {
        showNotification(
          "error",
          "Permission denied. You do not have admin rights.",
        );
      } else {
        showNotification(
          "error",
          `Failed to update menu item: ${
            error.response?.data?.message || error.message
          }`,
        );
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleDelete = async (item) => {
    if (window.confirm(`Are you sure you want to delete ${item.itemName}?`)) {
      try {
        await axios.delete(
          `http://localhost:8080/api/admin/menuitems/${item.itemId}`,
        );
        setMenuItems(menuItems.filter((mi) => mi.itemId !== item.itemId));
        showNotification("success", "Menu item deleted successfully!");
      } catch (error) {
        console.error("Error deleting menu item:", error);
        showNotification("error", "Failed to delete menu item");
      }
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      console.log("🔍 Fetching admin menu items...");
      console.log("🔑 Token:", localStorage.getItem("token"));

      const response = await axios.get(
        "http://localhost:8080/api/admin/menuitems",
      );
      console.log("✅ Menu items response:", response.data);
      console.log("✅ Menu items data:", response.data.data);

      setMenuItems(response.data.data || []);
    } catch (error) {
      console.error("❌ Error fetching menu items:", error);
      console.error("❌ Error response:", error.response?.data);
      console.error("❌ Error status:", error.response?.status);
      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.restaurant?.restaurantName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  // Debug logging
  console.log("🔍 Menu items state:", menuItems);
  console.log("🔍 Filtered menu items:", filteredMenuItems);
  console.log("🔍 Search term:", searchTerm);
  console.log("🔍 Menu items length:", menuItems.length);
  console.log("🔍 Filtered menu items length:", filteredMenuItems.length);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="text-gray-600">Loading menu items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Menu Item Management
          </h1>
          <p className="text-gray-600">
            Manage all menu items across restaurants
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              All Menu Items ({menuItems.length})
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading menu items...</p>
            </div>
          ) : menuItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No menu items found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Menu Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Restaurant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Availability
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {menuItems.map((item) => (
                    <tr key={item.itemId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-lg bg-secondary-100 flex items-center justify-center text-white">
                              🍕
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.itemName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.restaurant?.restaurantName ||
                          "Unknown Restaurant"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{item.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            item.availability
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.availability ? "Available" : "Unavailable"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              console.log("Edit button clicked for:", item);
                              handleEdit(item);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit menu item"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              console.log("Delete button clicked for:", item);
                              handleDelete(item);
                            }}
                            className="text-red-600 hover:text-red-900"
                            title="Delete menu item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Edit Menu Item</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Name
                </label>
                <input
                  type="text"
                  value={editFormData.itemName}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      itemName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={editFormData.price}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, price: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  step="0.01"
                  min="0"
                />
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editFormData.availability}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        availability: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Available
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
            notification.type === "success"
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {notification.type === "success" ? (
                <svg
                  className="h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() =>
                  setNotification({ show: false, type: "", message: "" })
                }
                className={`inline-flex text-${notification.type === "success" ? "green" : "red"}-400 hover:text-${notification.type === "success" ? "green" : "red"}-600 focus:outline-none`}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenuItems;
