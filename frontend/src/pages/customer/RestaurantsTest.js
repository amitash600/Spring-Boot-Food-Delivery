import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Star, Clock, MapPin, Filter } from "lucide-react";
import axios from "axios";
import Pagination from "../../components/Pagination";
import Sorting from "../../components/Sorting";

const RestaurantsTest = () => {
  // Pagination and Sorting State
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 6, // Smaller size for testing
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

  // Debug state
  const [debugInfo, setDebugInfo] = useState({
    apiCall: '',
    apiResponse: null,
    error: null,
    paginationState: null,
    sortState: null
  });

  // Fetch restaurants with pagination and sorting
  const fetchRestaurants = async (
    page = pagination.page,
    sortField = sort.field,
    sortOrder = sort.order,
  ) => {
    try {
      setLoading(true);
      const apiUrl = `http://localhost:8080/api/restaurants/page/${page}/${pagination.size}/${sortField}/${sortOrder}`;
      
      console.log("🚀 API Call:", apiUrl);
      setDebugInfo(prev => ({ ...prev, apiCall: apiUrl, error: null }));
      
      const response = await axios.get(apiUrl);
      console.log("📦 API Response:", response.data);
      setDebugInfo(prev => ({ ...prev, apiResponse: response.data }));

      setRestaurants(response.data.data.content || []);
      setPagination((prev) => ({
        ...prev,
        page: response.data.data.pageable?.pageNumber || 0,
        totalPages: response.data.data.totalPages || 0,
        totalElements: response.data.data.totalElements || 0,
      }));
      
      setDebugInfo(prev => ({ 
        ...prev, 
        paginationState: {
          page: response.data.data.pageable?.pageNumber || 0,
          totalPages: response.data.data.totalPages || 0,
          totalElements: response.data.data.totalElements || 0,
          contentLength: response.data.data.content?.length || 0
        }
      }));
      
    } catch (error) {
      console.error("❌ Error fetching restaurants:", error);
      setDebugInfo(prev => ({ ...prev, error: error.message }));
      
      // Fallback to non-paginated API
      try {
        console.log("🔄 Trying fallback API...");
        const fallbackResponse = await axios.get("http://localhost:8080/api/restaurants");
        setRestaurants(fallbackResponse.data.data || []);
        setPagination((prev) => ({
          ...prev,
          totalPages: 1,
          totalElements: fallbackResponse.data.data?.length || 0,
        }));
      } catch (fallbackError) {
        console.error("❌ Fallback API also failed:", fallbackError);
        setDebugInfo(prev => ({ ...prev, error: `Main API failed: ${error.message}. Fallback also failed: ${fallbackError.message}` }));
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch locations for filter dropdown
  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/restaurants");
      const allRestaurants = response.data.data || [];
      const uniqueLocations = [...new Set(allRestaurants.map((r) => r.location))];
      setLocations(uniqueLocations);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchRestaurants();
    fetchLocations();
  }, []);

  // Refetch when pagination or sort changes
  useEffect(() => {
    if (!searchTerm && !selectedLocation) {
      fetchRestaurants();
    }
  }, [pagination.page, sort.field, sort.order]);

  // Update debug info when sort changes
  useEffect(() => {
    setDebugInfo(prev => ({ ...prev, sortState: sort }));
  }, [sort]);

  // Handle page change
  const handlePageChange = (newPage) => {
    console.log("📄 Page change to:", newPage);
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  // Handle sort change
  const handleSortChange = (newSort) => {
    console.log("🔄 Sort change to:", newSort);
    setSort(newSort);
    setPagination((prev) => ({ ...prev, page: 0 })); // Reset to first page when sorting
  };

  // Filter restaurants (client-side for search and location only when not paginated)
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.restaurantName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      restaurant.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      !selectedLocation || restaurant.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  // Show filtered results only when searching or filtering, otherwise show paginated results
  const displayRestaurants = searchTerm || selectedLocation ? filteredRestaurants : restaurants;

  // Sorting options
  const sortOptions = [
    { field: "restaurantName", label: "Name" },
    { field: "location", label: "Location" },
  ];

  if (loading && restaurants.length === 0) {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Restaurants Test Page (Debug Mode)
          </h1>
          <p className="text-gray-600">
            Testing pagination and sorting functionality
          </p>
        </div>

        {/* Debug Panel */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">🐛 Debug Information</h3>
          <div className="text-sm text-red-700 space-y-2">
            <div><strong>API Call:</strong> {debugInfo.apiCall}</div>
            <div><strong>Sort State:</strong> {JSON.stringify(debugInfo.sortState)}</div>
            <div><strong>Pagination State:</strong> {JSON.stringify(debugInfo.paginationState)}</div>
            <div><strong>Error:</strong> {debugInfo.error || 'None'}</div>
            <div><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</div>
            <div><strong>Restaurants Count:</strong> {restaurants.length}</div>
            <div><strong>Display Count:</strong> {displayRestaurants.length}</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search restaurants..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Location Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-center md:justify-end">
              <span className="text-gray-600">
                {searchTerm || selectedLocation 
                  ? `${displayRestaurants.length} restaurants found` 
                  : `${pagination.totalElements} restaurants found`
                }
              </span>
            </div>
          </div>

          {/* Sorting Controls */}
          <Sorting
            currentSort={sort}
            onSortChange={handleSortChange}
            options={sortOptions}
            disabled={loading}
          />
        </div>

        {/* Loading State */}
        {loading && restaurants.length > 0 && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        )}

        {/* Restaurants Grid */}
        {!loading && displayRestaurants.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🍽️</div>
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
                  <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-5xl mb-2">🍽️</div>
                      <h3 className="text-xl font-semibold">
                        {restaurant.restaurantName}
                      </h3>
                    </div>
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
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Open Now
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Component - Always visible for testing */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">📄 Pagination Component (Always Visible)</h4>
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                pageSize={pagination.size}
                totalElements={pagination.totalElements}
                loading={loading}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantsTest;
