# 🍕 Food Delivery Platform - Spring Boot

<div align="center">

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.3-green?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=for-the-badge&logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-Authentication-red?style=for-the-badge&logo=jwt)

**A comprehensive enterprise-grade food delivery management system built with modern Spring Boot and React technologies**

[🚀 Live Demo](#) · [📖 Documentation](#documentation) · [🔧 Setup Guide](#quick-start) · [📊 API Reference](#api-documentation)

</div>

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [🚀 Features](#-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [🏗️ Architecture](#️-architecture)
- [📊 Database Design](#-database-design)
- [🚀 Quick Start](#-quick-start)
- [📚 API Documentation](#-api-documentation)
- [🔧 Configuration](#-configuration)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [📈 Performance & Scaling](#-performance--scaling)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🎯 Project Overview

This is a **full-stack food delivery platform** similar to Swiggy, Zomato, or Uber Eats, built with enterprise-grade technologies. The system provides a complete solution for:

- **Customers** to browse restaurants, place orders, and track deliveries
- **Restaurants** to manage menus and process orders
- **Administrators** to oversee the entire platform operations

### 🎯 Business Value

- **Scalable Architecture**: Designed to handle thousands of concurrent users
- **Secure Transactions**: JWT-based authentication and secure payment processing
- **Real-time Updates**: Order tracking and status management
- **Admin Dashboard**: Comprehensive management interface
- **RESTful API**: Clean and well-documented API endpoints

## 🚀 Features

### 🛍️ Customer Features

| Feature                    | Description                                  | Technology               |
| -------------------------- | -------------------------------------------- | ------------------------ |
| **🔐 Authentication**      | Secure login/registration with JWT           | Spring Security + JWT    |
| **🍽️ Restaurant Browsing** | Search and filter restaurants                | React + Spring Boot      |
| **🛒 Shopping Cart**       | Add/remove items, calculate totals           | React Context API        |
| **📦 Order Management**    | Place orders, track status, view history     | Spring Boot + PostgreSQL |
| **👤 Profile Management**  | Update personal information, change password | Spring Boot + Email      |
| **💳 Payment Processing**  | Secure payment integration                   | Spring Boot              |
| **📱 Responsive Design**   | Mobile-friendly interface                    | Tailwind CSS             |

### 🏪 Admin Features

| Feature                     | Description                            | Technology         |
| --------------------------- | -------------------------------------- | ------------------ |
| **👥 User Management**      | View, manage customers and restaurants | Spring Boot Admin  |
| **🏪 Restaurant Control**   | Add/edit restaurants, manage menus     | Spring Boot + JPA  |
| **� Order Analytics**       | Real-time order statistics and reports | PostgreSQL + React |
| **� Payment Monitoring**    | Track transactions, handle refunds     | Spring Boot        |
| **🔧 System Configuration** | Manage platform settings               | Spring Boot        |
| **📈 Dashboard Analytics**  | Comprehensive analytics dashboard      | React + Charts     |

### 🔒 Security Features

- **JWT Authentication**: Stateless authentication with token expiration
- **Role-Based Access Control**: CUSTOMER, ADMIN roles with proper authorization
- **Password Security**: BCrypt encryption for secure password storage
- **Email Verification**: Password reset with email verification
- **CORS Configuration**: Secure cross-origin resource sharing
- **Input Validation**: Comprehensive data validation and sanitization

## 🛠️ Technology Stack

### 🚀 Backend Technologies

| Technology          | Version | Purpose                           |
| ------------------- | ------- | --------------------------------- |
| **Spring Boot**     | 4.0.3   | Main application framework        |
| **Java**            | 17      | Programming language              |
| **Spring Security** | 6.x     | Authentication and authorization  |
| **Spring Data JPA** | 3.x     | Database ORM and repository layer |
| **PostgreSQL**      | 15+     | Primary database                  |
| **JWT**             | 0.11.5  | Token-based authentication        |
| **Spring Mail**     | 6.x     | Email services for password reset |
| **Maven**           | 3.8+    | Build and dependency management   |
| **Hibernate**       | 6.x     | JPA implementation                |

### 🎨 Frontend Technologies

| Technology       | Version | Purpose                     |
| ---------------- | ------- | --------------------------- |
| **React**        | 18.2.0  | UI framework                |
| **React Router** | 6.8.0   | Client-side routing         |
| **Tailwind CSS** | 3.2.7   | Utility-first CSS framework |
| **Axios**        | 1.3.4   | HTTP client for API calls   |
| **Lucide React** | 0.220.0 | Icon library                |
| **Headless UI**  | 1.7.13  | Accessible UI components    |
| **TypeScript**   | 4.9.5   | Type safety (optional)      |

### 🛠️ Development Tools

| Tool                     | Purpose                       |
| ------------------------ | ----------------------------- |
| **Spring Boot DevTools** | Hot reload during development |
| **Postman**              | API testing and documentation |
| **Git**                  | Version control               |
| **VS Code**              | IDE for frontend development  |
| **IntelliJ IDEA**        | IDE for backend development   |

## 🏗️ Architecture

### � System Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[React Application] --> B[React Router]
        A --> C[Axios HTTP Client]
        A --> D[Tailwind CSS]
    end

    subgraph "Backend Layer"
        E[Spring Boot Application] --> F[Controllers]
        E --> G[Services]
        E --> H[Repositories]
        E --> I[Spring Security]
    end

    subgraph "Data Layer"
        J[PostgreSQL Database] --> K[JPA/Hibernate]
        L[JWT Tokens] --> M[Authentication]
    end

    subgraph "External Services"
        N[Email Service] --> O[Gmail SMTP]
    end

    C --> F
    F --> G
    G --> H
    H --> K
    K --> J
    I --> L
    G --> N
```

### 🔄 Request Flow

1. **User Request** → React Frontend
2. **HTTP Request** → Spring Boot Controller
3. **Authentication** → JWT Validation
4. **Business Logic** → Service Layer
5. **Data Access** → Repository Layer
6. **Database** → PostgreSQL
7. **Response** → JSON Response to Frontend

### 🎯 Design Patterns Used

- **MVC Pattern**: Model-View-Controller architecture
- **Repository Pattern**: Data access abstraction
- **DTO Pattern**: Data Transfer Objects for API communication
- **Service Layer Pattern**: Business logic separation
- **Dependency Injection**: Spring's IoC container

## 📊 Database Design

### 🗄️ Entity Relationship Diagram

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER ||--o{ PASSWORD_RESET_TOKEN : has
    ORDER ||--|| PAYMENT : has
    ORDER ||--o{ ORDER_ITEM : contains
    ORDER_ITEM }o--|| MENU_ITEM : references
    RESTAURANT ||--o{ MENU_ITEM : has

    CUSTOMER {
        int customer_id PK
        string customer_name
        string email_id UK
        long contact_number UK
        string address
        string username UK
        string password
        string role
    }

    RESTAURANT {
        int restaurant_id PK
        string restaurant_name
        string location
    }

    MENU_ITEM {
        int item_id PK
        string item_name
        double price
        boolean availability
        int restaurant_id FK
    }

    ORDER {
        int order_id PK
        datetime order_date_time
        enum status
        double total_amount
        string delivery_address
        string recipient_name
        string special_instructions
        int customer_id FK
    }

    ORDER_ITEM {
        int order_item_id PK
        int quantity
        double price
        int order_id FK
        int item_id FK
    }

    PAYMENT {
        int payment_id PK
        datetime payment_date
        double amount
        enum payment_status
        string payment_method
        int order_id FK
    }

    PASSWORD_RESET_TOKEN {
        int token_id PK
        string token UK
        datetime expiry_date
        int customer_id FK
    }
```

### 📊 Database Schema Summary

| Table                    | Primary Key   | Foreign Keys      | Indexes                            |
| ------------------------ | ------------- | ----------------- | ---------------------------------- |
| **customer**             | customer_id   | -                 | email_id, username, contact_number |
| **restaurant**           | restaurant_id | -                 | restaurant_name                    |
| **menu_item**            | item_id       | restaurant_id     | item_name                          |
| **orders**               | order_id      | customer_id       | order_date_time, status            |
| **order_item**           | order_item_id | order_id, item_id | -                                  |
| **payment**              | payment_id    | order_id          | payment_date, payment_status       |
| **password_reset_token** | token_id      | customer_id       | token, expiry_date                 |

## 📋 Prerequisites

### 🔧 System Requirements

| Requirement    | Minimum Version | Recommended |
| -------------- | --------------- | ----------- |
| **Java**       | 17              | 17+         |
| **Maven**      | 3.6+            | 3.8+        |
| **PostgreSQL** | 12+             | 15+         |
| **Node.js**    | 16+             | 18+         |
| **npm**        | 8+              | 9+          |
| **Git**        | 2.30+           | Latest      |

### 🖥️ Development Environment

- **IDE**: IntelliJ IDEA / VS Code
- **Database Tool**: pgAdmin / DBeaver
- **API Testing**: Postman / Insomnia
- **Browser**: Chrome / Firefox (with React DevTools)

## 🚀 Quick Start

### 📥 Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/spring-boot-final-project.git
cd spring-boot-final-project
```

### 🗄️ Step 2: Database Setup

#### PostgreSQL Setup

```sql
-- Create database
CREATE DATABASE food_delivery;

-- Create user (optional but recommended)
CREATE USER food_delivery_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE food_delivery TO food_delivery_user;
```

#### Database Configuration Options

**⚠️ IMPORTANT: Never commit sensitive credentials to GitHub!**

**Option 1: Environment Variables (Recommended for Production)**

```bash
# Create .env file (already in .gitignore)
cp .env.example .env
# Edit .env with your actual credentials
```

**Option 2: System Environment Variables**

```bash
export DATABASE_URL=jdbc:postgresql://localhost:5432/food_delivery
export DATABASE_USERNAME=food_delivery_user
export DATABASE_PASSWORD=your_secure_password
export JWT_SECRET=your_super_secure_jwt_secret_key_32_chars_min
```

**Option 3: Application Properties (Development Only)**

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/food_delivery
spring.datasource.username=food_delivery_user
spring.datasource.password=your_secure_password
```

### 🚀 Step 3: Backend Setup

```bash
# Build and run the application
mvn clean install
mvn spring-boot:run

# Or using the Maven wrapper
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

#### Verify Backend Installation

```bash
# Check health endpoint
curl http://localhost:8080/actuator/health

# Test API documentation (if Swagger is enabled)
curl http://localhost:8080/swagger-ui.html
```

### 🎨 Step 4: Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will start on `http://localhost:3000`

#### Frontend Configuration

Create `frontend/.env` file:

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_JWT_EXPIRY=24h
```

### ✅ Step 5: Verify Installation

1. **Backend**: Open `http://localhost:8080` in your browser
2. **Frontend**: Open `http://localhost:3000` in your browser
3. **API Test**: Use Postman to test authentication endpoints

## 📚 API Documentation

### 🔐 Authentication Endpoints

| Method | Endpoint                       | Description            | Auth Required |
| ------ | ------------------------------ | ---------------------- | ------------- |
| `POST` | `/api/auth/login`              | User login             | No            |
| `POST` | `/api/auth/register`           | User registration      | No            |
| `POST` | `/api/auth/forgot-password`    | Request password reset | No            |
| `POST` | `/api/auth/reset-password`     | Reset password         | No            |
| `POST` | `/api/auth/change-password`    | Change password        | Yes           |
| `GET`  | `/api/auth/verify-reset-token` | Verify reset token     | No            |

### 🛍️ Customer Endpoints

| Method | Endpoint                         | Description             | Auth Required |
| ------ | -------------------------------- | ----------------------- | ------------- |
| `GET`  | `/api/restaurants`               | Get all restaurants     | No            |
| `GET`  | `/api/restaurants/{id}`          | Get restaurant by ID    | No            |
| `GET`  | `/api/menuitems`                 | Get all menu items      | No            |
| `GET`  | `/api/menuitems/restaurant/{id}` | Get menu by restaurant  | No            |
| `POST` | `/api/orders`                    | Place new order         | Yes           |
| `GET`  | `/api/orders`                    | Get user orders         | Yes           |
| `GET`  | `/api/orders/{id}`               | Get order by ID         | Yes           |
| `GET`  | `/api/customers/profile`         | Get customer profile    | Yes           |
| `PUT`  | `/api/customers/profile`         | Update customer profile | Yes           |

### 🏪 Admin Endpoints

| Method   | Endpoint                        | Description         | Auth Required |
| -------- | ------------------------------- | ------------------- | ------------- |
| `GET`    | `/api/admin/customers`          | Get all customers   | Admin         |
| `GET`    | `/api/admin/restaurants`        | Get all restaurants | Admin         |
| `POST`   | `/api/admin/restaurants`        | Add new restaurant  | Admin         |
| `PUT`    | `/api/admin/restaurants/{id}`   | Update restaurant   | Admin         |
| `DELETE` | `/api/admin/restaurants/{id}`   | Delete restaurant   | Admin         |
| `GET`    | `/api/admin/menuitems`          | Get all menu items  | Admin         |
| `POST`   | `/api/admin/menuitems`          | Add new menu item   | Admin         |
| `PUT`    | `/api/admin/menuitems/{id}`     | Update menu item    | Admin         |
| `DELETE` | `/api/admin/menuitems/{id}`     | Delete menu item    | Admin         |
| `GET`    | `/api/admin/orders`             | Get all orders      | Admin         |
| `PUT`    | `/api/admin/orders/{id}/status` | Update order status | Admin         |
| `GET`    | `/api/admin/payments`           | Get all payments    | Admin         |

### 📊 Response Format

All API responses follow a consistent JSON format:

```json
{
  "success": true,
  "data": {},
  "message": "Operation successful",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### 🔒 Authentication Headers

Include JWT token in Authorization header:

```http
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

## 🏗️ Project Structure

### 📁 Backend Structure

```
src/
├── main/
│   ├── java/jsp/springbootfinal/
│   │   ├── SpringBootFinalProjectApplication.java  # Main application class
│   │   ├── config/                                 # Configuration classes
│   │   │   └── EmailConfig.java                   # Email configuration
│   │   ├── controller/                             # REST controllers
│   │   │   ├── AuthController.java                # Authentication endpoints
│   │   │   ├── AdminController.java               # Admin endpoints
│   │   │   ├── CustomerController.java            # Customer endpoints
│   │   │   ├── RestaurantController.java          # Restaurant endpoints
│   │   │   ├── MenuItemController.java            # Menu item endpoints
│   │   │   ├── OrderController.java              # Order endpoints
│   │   │   └── PaymentController.java             # Payment endpoints
│   │   ├── dao/                                   # Data Access Objects (legacy)
│   │   ├── dto/                                   # Data Transfer Objects
│   │   │   ├── LoginRequest.java                  # Login request DTO
│   │   │   ├── JwtResponse.java                   # JWT response DTO
│   │   │   ├── OrderResponseDTO.java              # Order response DTO
│   │   │   └── ...                                # Other DTOs
│   │   ├── entity/                                # JPA entities
│   │   │   ├── Customer.java                     # Customer entity
│   │   │   ├── Restaurant.java                    # Restaurant entity
│   │   │   ├── MenuItem.java                      # Menu item entity
│   │   │   ├── Order.java                         # Order entity
│   │   │   ├── OrderItem.java                     # Order item entity
│   │   │   ├── Payment.java                       # Payment entity
│   │   │   └── PasswordResetToken.java            # Password reset token
│   │   ├── enums/                                 # Enumerations
│   │   │   ├── Status.java                        # Order status enum
│   │   │   └── PaymentStatus.java                 # Payment status enum
│   │   ├── repository/                            # Spring Data repositories
│   │   │   ├── CustomerRepository.java            # Customer repository
│   │   │   ├── RestaurantRepository.java          # Restaurant repository
│   │   │   ├── MenuItemRepository.java            # Menu item repository
│   │   │   ├── OrderRepository.java               # Order repository
│   │   │   └── PaymentRepository.java             # Payment repository
│   │   ├── security/                              # Security configuration
│   │   │   ├── JwtUtil.java                       # JWT utilities
│   │   │   └── JwtAuthenticationFilter.java       # JWT filter
│   │   └── service/                               # Business logic services
│   │       ├── PasswordResetService.java          # Password reset service
│   │       └── ...                                # Other services
│   └── resources/
│       ├── application.properties                  # Main configuration
│       └── application-dev.properties              # Development config
└── test/                                          # Test classes
    └── java/jsp/springbootfinal/
        ├── controller/                             # Controller tests
        ├── service/                                # Service tests
        └── repository/                             # Repository tests
```

### � Frontend Structure

```
frontend/
├── public/
│   ├── index.html                                  # Main HTML file
│   └── favicon.ico                                 # Favicon
├── src/
│   ├── components/                                 # Reusable components
│   │   ├── common/                                 # Common components
│   │   ├── auth/                                   # Authentication components
│   │   ├── restaurant/                             # Restaurant components
│   │   ├── order/                                  # Order components
│   │   └── admin/                                  # Admin components
│   ├── pages/                                      # Page components
│   │   ├── Home.js                                 # Home page
│   │   ├── Login.js                                # Login page
│   │   ├── Register.js                             # Registration page
│   │   ├── Restaurants.js                          # Restaurants page
│   │   ├── Orders.js                               # Orders page
│   │   └── AdminDashboard.js                      # Admin dashboard
│   ├── services/                                   # API services
│   │   ├── api.js                                  # Axios configuration
│   │   ├── authService.js                         # Authentication service
│   │   ├── restaurantService.js                    # Restaurant service
│   │   └── orderService.js                         # Order service
│   ├── context/                                    # React Context
│   │   ├── AuthContext.js                          # Authentication context
│   │   └── CartContext.js                          # Shopping cart context
│   ├── hooks/                                      # Custom hooks
│   │   ├── useAuth.js                              # Authentication hook
│   │   └── useApi.js                               # API hook
│   ├── utils/                                      # Utility functions
│   │   ├── constants.js                            # Application constants
│   │   └── helpers.js                              # Helper functions
│   ├── styles/                                     # CSS/SCSS files
│   │   └── globals.css                             # Global styles
│   ├── App.js                                      # Main App component
│   └── index.js                                    # Entry point
├── package.json                                    # Dependencies and scripts
├── tailwind.config.js                              # Tailwind configuration
└── .env.example                                    # Environment variables example
```

## 🧪 Testing

### 🧪 Backend Testing

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=CustomerRepositoryTest

# Run tests with coverage
mvn test jacoco:report

# Run integration tests
mvn test -Dtest=**/*IntegrationTest
```

### 🧪 Frontend Testing

```bash
# Navigate to frontend directory
cd frontend

# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- CustomerService.test.js
```

### 🧪 API Testing with Postman

Import the Postman collection from `api-examples-complete.json`:

1. Open Postman
2. Click "Import"
3. Select the JSON file
4. Run the collection

### 🧪 End-to-End Testing

```bash
# Install Cypress (if not already installed)
npm install cypress --save-dev

# Run Cypress tests
npx cypress open
```

## 📈 Order & Payment Status Flow

### 🔄 Order Status Progression

```mermaid
stateDiagram-v2
    [*] --> PENDING_PAYMENT
    PENDING_PAYMENT --> PLACED: Payment Confirmed
    PENDING_PAYMENT --> CANCELLED: Payment Failed/Cancelled
    PLACED --> CONFIRMED: Order Accepted
    PLACED --> CANCELLED: Customer Cancelled
    CONFIRMED --> PREPARING: Kitchen Started
    PREPARING --> READY_FOR_PICKUP: Food Ready
    READY_FOR_PICKUP --> OUT_FOR_DELIVERY: Picked Up
    OUT_FOR_DELIVERY --> DELIVERED: Delivered Successfully
    CANCELLED --> [*]
    DELIVERED --> [*]
```

### 💳 Payment Status Flow

```mermaid
stateDiagram-v2
    [*] --> PENDING: Payment Initiated
    PENDING --> COMPLETED: Payment Successful
    PENDING --> FAILED: Payment Failed
    PENDING --> CANCELLED: Payment Cancelled
    FAILED --> PENDING: Retry Payment
    CANCELLED --> [*]
    COMPLETED --> [*]
```

### 📊 Status Descriptions

| Order Status         | Description                     | Next Actions                 |
| -------------------- | ------------------------------- | ---------------------------- |
| **PENDING_PAYMENT**  | Order created, awaiting payment | Complete payment or cancel   |
| **PLACED**           | Payment confirmed, order placed | Restaurant can accept/reject |
| **CONFIRMED**        | Restaurant accepted order       | Start food preparation       |
| **PREPARING**        | Food being prepared             | Update when ready            |
| **READY_FOR_PICKUP** | Food ready for pickup           | Assign delivery partner      |
| **OUT_FOR_DELIVERY** | Order on the way                | Track delivery progress      |
| **DELIVERED**        | Order delivered successfully    | Order completed              |
| **CANCELLED**        | Order cancelled                 | Process refund if applicable |

## 🔧 Configuration

### 🌍 Environment Variables

#### Backend Configuration (.env)

```bash
# Database Configuration
DATABASE_URL=jdbc:postgresql://localhost:5432/food_delivery
DATABASE_USERNAME=food_delivery_user
DATABASE_PASSWORD=your_secure_password

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key_minimum_32_characters
JWT_EXPIRATION=86400

# Email Configuration
SPRING_MAIL_HOST=smtp.gmail.com
SPRING_MAIL_PORT=587
SPRING_MAIL_USERNAME=your-email@gmail.com
SPRING_MAIL_PASSWORD=your-app-password

# Application Configuration
SPRING_PROFILES_ACTIVE=dev
SERVER_PORT=8080
```

#### Frontend Configuration (.env)

```bash
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_JWT_EXPIRY=24h

# Application Configuration
REACT_APP_NAME=Food Delivery Platform
REACT_APP_VERSION=1.0.0
```

### 🗃️ Database Configuration

#### PostgreSQL Configuration

```properties
# Connection Settings
spring.datasource.url=jdbc:postgresql://localhost:5432/food_delivery
spring.datasource.username=food_delivery_user
spring.datasource.password=your_secure_password
spring.datasource.driver-class-name=org.postgresql.Driver

# Connection Pooling
spring.datasource.hikari.connection-timeout=20000
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.idle-timeout=300000

# JPA/Hibernate Settings
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.defer-datasource-initialization=true
```

#### Security Configuration

```properties
# JWT Settings
jwt.secret=your_super_secure_jwt_secret_key_minimum_32_characters
jwt.expiration=86400

# CORS Configuration
cors.allowed.origins=http://localhost:3000,http://localhost:3001
cors.allowed.methods=GET,POST,PUT,DELETE,OPTIONS
cors.allowed.headers=*
cors.allow.credentials=true
```

## 🚀 Deployment

### ☁️ Cloud Deployment

#### AWS Deployment

```bash
# Create application
aws elasticbeanstalk create-application --application-name food-delivery

# Deploy using JAR file
# Build the application first: mvn clean package
# Upload the JAR file from target/ directory to AWS Elastic Beanstalk

# Alternative: Deploy to EC2 directly
# 1. Create EC2 instance with Java 17
# 2. Install PostgreSQL on separate RDS instance
# 3. Upload JAR file and run: java -jar spring-boot-final-project-*.jar
```

#### Heroku Deployment

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create application
heroku create your-app-name

# Set environment variables
heroku config:set DATABASE_URL=postgresql://user:pass@host:5432/dbname
heroku config:set JWT_SECRET=your_jwt_secret

# Deploy
git push heroku main
```

#### Google Cloud Platform

```bash
# Build and deploy to Cloud Run
gcloud builds submit --tag gcr.io/your-project-id/food-delivery-api
gcloud run deploy food-delivery-api --image gcr.io/your-project-id/food-delivery-api --platform managed
```

## 📈 Performance & Scaling

### 🚀 Performance Optimization

#### Backend Optimization

```properties
# Application Performance
spring.jpa.properties.hibernate.jdbc.batch_size=20
spring.jpa.properties.hibernate.order_inserts=true
spring.jpa.properties.hibernate.order_updates=true
spring.jpa.properties.hibernate.jdbc.fetch_size=100

# Caching Configuration
spring.cache.type=redis
spring.redis.host=localhost
spring.redis.port=6379
spring.redis.timeout=2000ms
```

#### Frontend Optimization

```javascript
// Code splitting
const LazyComponent = React.lazy(() => import("./LazyComponent"));

// Service Worker for caching
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}

// Image optimization
const optimizedImage = new Image();
optimizedImage.src = "/api/images/optimized?src=" + imageUrl;
```

### 📊 Monitoring & Logging

#### Application Monitoring

```yaml
# Prometheus Configuration
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: always
  metrics:
    export:
      prometheus:
        enabled: true
```

#### Logging Configuration

```xml
<!-- logback-spring.xml -->
<configuration>
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>logs/food-delivery.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>logs/food-delivery.%d{yyyy-MM-dd}.log</fileNamePattern>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} - %msg%n</pattern>
        </encoder>
    </appender>

    <root level="INFO">
        <appender-ref ref="FILE"/>
    </root>
</configuration>
```

### 🔧 Scaling Strategies

#### Horizontal Scaling

- **Load Balancing**: Use Nginx or AWS ALB
- **Database Replication**: Read replicas for scaling reads
- **Caching**: Redis for session and data caching
- **CDN**: CloudFront for static assets

#### Vertical Scaling

- **CPU Optimization**: Profile and optimize CPU-intensive operations
- **Memory Management**: Configure appropriate heap sizes
- **Database Tuning**: Optimize queries and indexes

## 🔒 Security Best Practices

### 🛡️ Security Configuration

```java
// Security Headers Configuration
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .headers(headers -> headers
            .frameOptions().deny()
            .contentTypeOptions().and()
            .httpStrictTransportSecurity(hstsConfig -> hstsConfig
                .maxAgeInSeconds(31536000)
                .includeSubdomains(true)
            )
        )
        // ... other security configurations
}
```

### 🔐 Security Checklist

- [ ] **Input Validation**: Validate all user inputs
- [ ] **SQL Injection Prevention**: Use parameterized queries
- [ ] **XSS Protection**: Implement Content Security Policy
- [ ] **CSRF Protection**: Enable CSRF tokens
- [ ] **Secure Headers**: Implement security headers
- [ ] **Rate Limiting**: Implement API rate limiting
- [ ] **HTTPS**: Enforce HTTPS in production
- [ ] **Password Policy**: Strong password requirements
- [ ] **Session Management**: Secure session handling
- [ ] **Error Handling**: Don't expose sensitive information

## 🤝 Contributing

### 📋 Contribution Guidelines

1. **Fork the Repository**

   ```bash
   git clone https://github.com/your-username/spring-boot-final-project.git
   ```

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation

4. **Commit Your Changes**

   ```bash
   git commit -m 'Add amazing feature: description of changes'
   ```

5. **Push to the Branch**

   ```bash
   git push origin feature/amazing-feature
   ```

6. **Create a Pull Request**
   - Provide a clear description
   - Include screenshots if applicable
   - Link any relevant issues

### 📝 Code Style Guidelines

#### Java Code Style

```java
// Use meaningful variable names
private List<OrderItem> orderItems;

// Follow naming conventions
public class CustomerService {
    private final CustomerRepository customerRepository;

    // Use proper documentation
    /**
     * Creates a new customer with the provided details
     * @param customer the customer to create
     * @return the created customer
     */
    public Customer createCustomer(Customer customer) {
        // Implementation
    }
}
```

#### JavaScript/React Code Style

```javascript
// Use functional components and hooks
const CustomerProfile = ({ customerId }) => {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetchCustomer(customerId).then(setCustomer);
  }, [customerId]);

  return <div className="customer-profile">{/* JSX content */}</div>;
};
```

### 🧪 Testing Requirements

- **Unit Tests**: Minimum 80% code coverage
- **Integration Tests**: Test API endpoints
- **E2E Tests**: Test critical user flows

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Food Delivery Platform

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🙏 Acknowledgments

- **Spring Boot Team** - For the amazing framework and excellent documentation
- **PostgreSQL Community** - For the robust and reliable database
- **React Team** - For the powerful frontend library
- **Tailwind CSS** - For the utility-first CSS framework
- **Open Source Community** - For all the amazing libraries and tools

## 📞 Contact & Support

### 📧 Get in Touch

- **Project Maintainer**: [Your Name](mailto:your-email@example.com)
- **GitHub Issues**: [Create an Issue](https://github.com/your-username/spring-boot-final-project/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/spring-boot-final-project/discussions)

### � Bug Reports

For bug reports, please include:

- Description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Screenshots if applicable

### 💡 Feature Requests

We welcome feature requests! Please:

- Check existing issues first
- Provide clear description
- Explain the use case
- Consider implementation complexity

---

<div align="center">

**⭐ If this project helped you, please give it a star!**

**🚀 Happy Coding! 🍕**

</div>
