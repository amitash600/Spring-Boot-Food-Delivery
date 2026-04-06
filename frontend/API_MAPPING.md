# 🔌 Frontend-Backend API Mapping

## ✅ Real-Time Database Integration

### **👤 Customer Profile Management**
**Frontend:** `Profile.js` → **Backend:** `/api/customer/profile`
```javascript
// Frontend (Profile.js)
const response = await axios.put(`http://localhost:8080/api/customer/profile`, {
  customerName: formData.customerName,
  address: formData.address,
  contactNumber: formData.contactNumber
});

// Backend Response
{
  "statusCode": 200,
  "message": "Profile updated successfully",
  "data": {
    "customerId": 1,
    "customerName": "John Doe",
    "address": "123 Main St",
    "contactNumber": 9876543210
  }
}
```
**✅ Real-time database update when customer clicks "Save Changes"**

---

### **📦 Order Management**
**Frontend:** `Home.js`, `Checkout.js`, `Orders.js` → **Backend:** `/api/orders`

#### **Place Order**
```javascript
// Frontend (Checkout.js)
const orderPayload = {
  orderItems: cartItems.map(item => ({
    menuItem: { itemId: item.itemId },
    quantity: item.quantity
  })),
  payment: {
    paymentMethod: 'CARD',
    paymentStatus: 'PENDING'
  }
};
const response = await axios.post('http://localhost:8080/api/orders', orderPayload);
```
**✅ Real-time database insertion**

#### **View Customer Orders**
```javascript
// Frontend (Orders.js)
const response = await axios.get('http://localhost:8080/api/orders');
const customerOrders = allOrders.filter(order => 
  order.customer?.customerId === user?.customerId
);
```
**✅ Real-time database fetch with customer filtering**

#### **Cancel Order**
```javascript
// Frontend (Orders.js)
const response = await axios.put(`http://localhost:8080/api/orders/${orderId}/cancel`);
```
**✅ Real-time database status update**

---

### **🍽️ Restaurant & Menu Data**
**Frontend:** `Home.js`, `Restaurants.js`, `RestaurantDetail.js` → **Backend:** `/api/restaurants`, `/api/menuitems`

#### **Fetch All Restaurants**
```javascript
// Frontend (Home.js)
const [restaurantsRes, menuItemsRes] = await Promise.all([
  axios.get('http://localhost:8080/api/restaurants'),
  axios.get('http://localhost:8080/api/menuitems')
]);
```
**✅ Real-time database fetch on page load**

#### **Fetch Restaurant Menu**
```javascript
// Frontend (RestaurantDetail.js)
const menuItemsRes = await axios.get(`http://localhost:8080/api/menuitems/restaurant/${id}`);
```
**✅ Real-time database fetch for specific restaurant**

---

### **🔐 Authentication**
**Frontend:** `Login.js`, `AuthContext.js` → **Backend:** `/api/auth/login`
```javascript
// Frontend (AuthContext.js)
const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
```
**✅ Real-time authentication validation**

---

## 📋 Complete Function-to-API Mapping

| Frontend Function | Backend API | Database Operation | Real-time? |
|-------------------|-------------|------------------|------------|
| **Profile Update** | `PUT /api/customer/profile` | UPDATE customer table | ✅ Yes |
| **Place Order** | `POST /api/orders` | INSERT order, order_items, payment | ✅ Yes |
| **View Orders** | `GET /api/orders` | SELECT customer orders | ✅ Yes |
| **Cancel Order** | `PUT /api/orders/{id}/cancel` | UPDATE order status | ✅ Yes |
| **Browse Restaurants** | `GET /api/restaurants` | SELECT restaurants | ✅ Yes |
| **View Menu Items** | `GET /api/menuitems` | SELECT menu items | ✅ Yes |
| **Restaurant Menu** | `GET /api/menuitems/restaurant/{id}` | SELECT items by restaurant | ✅ Yes |
| **Login** | `POST /api/auth/login` | Authenticate user | ✅ Yes |

---

## 🎯 Real-Time Data Flow Examples

### **Customer Updates Profile:**
1. **Customer clicks "Edit Profile"** → Opens edit form
2. **Changes name/address/phone** → Updates local state
3. **Clicks "Save Changes"** → API call to backend
4. **Backend validates & updates database** → Returns updated data
5. **Frontend updates UI** → Shows new profile data
6. **Database updated in real-time** ✅

### **Customer Places Order:**
1. **Customer adds items to cart** → Local cart state
2. **Clicks "Place Order"** → API call with order data
3. **Backend creates order in database** → Returns order with ID
4. **Frontend shows success** → Clears cart
5. **Database has new order** ✅

### **Customer Cancels Order:**
1. **Customer views orders** → Fetches from database
2. **Clicks "Cancel Order"** → API call to cancel
3. **Backend updates order status** → Returns confirmation
4. **Frontend refreshes order list** → Shows cancelled status
5. **Database order status updated** ✅

---

## 🔧 API Response Handling

### **Success Response Format:**
```javascript
{
  "statusCode": 200,
  "message": "Operation successful",
  "data": { ... }
}
```

### **Error Response Format:**
```javascript
{
  "statusCode": 400,
  "message": "Error description",
  "data": "Failure"
}
```

### **Frontend Error Handling:**
```javascript
try {
  const response = await axios.post('http://localhost:8080/api/orders', orderData);
  if (response.data.statusCode === 201) {
    // Success - update UI
    alert('Order placed successfully!');
  }
} catch (error) {
  // Error - show message
  alert(error.response?.data?.message || 'Failed to place order');
}
```

---

## 🚀 What Works in Real-Time:

### ✅ **Customer Profile Updates**
- Name, address, phone number
- Immediate database update
- UI reflects changes instantly

### ✅ **Order Management**
- Place orders → Database insertion
- Cancel orders → Database status update
- View orders → Real-time fetch

### ✅ **Restaurant & Menu Data**
- All restaurants fetched on page load
- Menu items loaded per restaurant
- Real-time data from database

### ✅ **Authentication**
- Login validation
- Role-based access
- Session management

---

## 🎯 **Answer to Your Question:**

**YES!** Every frontend function is mapped to real backend APIs:

- **Customer Profile Update** → **Real database update**
- **Order Placement** → **Real database insertion**  
- **Order Cancellation** → **Real database status change**
- **Data Viewing** → **Real database fetch**

When you click any function in the frontend, it makes **actual API calls** to your Spring Boot backend, which performs **real database operations**. The data you see is **live from the database**, not mock data.

**Your food delivery platform has complete real-time database integration!** 🎉
