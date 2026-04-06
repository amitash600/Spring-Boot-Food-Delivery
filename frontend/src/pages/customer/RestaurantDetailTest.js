import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import {
  Search,
  Star,
  Clock,
  MapPin,
  Plus,
  ArrowLeft,
  ShoppingCart,
} from "lucide-react";
import axios from "axios";
import Pagination from "../../components/Pagination";
import Sorting from "../../components/Sorting";

const RestaurantDetailTest = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { addToCart, canAddItem, cartItems } = useCart();
  
  // Restaurant and Menu Items State
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  // Pagination and Sorting State
  const [pagination, setPagination] = useState({
    page: 0,
    size: 6, // Reduced to show pagination clearly
    totalPages: 0,
    totalElements: 0,
  });
  const [sort, setSort] = useState({
    field: "itemName",
    order: "asc",
  });

  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAvailable, setFilterAvailable] = useState(false);

  // Fetch restaurant details and menu items with pagination
  const fetchRestaurantDetails = async () => {
    try {
      setLoading(true);
      
      console.log("Fetching with pagination:", {
        page: pagination.page,
        size: pagination.size,
        sort: sort.field,
        order: sort.order
      });

      // Fetch restaurant details (non-paginated)
      const restaurantRes = await axios.get(
        `http://localhost:8080/api/restaurants/${id}`,
      );
      setRestaurant(restaurantRes.data.data);

      // Fetch menu items with pagination and sorting
      const menuItemsRes = await axios.get(
        `http://localhost:8080/api/menuitems/restaurant/${id}/page/${pagination.page}/${pagination.size}/${sort.field}/${sort.order}`
      );
      
      console.log("Menu items response:", menuItemsRes.data);
      
      setMenuItems(menuItemsRes.data.data.content || []);
      setPagination((prev) => ({
        ...prev,
        page: menuItemsRes.data.data.pageable?.pageNumber || 0,
        totalPages: menuItemsRes.data.data.totalPages || 0,
        totalElements: menuItemsRes.data.data.totalElements || 0,
      }));
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
      // Fallback to non-paginated API
      try {
        const [restaurantRes, menuItemsFallbackRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/restaurants/${id}`),
          axios.get(`http://localhost:8080/api/menuitems/restaurant/${id}`),
        ]);

        setRestaurant(restaurantRes.data.data);
        setMenuItems(menuItemsFallbackRes.data.data || []);
        setPagination((prev) => ({
          ...prev,
          totalPages: 1,
          totalElements: menuItemsFallbackRes.data.data?.length || 0,
        }));
      } catch (fallbackError) {
        console.error("Fallback API also failed:", fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurantDetails();
  }, [id]);

  // Refetch when pagination or sort changes
  useEffect(() => {
    if (restaurant) {
      fetchMenuItemsWithPagination();
    }
  }, [pagination.page, sort.field, sort.order]);

  const fetchMenuItemsWithPagination = async () => {
    try {
      console.log("Refetching menu items:", {
        page: pagination.page,
        size: pagination.size,
        sort: sort.field,
        order: sort.order
      });

      const menuItemsRes = await axios.get(
        `http://localhost:8080/api/menuitems/restaurant/${id}/page/${pagination.page}/${pagination.size}/${sort.field}/${sort.order}`
      );
      
      console.log("Menu items refetch response:", menuItemsRes.data);
      
      setMenuItems(menuItemsRes.data.data.content || []);
      setPagination((prev) => ({
        ...prev,
        page: menuItemsRes.data.data.pageable?.pageNumber || 0,
        totalPages: menuItemsRes.data.data.totalPages || 0,
        totalElements: menuItemsRes.data.data.totalElements || 0,
      }));
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    console.log("Page change to:", newPage);
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  // Handle sort change
  const handleSortChange = (newSort) => {
    console.log("Sort change to:", newSort);
    setSort(newSort);
    setPagination((prev) => ({ ...prev, page: 0 }));
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
    }, 5000);
  };

  const handleAddToCart = async (menuItem) => {
    if (!isAuthenticated) {
      showNotification("error", "Please login to add items to cart");
      return;
    }

    if (!canAddItem(menuItem)) {
      showNotification(
        "error",
        "You can only add items from one restaurant at a time. Clear your cart to add items from a different restaurant.",
      );
      return;
    }

    setCartLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      addToCart(menuItem, 1);
      showNotification("success", `${menuItem.itemName} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      showNotification("error", "Failed to add item to cart");
    } finally {
      setCartLoading(false);
    }
  };

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAvailability = !filterAvailable || item.availability;
    return matchesSearch && matchesAvailability;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="text-gray-600">Loading restaurant details...</p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Restaurant not found
          </h2>
          <Link
            to="/restaurants"
            className="text-primary-600 hover:text-primary-700"
          >
            Back to restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Debug Info */}
      <div className="bg-yellow-100 border border-yellow-400 p-4 m-4">
        <h3 className="font-bold text-yellow-800 mb-2">Debug Info:</h3>
        <div className="text-sm text-yellow-700">
          <p>Current Page: {pagination.page}</p>
          <p>Total Pages: {pagination.totalPages}</p>
          <p>Total Elements: {pagination.totalElements}</p>
          <p>Menu Items Loaded: {menuItems.length}</p>
          <p>Sort Field: {sort.field}</p>
          <p>Sort Order: {sort.order}</p>
        </div>
      </div>

      {/* Restaurant Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <Link
              to="/restaurants"
              className="flex items-center text-white hover:text-primary-200 mb-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Restaurants
            </Link>

            {isAuthenticated && cartItems.length > 0 && (
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <ShoppingCart className="h-5 w-5 mr-2" />
                <span className="font-medium">{cartItems.length} items</span>
              </div>
            )}
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              {restaurant.restaurantName} (TEST VERSION)
            </h1>
            <div className="flex items-center justify-center space-x-6 text-primary-100">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{restaurant.location}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-400" />
                <span>4.5 (120 reviews)</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>25-35 min delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Availability Filter */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="available"
                  checked={filterAvailable}
                  onChange={(e) => setFilterAvailable(e.target.checked)}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="available" className="ml-2 text-sm text-gray-700">
                  Available only
                </label>
              </div>

              {/* Results Count */}
              <div className="flex items-center text-sm text-gray-600">
                {pagination.totalElements} items found
              </div>
            </div>

            {/* Sorting Controls */}
            <Sorting 
              currentSort={sort}
              onSortChange={handleSortChange}
              options={[
                { field: 'itemName', label: 'Name' },
                { field: 'price', label: 'Price' }
              ]}
              disabled={loading}
            />
          </div>
        </div>

        {/* Menu Items */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Menu Items ({filteredMenuItems.length})
          </h2>

          {filteredMenuItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No menu items found
              </h3>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMenuItems.map((item) => (
                <div
                  key={item.itemId}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-40 bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center">
                    <div className="text-white text-4xl">🍕</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.itemName}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Delicious {item.itemName.toLowerCase()} made with fresh ingredients
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-primary-600">
                        ${item.price}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          item.availability
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.availability ? "Available" : "Unavailable"}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={cartLoading || !item.availability}
                      className={`w-full flex items-center justify-center py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
                        !item.availability
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-primary-600 text-white hover:bg-primary-700"
                      }`}
                    >
                      {cartLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Plus className="h-4 w-4 mr-2" />
                      )}
                      {item.availability ? "Add to Cart" : "Unavailable"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Component - ALWAYS VISIBLE FOR TESTING */}
          <div className="mt-8 border-2 border-blue-500 p-4">
            <h3 className="text-lg font-bold text-blue-800 mb-4">Pagination Component:</h3>
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              pageSize={pagination.size}
              totalElements={pagination.totalElements}
              loading={loading}
            />
          </div>
        </div>
      </div>

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

export default RestaurantDetailTest;
