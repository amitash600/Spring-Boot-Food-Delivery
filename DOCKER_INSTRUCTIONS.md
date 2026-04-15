# Docker Deployment Instructions

## Prerequisites
- Docker installed on your system
- Maven build completed (JAR file in target/ directory)

## Build Docker Image

```bash
# Build the Docker image
docker build -t spring-boot-food-delivery .
```

## Run Docker Container

```bash
# Run the container (default port 8080)
docker run -p 8080:8080 spring-boot-food-delivery

# Run with custom port
docker run -p 8081:8080 spring-boot-food-delivery

# Run with environment variables
docker run -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=prod \
  -e DATABASE_URL=jdbc:postgresql://your-db-host:5432/your-db \
  -e DATABASE_USERNAME=your-username \
  -e DATABASE_PASSWORD=your-password \
  spring-boot-food-delivery
```

## Docker Compose (Optional)

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - DATABASE_URL=jdbc:postgresql://postgres:5432/food_delivery
      - DATABASE_USERNAME=postgres
      - DATABASE_PASSWORD=password
    depends_on:
      - postgres
    networks:
      - app-network

  postgres:
    image: postgres:13
    environment:
      - POSTGRES_DB=food_delivery
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    ports:
      - "5432:5432"
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

Run with Docker Compose:
```bash
docker-compose up -d
```

## Useful Docker Commands

```bash
# View running containers
docker ps

# View container logs
docker logs <container-id>

# Stop container
docker stop <container-id>

# Remove container
docker rm <container-id>

# Remove image
docker rmi spring-boot-food-delivery
```

## Notes
- The application will be accessible at http://localhost:8080
- Make sure your database connection details are properly configured
- The `.dockerignore` file excludes unnecessary files from the Docker build context
