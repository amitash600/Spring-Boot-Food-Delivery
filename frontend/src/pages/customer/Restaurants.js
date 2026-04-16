import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Star, Clock, MapPin, Filter } from "lucide-react";
import axios from "axios";
import Pagination from "../../components/Pagination";
import Sorting from "../../components/Sorting";

const Restaurants = () => {
  // Pagination and Sorting State
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 9,
    totalPages: 0,
    totalElements: 0,
  });
  const [sort, setSort] = useState({
    field: "restaurantName",
    order: "asc",
  });

  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locations, setLocations] = useState([]);

  // Fetch restaurants with pagination and sorting
  const fetchRestaurants = async (
    page = pagination.page,
    sortField = sort.field,
    sortOrder = sort.order,
  ) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/restaurants/page/${page}/${pagination.size}/${sortField}/${sortOrder}`,
      );

      setRestaurants(response.data.data.content || []);
      setPagination((prev) => ({
        ...prev,
        page: response.data.data.pageable?.pageNumber || 0,
        totalPages: response.data.data.totalPages || 0,
        totalElements: response.data.data.totalElements || 0,
      }));
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      // Fallback to non-paginated API
      try {
        const fallbackResponse = await axios.get(
          "http://localhost:8080/api/restaurants",
        );
        setRestaurants(fallbackResponse.data.data || []);
      } catch (fallbackError) {
        console.error("Fallback API also failed:", fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  // Extract unique locations from restaurants
  const extractLocations = (restaurants) => {
    const uniqueLocations = [
      ...new Set(restaurants.map((r) => r.location).filter(Boolean)),
    ];
    setLocations(uniqueLocations);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  // Handle sort change
  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPagination((prev) => ({ ...prev, page: 0 }));
  };

  // Sort options
  const sortOptions = [
    { field: "restaurantName", label: "Name" },
    { field: "location", label: "Location" },
  ];

  // Filter restaurants based on search and location
  const getFilteredRestaurants = () => {
    let filtered = restaurants;

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.restaurantName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          restaurant.location.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by location
    if (selectedLocation) {
      filtered = filtered.filter(
        (restaurant) => restaurant.location === selectedLocation,
      );
    }

    return filtered;
  };

  // Display restaurants (filtered when searching/filtering, paginated when browsing)
  const displayRestaurants =
    searchTerm || selectedLocation ? getFilteredRestaurants() : restaurants;

  // Fetch restaurants on component mount and when pagination/sorting changes
  useEffect(() => {
    fetchRestaurants();
  }, [pagination.page, pagination.size, sort.field, sort.order]);

  // Extract locations when restaurants data changes
  useEffect(() => {
    if (restaurants.length > 0) {
      extractLocations(restaurants);
    }
  }, [restaurants]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Restaurants</h1>
          <p className="text-gray-600">
            Discover the best restaurants in your area
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Location Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Sorting */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={`${sort.field}-${sort.order}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split("-");
                  handleSortChange({ field, order });
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                disabled={loading}
              >
                <option value="restaurantName-asc">Name (A-Z)</option>
                <option value="restaurantName-desc">Name (Z-A)</option>
                <option value="location-asc">Location (A-Z)</option>
                <option value="location-desc">Location (Z-A)</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || selectedLocation) && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  Search: {searchTerm}
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-1 text-primary-600 hover:text-primary-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedLocation && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  Location: {selectedLocation}
                  <button
                    onClick={() => setSelectedLocation("")}
                    className="ml-1 text-primary-600 hover:text-primary-800"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedLocation("");
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {displayRestaurants.length} restaurant
            {displayRestaurants.length !== 1 ? "s" : ""}
            {searchTerm || selectedLocation
              ? " (filtered)"
              : ` of ${pagination.totalElements} total`}
          </p>
        </div>

        {/* Restaurant Grid */}
        {loading && displayRestaurants.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : displayRestaurants.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No restaurants found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayRestaurants.map((restaurant) => (
                <Link
                  key={restaurant.restaurantId}
                  to={`/restaurants/${restaurant.restaurantId}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <img
                    src={restaurant.imageUrl || ""}
                    alt={restaurant.restaurantName}
                    className="h-48 w-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextElementSibling.style.display = "flex";
                    }}
                  />
                  <div className="hidden text-white text-center bg-gradient-to-br from-primary-400 to-primary-600 h-48 w-full items-center justify-center">
                    <div className="text-5xl mb-2">🍽️</div>
                    <h3 className="text-xl font-semibold">
                      {restaurant.restaurantName}
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{restaurant.location}</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">4.5</span>
                        <span className="text-xs text-gray-500 ml-1">
                          (120)
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">25-35 min</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Free delivery
                      </span>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                        Open
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Component - Only show when not filtering */}
            {!searchTerm && !selectedLocation && (
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                pageSize={pagination.size}
                totalElements={pagination.totalElements}
                loading={loading}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
