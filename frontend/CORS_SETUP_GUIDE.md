# 🔌 CORS & Frontend-Backend Connection Setup

## ✅ CORS Configuration - FIXED!

### **🎯 What Was Fixed:**

- ✅ **CORS was disabled** → Now properly configured
- ✅ **Frontend blocked** → Now allowed to connect
- ✅ **API endpoints secured** → Proper access control

---

## 🔧 Backend CORS Configuration

### **Updated SecurityConfig.java:**

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOriginPatterns(Arrays.asList("http://localhost:3000", "http://127.0.0.1:3000"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    configuration.setMaxAge(3600L);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}

@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.cors(cors -> cors.configurationSource(corsConfigurationSource())).csrf(csrf -> csrf.disable())
        // ... rest of security config
}
```

---

## 📋 Available API Endpoints

### **🔐 Authentication:**

- `POST /api/auth/login` - Login (Public)
- `POST /api/admin/customers` - Register (Public)

### **👤 Customer Endpoints:**

- `GET /api/customer/profile` - Get customer profile
- `PUT /api/customer/profile` - Update customer profile
- `GET /api/orders` - Get customer orders
- `POST /api/orders` - Place order
- `PUT /api/orders/{id}/cancel` - Cancel order

### **🍽️ Public Endpoints (No Auth Required):**

- `GET /api/restaurants` - Browse restaurants
- `GET /api/restaurants/{id}` - Get restaurant details
- `GET /api/menuitems` - Browse menu items
- `GET /api/menuitems/restaurant/{id}` - Get restaurant menu

### **👨‍💼 Admin Endpoints:**

- `GET /api/admin/customers` - Manage customers
- `GET /api/admin/restaurants` - Manage restaurants
- `GET /api/admin/orders` - Manage orders
- `GET /api/admin/payments` - Manage payments

---

## 🚀 Startup Sequence

### **Step 1: Start Backend**

```bash
cd "c:\Users\AMIT SINGH\Desktop\WEB TECH\spring-boot-final-project"
mvn spring-boot:run
```

### **Step 2: Start Frontend**

```bash
cd "c:\Users\AMIT SINGH\Desktop\WEB TECH\spring-boot-final-project\frontend"
npm start
```

### **Step 3: Verify Connection**

- **Backend:** `http://localhost:8080`
- **Frontend:** `http://localhost:3000`
- **Test:** Try accessing restaurants from frontend

---

## 🔍 Connection Verification

### **Test 1: Backend API Access**

```bash
# Test restaurants endpoint
curl http://localhost:8080/api/restaurants

# Should return JSON with restaurant data
```

### **Test 2: Frontend API Calls**

```javascript
// In browser console, test API call
fetch("http://localhost:8080/api/restaurants")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

### **Test 3: CORS Headers**

- **Open DevTools → Network**
- **Any API call from frontend**
- **Should show:** `Access-Control-Allow-Origin: http://localhost:3000`

---

## 🛠️ Troubleshooting

### **Issue: "CORS Error"**

```bash
# Solution: Restart backend after CORS changes
# The new CORS configuration needs a restart to take effect
```

### **Issue: "Network Error"**

```bash
# Check if backend is running:
curl http://localhost:8080/api/restaurants

# If no response, backend isn't running
```

### **Issue: "403 Forbidden"**

```bash
# Check endpoint permissions:
# - Public endpoints: /api/restaurants, /api/menuitems
# - Customer endpoints: Need login first
# - Admin endpoints: Need admin role
```

### **Issue: "404 Not Found"**

```bash
# Verify endpoint exists:
# Check controller files for correct URL mapping
```

---

## 📱 Frontend API Configuration

### **Base URL Setup:**

All frontend API calls use: `http://localhost:8080`

### **Authentication Flow:**

```javascript
// 1. Login → Get token
// 2. Token stored automatically
// 3. Subsequent calls include token
// 4. Backend validates token
```

### **Error Handling:**

```javascript
try {
  const response = await axios.get("http://localhost:8080/api/restaurants");
  // Success handling
} catch (error) {
  if (error.response?.status === 401) {
    // Redirect to login
  } else if (error.response?.status === 403) {
    // Access denied
  } else {
    // Network error
  }
}
```

---

## 🎯 Complete Connection Flow

### **1. User Opens Frontend:**

```
Frontend (localhost:3000) → Loads React App
```

### **2. Frontend Fetches Data:**

```
Frontend → API Call → Backend (localhost:8080) → Database → Return Data
```

### **3. User Logs In:**

```
Frontend → Login API → Backend → Validate → Return Token + User Data
```

### **4. Authenticated Requests:**

```
Frontend → API Call + Token → Backend → Validate Token → Process Request
```

---

## 🔐 Security Configuration

### **Public Access:**

- ✅ Restaurant browsing
- ✅ Menu viewing
- ✅ Login/Registration

### **Customer Access:**

- ✅ Profile management
- ✅ Order placement
- ✅ Order history

### **Admin Access:**

- ✅ Customer management
- ✅ Restaurant management
- ✅ Order management

---

## 🎉 Success Indicators

### **✅ Working Connection:**

- Frontend loads restaurants from database
- Login works with database credentials
- Profile updates save to database
- Orders are created in database

### **✅ No CORS Errors:**

- No "CORS policy" errors in console
- API calls return data successfully
- Headers include proper CORS settings

### **✅ Proper Security:**

- Public endpoints work without login
- Customer endpoints require login
- Admin endpoints require admin role

---

## 📞 Quick Test Commands

### **Test Backend:**

```bash
curl http://localhost:8080/api/restaurants
curl -X POST http://localhost:8080/api/auth/login -d '{"username":"your_username","password":"your_password"}' -H "Content-Type: application/json"
```

### **Test Frontend:**

```bash
cd frontend
npm start
# Open http://localhost:3000
# Try browsing restaurants
```

---

## 🚀 Ready to Connect!

**Your frontend and backend are now properly configured for connection:**

- ✅ **CORS enabled** for frontend-backend communication
- ✅ **Security configured** with proper role-based access
- ✅ **API endpoints mapped** correctly
- ✅ **Authentication flow** implemented
- ✅ **Database integration** working

**Start both applications and enjoy your fully connected food delivery platform!** 🎉
