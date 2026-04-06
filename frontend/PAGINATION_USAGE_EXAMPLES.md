# Pagination and Sorting - Quick Usage Examples

## 🚀 How to Use the New Pagination Features

### 1. **Restaurants Page Navigation**

#### **Basic Pagination:**
- Visit: `http://localhost:3000/restaurants`
- Use pagination controls at the bottom of the page
- Click page numbers, Previous/Next buttons, or jump to specific page

#### **Sorting Restaurants:**
- Click "Name" button to sort by restaurant name
- Click "Location" button to sort by location
- Click same button again to reverse sort order (asc/desc)

#### **Search and Filter:**
- Use search bar to filter restaurants by name or location
- Use location dropdown to filter by specific location
- Pagination maintains filters applied

### 2. **Restaurant Detail Page - Menu Items**

#### **Menu Item Pagination:**
- Visit any restaurant: `http://localhost:3000/restaurants/1`
- Menu items are paginated (8 items per page)
- Use pagination controls below menu items

#### **Sorting Menu Items:**
- Click "Name" to sort menu items alphabetically
- Click "Price" to sort by price (low to high)
- Click again to reverse order

#### **Search and Filter Menu Items:**
- Search bar filters menu items in real-time
- "Available only" checkbox shows only in-stock items
- Pagination maintains search and filter state

## 🎯 URL Examples for Testing

### **Restaurant Pagination:**
```
Page 1 (default):  http://localhost:8080/api/restaurants/page/0/9/restaurantName/asc
Page 2:           http://localhost:8080/api/restaurants/page/1/9/restaurantName/asc
Page 3:           http://localhost:8080/api/restaurants/page/2/9/restaurantName/asc
```

### **Restaurant Sorting:**
```
Sort by name:      http://localhost:8080/api/restaurants/page/0/9/restaurantName/asc
Sort by location:   http://localhost:8080/api/restaurants/page/0/9/location/asc
Descending order:   http://localhost:8080/api/restaurants/page/0/9/restaurantName/desc
```

### **Menu Item Pagination:**
```
Restaurant 1, Page 1:  http://localhost:8080/api/menuitems/restaurant/1/page/0/8/itemName/asc
Restaurant 1, Page 2:  http://localhost:8080/api/menuitems/restaurant/1/page/1/8/itemName/asc
```

### **Menu Item Sorting:**
```
Sort by name:      http://localhost:8080/api/menuitems/restaurant/1/page/0/8/itemName/asc
Sort by price:      http://localhost:8080/api/menuitems/restaurant/1/page/0/8/price/asc
Price descending:   http://localhost:8080/api/menuitems/restaurant/1/page/0/8/price/desc
```

## 🎮 Interactive Features

### **Pagination Controls:**
```
┌─────────────────────────────────────────────────┐
│  Showing 1 to 9 of 25 records              │
│                                           │
│  ◀ Previous  [1][2][3][4][5]  Next ▶  │
│                                           │
│  Go to page: [2] of 3                    │
└─────────────────────────────────────────────────┘
```

### **Sorting Controls:**
```
┌─────────────────────────────────────────────────┐
│  Sort by:                                 │
│                                           │
│  [Name ▲]  [Location ▼]                │
│                                           │
│  ▲ = Ascending, ▼ = Descending           │
└─────────────────────────────────────────────────┘
```

## 📱 Mobile Experience

### **Responsive Design:**
- **Desktop**: 3-column restaurant grid, 2-column menu items
- **Tablet**: 2-column restaurant grid, 1-column menu items  
- **Mobile**: 1-column grid, stacked controls

### **Touch-Friendly:**
- Large tap targets for pagination buttons
- Swipe-friendly sort buttons
- Accessible form controls

## 🔧 Testing Your Implementation

### **Step 1: Start Backend**
```bash
cd spring-boot-final-project
mvn spring-boot:run
```

### **Step 2: Start Frontend**
```bash
cd frontend
npm start
```

### **Step 3: Test Features**
1. Open `http://localhost:3000/restaurants`
2. Test pagination navigation
3. Test sorting functionality
4. Test search and filters
5. Click on a restaurant to test menu item pagination
6. Test menu item sorting and search

## 🎯 Expected Behavior

### **Loading States:**
- Initial load: Full-page spinner
- Page changes: Small spinner over content
- Buttons disabled during loading

### **Empty States:**
- Friendly message when no results found
- Suggestions to adjust filters
- Maintains pagination controls

### **Error Handling:**
- Fallback to non-paginated APIs if needed
- User-friendly error messages
- Graceful degradation

## 🚀 Performance Benefits

### **Before Pagination:**
- Load ALL restaurants at once
- Slow initial load time
- High memory usage
- Poor user experience with large datasets

### **After Pagination:**
- Load only 9 restaurants initially
- Fast initial load time
- Low memory usage
- Excellent user experience
- Progressive loading as needed

## 🎨 Visual Examples

### **Restaurant Grid with Pagination:**
```
┌─────────────────────────────────────────────────┐
│  🍽️ Pizza Hut     🍽️ Domino's     🍽️ KFC    │
│  Delhi            Delhi            Delhi       │
│  ⭐ 4.5 (120)    ⭐ 4.3 (89)     ⭐ 4.7 (156)│
│                                           │
│  🍽️ Burger King   🍽️ Subway        🍽️ McDonald's│
│  Delhi            Delhi            Delhi       │
│  ⭐ 4.1 (67)     ⭐ 4.4 (102)    ⭐ 4.2 (145)│
│                                           │
│                ┌─ Pagination ─┐               │
│                │  ◀ [1][2][3] ▶ │               │
│                └─────────────────┘               │
└─────────────────────────────────────────────────┘
```

### **Menu Items with Sorting:**
```
┌─────────────────────────────────────────────────┐
│  🍕 Margherita    🍕 Pepperoni     🍕 Veggie   │
│  ₹299            ₹349            ₹279        │
│  [Add to Cart]    [Add to Cart]    [Add to Cart] │
│                                           │
│  Sort by: [Name ▲] [Price ▼]              │
│                                           │
│                ┌─ Pagination ─┐               │
│                │  ◀ [1][2][3] ▶ │               │
│                └─────────────────┘               │
└─────────────────────────────────────────────────┘
```

## 🎯 Key Benefits Achieved

✅ **Better Performance**: Faster load times, less data transfer
✅ **Improved UX**: Intuitive navigation, clear visual feedback
✅ **Scalability**: Handles large datasets efficiently
✅ **Mobile Friendly**: Responsive design for all devices
✅ **Reusable Components**: Pagination and Sorting components can be used anywhere
✅ **Production Ready**: Error handling, loading states, accessibility

Your food ordering system now has enterprise-grade pagination and sorting! 🚀
