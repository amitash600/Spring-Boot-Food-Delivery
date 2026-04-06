# 🍕 Food Delivery Platform - Spring Boot

A comprehensive food delivery management system built with Spring Boot, featuring customer ordering, restaurant management, and admin dashboard capabilities.

## 🚀 Features

### Customer Features
- 🔐 User registration and login with JWT authentication
- 🍽️ Browse restaurants and menu items
- 🛒 Add items to cart and place orders
- 📦 Track order status and history
- 👤 Profile management
- 💳 Payment processing

### Admin Features
- 👥 Customer management
- 🏪 Restaurant management
- 📋 Menu item management
- 📊 Order management and status tracking
- 💰 Payment monitoring
- 📈 Analytics dashboard

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 4.0.3
- **Language**: Java 17
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA / Hibernate
- **Security**: Spring Security with JWT
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Axios

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6+
- PostgreSQL 12+
- Node.js 16+ (for frontend)
- Git

## 🚀 Quick Start

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-username/spring-boot-final-project.git
cd spring-boot-final-project
```

2. **Database Setup**
```sql
-- Create database
CREATE DATABASE food_delivery;

-- Create user (optional)
CREATE USER food_delivery_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE food_delivery TO food_delivery_user;
```

3. **Configure Database**
Update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/food_delivery
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JWT Configuration
jwt.secret=mySecretKey
jwt.expiration=86400
```

4. **Run the Application**
```bash
# Using Maven
mvn spring-boot:run

# Or using the Maven wrapper
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## 📊 Database Schema

The application uses the following main entities:

- **Customer**: User profiles and authentication
- **Restaurant**: Restaurant information
- **MenuItem**: Food items and pricing
- **Order**: Order records and status
- **OrderItem**: Items within orders
- **Payment**: Payment transactions

### Entity Relationships
```
Customer (1) ←→ (N) Order (1) ←→ (N) OrderItem (N) ←→ (1) MenuItem
Order (1) ←→ (1) Payment
Restaurant (1) ←→ (N) MenuItem
```

## 🔐 Security

### Authentication
- JWT-based authentication
- Role-based access control (CUSTOMER/ADMIN)
- Password encryption with BCrypt
- Token expiration handling

### API Security
- CORS configuration for frontend integration
- Method-level security with @PreAuthorize
- Protected endpoints based on user roles

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Customer Endpoints
- `GET /api/restaurants` - Get all restaurants
- `GET /api/menuitems` - Get menu items
- `POST /api/orders` - Place order
- `GET /api/orders` - Get user orders

### Admin Endpoints
- `GET /api/admin/customers` - Manage customers
- `GET /api/admin/restaurants` - Manage restaurants
- `GET /api/admin/orders` - Manage orders
- `PUT /api/admin/orders/{id}/status` - Update order status

## 🏗️ Project Structure

```
src/
├── main/
│   ├── java/jsp/springbootfinal/
│   │   ├── controller/     # REST controllers
│   │   ├── service/        # Business logic
│   │   ├── dao/           # Data access layer
│   │   ├── entity/        # JPA entities
│   │   ├── dto/           # Data transfer objects
│   │   ├── enums/         # Enums (Status, PaymentStatus)
│   │   ├── security/      # JWT and security config
│   │   └── repository/    # Spring Data repositories
│   └── resources/
│       └── application.properties
└── test/                  # Test classes
```

## 🧪 Testing

Run the test suite:
```bash
mvn test
```

## 🔧 Configuration

### Environment Variables
- `jwt.secret`: JWT signing secret
- `jwt.expiration`: Token expiration time in seconds

### Database Configuration
Configure in `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/food_delivery
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

## 🚀 Deployment

### Docker Deployment
```bash
# Build the application
mvn clean package

# Run with Docker (Dockerfile required)
docker build -t food-delivery-api .
docker run -p 8080:8080 food-delivery-api
```

### Production Considerations
- Use environment variables for sensitive data
- Configure database connection pooling
- Enable HTTPS in production
- Set up proper logging and monitoring

## 📈 Order Status Flow

Orders follow this status progression:
```
PENDING_PAYMENT → PLACED → CONFIRMED → PREPARING → DELIVERED
                     ↓
                 CANCELLED
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Spring Boot team for the amazing framework
- PostgreSQL for the robust database
- React and Tailwind CSS communities
- All contributors and users of this project

## 📞 Contact

For any queries or support, please reach out to:
- **Your Name**: [your-email@example.com]
- **GitHub**: [@your-username]

---

⭐ If this project helped you, please give it a star!
