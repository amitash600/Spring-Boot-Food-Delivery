# Pagination and Sorting Endpoints Documentation

This document provides all the pagination and sorting endpoints implemented for Restaurants and Menu Items.

## 📄 Page Parameters
- **pageNumber**: Page number (0-based index)
- **pageSize**: Number of items per page
- **field**: Field to sort by (e.g., "restaurantName", "itemName", "price", "location")
- **order**: Sort order ("asc" for ascending, "desc" for descending)

## 🍽️ Restaurant Endpoints

### Admin Endpoints (`/api/admin/restaurants`)

#### Get All Restaurants with Pagination & Sorting
```
GET /api/admin/restaurants/page/{pageNumber}/{pageSize}/{field}/{order}
```
**Example**: `GET /api/admin/restaurants/page/0/10/restaurantName/asc`

#### Get Restaurants by Location with Pagination & Sorting
```
GET /api/admin/restaurants/location/{location}/page/{pageNumber}/{pageSize}/{field}/{order}
```
**Example**: `GET /api/admin/restaurants/location/Delhi/page/0/10/restaurantName/asc`

#### Get Restaurants by Name with Pagination & Sorting
```
GET /api/admin/restaurants/name/{name}/page/{pageNumber}/{pageSize}/{field}/{order}
```
**Example**: `GET /api/admin/restaurants/name/Pizza%20Hut/page/0/10/restaurantName/asc`

### Customer Endpoints (`/api/restaurants`)

#### Get All Restaurants with Pagination & Sorting
```
GET /api/restaurants/page/{pageNumber}/{pageSize}/{field}/{order}
```
**Example**: `GET /api/restaurants/page/0/10/restaurantName/asc`

#### Get Restaurants by Location with Pagination & Sorting
```
GET /api/restaurants/location/{location}/page/{pageNumber}/{pageSize}/{field}/{order}
```
**Example**: `GET /api/restaurants/location/Mumbai/page/0/10/restaurantName/asc`

#### Get Restaurants by Name with Pagination & Sorting
```
GET /api/restaurants/name/{name}/page/{pageNumber}/{pageSize}/{field}/{order}
```
**Example**: `GET /api/restaurants/name/Dominos/page/0/10/restaurantName/asc`

## 🍕 Menu Item Endpoints

### Admin Endpoints (`/api/admin/menuitems`)

#### Get All Menu Items with Pagination & Sorting
```
GET /api/admin/menuitems/page/{pageNumber}/{pageSize}/{field}/{order}
```
**Example**: `GET /api/admin/menuitems/page/0/10/itemName/asc`

#### Get Menu Items by Restaurant with Pagination & Sorting
```
GET /api/admin/menuitems/restaurant/{restaurantId}/page/{pageNumber}/{pageSize}/{field}/{order}
```
**Example**: `GET /api/admin/menuitems/restaurant/1/page/0/10/itemName/asc`

### Customer Endpoints (`/api/menuitems`)

#### Get All Menu Items with Pagination & Sorting
```
GET /api/menuitems/page/{pageNumber}/{pageSize}/{field}/{order}
```
**Example**: `GET /api/menuitems/page/0/10/itemName/asc`

#### Get Menu Items by Restaurant with Pagination & Sorting
```
GET /api/menuitems/restaurant/{restaurantId}/page/{pageNumber}/{pageSize}/{field}/{order}
```
**Example**: `GET /api/menuitems/restaurant/1/page/0/10/price/asc`

## 📊 Response Format

All pagination endpoints return a `Page<T>` object with the following structure:

```json
{
  "statusCode": 200,
  "message": "Restaurants fetched successfully with pagination and sorting",
  "data": {
    "content": [
      {
        "restaurantId": 1,
        "restaurantName": "Pizza Hut",
        "location": "Delhi",
        "menuItems": [...]
      }
    ],
    "pageable": {
      "sort": {
        "sorted": true,
        "unsorted": false
      },
      "pageNumber": 0,
      "pageSize": 10
    },
    "totalElements": 25,
    "totalPages": 3,
    "last": false,
    "first": true,
    "numberOfElements": 10,
    "empty": false
  }
}
```

## 🔧 Available Sort Fields

### Restaurant Fields:
- `restaurantName`
- `location`
- `restaurantId`

### Menu Item Fields:
- `itemName`
- `price`
- `availability`
- `itemId`

## 📝 Usage Examples

### Frontend Integration (JavaScript/React)

```javascript
// Fetch restaurants with pagination and sorting
const fetchRestaurants = async (page = 0, size = 10, sortBy = 'restaurantName', order = 'asc') => {
  try {
    const response = await fetch(`/api/restaurants/page/${page}/${size}/${sortBy}/${order}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
  }
};

// Usage
fetchRestaurants(0, 10, 'restaurantName', 'asc')
  .then(pagedData => {
    console.log('Restaurants:', pagedData.content);
    console.log('Total pages:', pagedData.totalPages);
    console.log('Current page:', pagedData.pageable.pageNumber);
  });
```

### Postman Testing

1. **Basic Pagination**: 
   - URL: `GET /api/restaurants/page/0/5/restaurantName/asc`
   - Description: Get first 5 restaurants sorted by name ascending

2. **Sort by Price (Menu Items)**:
   - URL: `GET /api/menuitems/page/0/10/price/desc`
   - Description: Get first 10 menu items sorted by price descending

3. **Restaurant-specific Menu Items**:
   - URL: `GET /api/menuitems/restaurant/1/page/0/5/itemName/asc`
   - Description: Get first 5 menu items from restaurant 1, sorted by name

## 🎯 Best Practices

1. **Default Values**: Always provide sensible defaults
   - Page: 0 (first page)
   - Size: 10 (reasonable for UI)
   - Sort: `restaurantName` or `itemName`
   - Order: `asc`

2. **Error Handling**: All endpoints handle empty results gracefully

3. **Security**: Customer endpoints are properly secured with `@PreAuthorize`

4. **Performance**: Pagination reduces database load and improves response times

## 🔍 Frontend Implementation Tips

### Pagination Controls
```javascript
// Pagination component state
const [pagination, setPagination] = useState({
  page: 0,
  size: 10,
  sortBy: 'restaurantName',
  order: 'asc'
});

// Handle page changes
const handlePageChange = (newPage) => {
  setPagination(prev => ({ ...prev, page: newPage }));
};

// Handle sort changes
const handleSortChange = (field) => {
  setPagination(prev => ({
    ...prev,
    sortBy: field,
    order: prev.sortBy === field && prev.order === 'asc' ? 'desc' : 'asc'
  }));
};
```

### Loading States
```javascript
const [loading, setLoading] = useState(false);
const [data, setData] = useState(null);

useEffect(() => {
  const loadData = async () => {
    setLoading(true);
    try {
      const result = await fetchRestaurants(pagination.page, pagination.size, pagination.sortBy, pagination.order);
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  loadData();
}, [pagination]);
```

This implementation provides a complete pagination and sorting solution for your food ordering system! 🚀
