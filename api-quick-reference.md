# Food Delivery Platform - API Quick Reference

## Authentication

All protected endpoints require JWT token in header: `Authorization: Bearer <token>`

### Login

```
POST /api/auth/login
{
  "username": "your_username",
  "password": "your_password"
}
```

## Customer APIs

### Profile Management

- **GET** `/api/customer/profile` - Get my profile
- **PUT** `/api/customer/profile` - Update my profile

### Restaurant Browsing

- **GET** `/api/restaurants` - View all restaurants
- **GET** `/api/restaurants/{id}` - View specific restaurant

### Menu Browsing

- **GET** `/api/menuitems` - View all menu items
- **GET** `/api/menuitems/restaurant/{restaurantId}` - View restaurant menu

### Order Management

- **POST** `/api/orders` - Place order
- **GET** `/api/orders` - View my orders
- **GET** `/api/orders/{orderId}` - View specific order
- **PUT** `/api/orders/{orderId}/cancel` - Cancel order

### Order Item Management

- **GET** `/api/orders/{orderId}/items` - View order items
- **POST** `/api/orders/{orderId}/items` - Add item to order
- **PUT** `/api/orders/items/{orderItemId}` - Update quantity
- **DELETE** `/api/orders/items/{orderItemId}` - Remove item

### Payment Management

- **GET** `/api/payments/{paymentId}` - View payment details

## Admin APIs

### Customer Management

- **GET** `/api/admin/customers` - View all customers
- **GET** `/api/admin/customers/{id}` - View customer
- **POST** `/api/admin/customers` - Create customer
- **PUT** `/api/admin/customers/{id}` - Update customer
- **DELETE** `/api/admin/customers/{id}` - Delete customer

### Restaurant Management

- **GET** `/api/admin/restaurants` - View all restaurants
- **GET** `/api/admin/restaurants/{id}` - View restaurant
- **POST** `/api/admin/restaurants` - Create restaurant
- **PUT** `/api/admin/restaurants/{id}` - Update restaurant
- **DELETE** `/api/admin/restaurants/{id}` - Delete restaurant

### Menu Item Management

- **GET** `/api/admin/menuitems` - View all menu items
- **GET** `/api/admin/menuitems/{id}` - View menu item
- **GET** `/api/admin/menuitems/restaurant/{restaurantId}` - View restaurant menu
- **POST** `/api/admin/menuitems` - Create menu item
- **PUT** `/api/admin/menuitems/{id}` - Update menu item
- **DELETE** `/api/admin/menuitems/{id}` - Delete menu item

### Order Management

- **GET** `/api/admin/orders` - View all orders
- **GET** `/api/admin/orders/{id}` - View order
- **GET** `/api/admin/orders/customer/{customerId}` - View customer orders
- **GET** `/api/admin/orders/status/{status}` - View orders by status
- **GET** `/api/admin/orders/by-date/{date}` - View orders by date
- **GET** `/api/admin/orders/amount/{min}/{max}` - View orders by amount range
- **GET** `/api/admin/orders/restaurant/{restaurantId}` - View restaurant orders
- **PUT** `/api/admin/orders/{id}/status` - Update order status
- **PUT** `/api/admin/orders/{id}/cancel` - Cancel order

### Order Item Management

- **GET** `/api/admin/orderitems/order/{orderId}` - View order items
- **POST** `/api/admin/orderitems/order/{orderId}/items` - Add item to order
- **PUT** `/api/admin/orderitems/{id}` - Update item quantity
- **DELETE** `/api/admin/orderitems/{id}` - Remove item

### Payment Management

- **GET** `/api/admin/payments/{id}` - View payment
- **GET** `/api/admin/payments/status/{status}` - View payments by status
- **GET** `/api/admin/payments/method/{method}` - View payments by method
- **PUT** `/api/admin/payments/{id}/status` - Update payment status

## Status Values

### Order Status

- `PENDING_PAYMENT`
- `PLACED`
- `CONFIRMED`
- `PREPARING`
- `DELIVERED`
- `CANCELLED`

### Payment Status

- `PENDING`
- `SUCCESS`
- `FAILED`

### Payment Methods

- `UPI`
- `CARD`
- `NET_BANKING`
- `CASH`

## Common Response Format

```json
{
  "statusCode": 200,
  "message": "Operation successful",
  "data": { ... }
}
```

## Error Responses

- `401` - Unauthorized (invalid credentials)
- `403` - Access Denied (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `400` - Bad Request (invalid data)
- `409` - Conflict (data integrity violation)

## Quick Test Commands

### Customer Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john.doe","password":"password123"}'
```

### View Restaurants (Customer)

```bash
curl -X GET http://localhost:8080/api/restaurants \
  -H "Authorization: Bearer <token>"
```

### Place Order (Customer)

```bash
curl -X POST http://localhost:8080/api/orders \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "orderItems": [
      {"menuItem":{"itemId":1},"quantity":2}
    ],
    "payment":{"paymentMethod":"CARD","paymentStatus":"PENDING"}
  }'
```

### Create Restaurant (Admin)

```bash
curl -X POST http://localhost:8080/api/admin/restaurants \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"restaurantName":"New Restaurant","location":"123 Main St"}'
```
