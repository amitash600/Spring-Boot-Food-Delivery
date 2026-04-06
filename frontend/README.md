# Food Delivery Platform - Frontend

A modern, responsive web application for the Food Delivery Platform built with React and Tailwind CSS.

## Features

### Customer Features

- 🍽️ Browse restaurants and menu items
- 🛒 Add items to cart and manage orders
- 👤 User profile management
- 📱 Mobile-responsive design
- 🔍 Search and filtering
- 💳 Secure checkout process

### Admin Features

- 📊 Dashboard with analytics
- 👥 Customer management
- 🏪 Restaurant management
- 🍕 Menu item management
- 📦 Order management
- 💰 Payment tracking

## Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **State Management**: React Context API

## Prerequisites

- Node.js 16+ installed
- Backend API running on `http://localhost:8080`
- Modern web browser

## Installation

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`.

## Configuration

### API Endpoint Configuration

Update the API base URL in the following files if your backend is running on a different port:

- `src/contexts/AuthContext.js`
- `src/pages/customer/Home.js`
- `src/pages/customer/Restaurants.js`
- `src/pages/admin/Dashboard.js`

Change `http://localhost:8080` to your backend URL.

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── PrivateRoute.js
│   │   └── AdminRoute.js
│   ├── contexts/           # React Context
│   │   ├── AuthContext.js
│   │   └── CartContext.js
│   ├── pages/              # Page components
│   │   ├── auth/           # Authentication pages
│   │   ├── customer/       # Customer pages
│   │   └── admin/          # Admin pages
│   ├── App.js              # Main app component
│   ├── index.js            # App entry point
│   └── index.css           # Global styles
├── package.json
├── tailwind.config.js
└── README.md
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Key Features

### Authentication

- JWT token-based authentication
- Role-based access control (Customer/Admin)
- Protected routes
- Auto-logout on token expiration

### Shopping Cart

- Add/remove items
- Quantity management
- Restaurant restriction (one restaurant per order)
- Local storage persistence

### Responsive Design

- Mobile-first approach
- Tailwind CSS utilities
- Modern UI components
- Smooth animations and transitions

## API Integration

The frontend integrates with the following backend APIs:

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/admin/customers` - User registration

### Customer APIs

- `GET /api/restaurants` - Get restaurants
- `GET /api/menuitems` - Get menu items
- `POST /api/orders` - Place order
- `GET /api/orders` - Get user orders

### Admin APIs

- `GET /api/admin/customers` - Manage customers
- `GET /api/admin/restaurants` - Manage restaurants
- `GET /api/admin/orders` - Manage orders

## Development Notes

### State Management

- React Context API for global state
- AuthContext for authentication state
- CartContext for shopping cart state

### Routing

- React Router v6 for navigation
- Protected routes for authenticated users
- Admin routes for admin users only

### Styling

- Tailwind CSS for utility-first styling
- Custom color scheme
- Responsive design patterns
- Hover states and transitions

## Build for Production

To create an optimized production build:

```bash
npm run build
```

This creates a `build` folder with optimized static files that can be deployed to any web server.

## Environment Variables

Create a `.env` file in the root directory for environment-specific configuration:

```
REACT_APP_API_BASE_URL=http://localhost:8080
REACT_APP_APP_NAME=FoodDelivery
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your backend allows requests from `http://localhost:3000`
2. **Authentication Issues**: Check that JWT tokens are being stored in localStorage
3. **API Connection**: Verify backend is running on the correct port

### Debug Mode

Enable debug mode by adding to `.env`:

```
REACT_APP_DEBUG=true
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
