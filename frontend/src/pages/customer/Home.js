import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Search, MapPin, Star, Plus, Clock } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";
import Pagination from "../../components/Pagination";
import Sorting from "../../components/Sorting";
import ImageWithFallback from "../../components/ImageWithFallback";
import { preloadImages } from "../../utils/imageUtils";
import { API_ENDPOINTS } from "../../config/api";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { showInfo } = useNotification();

  // Restaurant pagination and sorting state
  const [restaurantPagination, setRestaurantPagination] = useState({
    page: 0,
    size: 6,
    totalPages: 0,
    totalElements: 0,
  });
  const [restaurantSort, setRestaurantSort] = useState({
    field: "restaurantName",
    order: "asc",
  });

  // Menu item pagination and sorting state
  const [menuItemPagination, setMenuItemPagination] = useState({
    page: 0,
    size: 8,
    totalPages: 0,
    totalElements: 0,
  });
  const [menuItemSort, setMenuItemSort] = useState({
    field: "itemName",
    order: "asc",
  });

  // Sorting options
  const restaurantSortOptions = [
    { field: "restaurantName", label: "Name" },
    { field: "location", label: "Location" },
  ];

  const menuItemSortOptions = [
    { field: "itemName", label: "Name" },
    { field: "price", label: "Price" },
  ];

  // Fetch restaurants with pagination and sorting
  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        API_ENDPOINTS.PUBLIC.RESTAURANTS_PAGINATED(
          restaurantPagination.page,
          restaurantPagination.size,
          restaurantSort.field,
          restaurantSort.order,
        ),
      );

      if (response.data && response.data.data) {
        setRestaurants(response.data.data.content || []);
        setRestaurantPagination((prev) => ({
          ...prev,
          totalPages: response.data.data.totalPages || 0,
          totalElements: response.data.data.totalElements || 0,
        }));
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      // Fallback to non-paginated API
      try {
        const fallbackResponse = await axios.get(
          API_ENDPOINTS.PUBLIC.RESTAURANTS,
        );
        setRestaurants(fallbackResponse.data.data || []);
      } catch (fallbackError) {
        console.error("Fallback API also failed:", fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch menu items with pagination and sorting
  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        API_ENDPOINTS.PUBLIC.MENU_ITEMS_PAGINATED(
          menuItemPagination.page,
          menuItemPagination.size,
          menuItemSort.field,
          menuItemSort.order,
        ),
      );

      if (response.data && response.data.data) {
        setMenuItems(response.data.data.content || []);
        setMenuItemPagination((prev) => ({
          ...prev,
          totalPages: response.data.data.totalPages || 0,
          totalElements: response.data.data.totalElements || 0,
        }));
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
      // Fallback to non-paginated API
      try {
        const fallbackResponse = await axios.get(
          API_ENDPOINTS.PUBLIC.MENU_ITEMS,
        );
        setMenuItems(fallbackResponse.data.data || []);
      } catch (fallbackError) {
        console.error("Fallback API also failed:", fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle restaurant page change
  const handleRestaurantPageChange = (newPage) => {
    setRestaurantPagination((prev) => ({ ...prev, page: newPage }));
  };

  // Handle menu item page change
  const handleMenuItemPageChange = (newPage) => {
    setMenuItemPagination((prev) => ({ ...prev, page: newPage }));
  };

  // Handle restaurant sort change
  const handleRestaurantSortChange = (newSort) => {
    setRestaurantSort(newSort);
    setRestaurantPagination((prev) => ({ ...prev, page: 0 }));
  };

  // Handle menu item sort change
  const handleMenuItemSortChange = (newSort) => {
    setMenuItemSort(newSort);
    setMenuItemPagination((prev) => ({ ...prev, page: 0 }));
  };

  // Filter restaurants and menu items based on search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredRestaurants(restaurants);
      setFilteredMenuItems(menuItems);
    } else {
      const searchLower = searchTerm.toLowerCase();
      const filteredRest = restaurants.filter(
        (restaurant) =>
          restaurant.restaurantName.toLowerCase().includes(searchLower) ||
          restaurant.location.toLowerCase().includes(searchLower),
      );
      const filteredItems = menuItems.filter(
        (item) =>
          item.itemName.toLowerCase().includes(searchLower) ||
          (item.restaurant &&
            item.restaurant.restaurantName.toLowerCase().includes(searchLower)),
      );
      setFilteredRestaurants(filteredRest);
      setFilteredMenuItems(filteredItems);
    }
  }, [searchTerm, restaurants, menuItems]);

  // Fetch data on component mount and when pagination/sorting changes
  useEffect(() => {
    fetchRestaurants();
  }, [
    restaurantPagination.page,
    restaurantPagination.size,
    restaurantSort.field,
    restaurantSort.order,
  ]);

  useEffect(() => {
    fetchMenuItems();
  }, [
    menuItemPagination.page,
    menuItemPagination.size,
    menuItemSort.field,
    menuItemSort.order,
  ]);

  const handleAddToCart = async (menuItem) => {
    if (!isAuthenticated) {
      showInfo("Please login first to add items to cart");
      return;
    }

    setCartLoading(true);
    try {
      await addToCart(menuItem);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setCartLoading(false);
    }
  };

  // Preload images for better performance
  useEffect(() => {
    if (restaurants.length > 0 || menuItems.length > 0) {
      const restaurantImages = restaurants.map((r) => ({
        name: r.restaurantName,
        type: "restaurant",
      }));
      const foodImages = menuItems.map((i) => ({
        name: i.itemName,
        type: "food",
      }));

      const imageUrls = [
        ...restaurantImages.map((item) =>
          item.type === "restaurant"
            ? `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&w=${item.name}`
            : "",
        ),
        ...foodImages.map((item) =>
          item.type === "food"
            ? `https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop&w=${item.name}`
            : "",
        ),
      ].filter((url) => url);

      preloadImages(imageUrls);
    }
  }, [restaurants, menuItems]);

  // Use filtered results when searching, paginated results when browsing
  const displayRestaurants = searchTerm ? filteredRestaurants : restaurants;
  const displayMenuItems = searchTerm ? filteredMenuItems : menuItems;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <div className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Find Your Favorite Food</h1>
            <p className="text-xl mb-8">
              Order from the best restaurants in your area
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search restaurants or dishes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Restaurants */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Popular Restaurants{" "}
            {searchTerm
              ? `(${displayRestaurants.length})`
              : `(${restaurantPagination.totalElements})`}
          </h2>
          {/* Restaurant Sorting Controls */}
          {!searchTerm && (
            <Sorting
              currentSort={restaurantSort}
              onSortChange={handleRestaurantSortChange}
              options={restaurantSortOptions}
              disabled={loading}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayRestaurants.map((restaurant) => (
            <Link
              key={restaurant.restaurantId}
              to={`/restaurants/${restaurant.restaurantId}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <ImageWithFallback
                type="restaurant"
                name={restaurant.restaurantName}
                alt={restaurant.restaurantName}
                className="h-48 w-full object-cover"
                fallbackClassName="h-48 w-full"
              >
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">🍽️</div>
                  <h3 className="text-xl font-semibold">
                    {restaurant.restaurantName}
                  </h3>
                </div>
              </ImageWithFallback>
              <div className="p-4">
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{restaurant.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">4.5</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">25-35 min</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Restaurant Pagination - Only show when not searching */}
        {!searchTerm && (
          <div className="mt-8">
            <Pagination
              currentPage={restaurantPagination.page}
              totalPages={restaurantPagination.totalPages}
              onPageChange={handleRestaurantPageChange}
              pageSize={restaurantPagination.size}
              totalElements={restaurantPagination.totalElements}
              loading={loading}
            />
          </div>
        )}
      </div>

      {/* Popular Menu Items */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Popular Dishes{" "}
            {searchTerm
              ? `(${displayMenuItems.length})`
              : `(${menuItemPagination.totalElements})`}
          </h2>
          {/* Menu Item Sorting Controls */}
          {!searchTerm && (
            <Sorting
              currentSort={menuItemSort}
              onSortChange={handleMenuItemSortChange}
              options={menuItemSortOptions}
              disabled={loading}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayMenuItems.map((item) => (
            <div
              key={item.itemId}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <ImageWithFallback
                type="food"
                name={item.itemName}
                alt={item.itemName}
                className="h-32 w-full object-cover"
                fallbackClassName="h-32 w-full"
              >
                <div className="text-white text-3xl">🍕</div>
              </ImageWithFallback>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {item.itemName}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {item.restaurant?.restaurantName}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary-600">
                    ₹{item.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={cartLoading || !item.availability}
                    className={`p-2 rounded-full ${
                      !item.availability
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-primary-600 text-white hover:bg-primary-700"
                    } transition-colors duration-200`}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {!item.availability && (
                  <p className="text-xs text-red-500 mt-1">
                    Currently unavailable
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Menu Item Pagination - Only show when not searching */}
        {!searchTerm && (
          <div className="mt-8">
            <Pagination
              currentPage={menuItemPagination.page}
              totalPages={menuItemPagination.totalPages}
              onPageChange={handleMenuItemPageChange}
              pageSize={menuItemPagination.size}
              totalElements={menuItemPagination.totalElements}
              loading={loading}
            />
          </div>
        )}
      </div>

      {/* Empty State */}
      {displayRestaurants.length === 0 && displayMenuItems.length === 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No restaurants or dishes found
            </h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
