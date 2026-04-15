// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export const API_URL = API_BASE_URL;

// Common API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/api/auth/reset-password`,
    VERIFY_RESET_TOKEN: (token) =>
      `${API_BASE_URL}/api/auth/verify-reset-token?token=${token}`,
    CHANGE_PASSWORD: `${API_BASE_URL}/api/auth/change-password`,
  },

  // Customer endpoints
  CUSTOMER: {
    PROFILE: `${API_BASE_URL}/api/customer/profile`,
    ORDERS: `${API_BASE_URL}/api/customer/orders`,
    ORDER_DETAIL: (id) => `${API_BASE_URL}/api/customer/orders/${id}`,
  },

  // Admin endpoints
  ADMIN: {
    DASHBOARD: `${API_BASE_URL}/api/admin/dashboard`,
    RESTAURANTS: `${API_BASE_URL}/api/admin/restaurants`,
    MENU_ITEMS: `${API_BASE_URL}/api/admin/menuitems`,
    ORDERS: `${API_BASE_URL}/api/admin/orders`,
    CUSTOMERS: `${API_BASE_URL}/api/admin/customers`,
    PAYMENTS: `${API_BASE_URL}/api/admin/payments`,
  },

  // Public endpoints
  PUBLIC: {
    RESTAURANTS: `${API_BASE_URL}/api/restaurants`,
    RESTAURANT_DETAIL: (id) => `${API_BASE_URL}/api/restaurants/${id}`,
    RESTAURANTS_PAGINATED: (page, size, field, order) =>
      `${API_BASE_URL}/api/restaurants/page/${page}/${size}/${field}/${order}`,
    MENU_ITEMS: `${API_BASE_URL}/api/menuitems`,
    MENU_ITEMS_PAGINATED: (page, size, field, order) =>
      `${API_BASE_URL}/api/menuitems/page/${page}/${size}/${field}/${order}`,
    MENU_ITEMS_BY_RESTAURANT: (restaurantId) =>
      `${API_BASE_URL}/api/menuitems/restaurant/${restaurantId}`,
  },
};

export default API_URL;
