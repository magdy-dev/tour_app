# NM Travel Tour Booking Application

A full-stack web application for managing tour bookings, built with Spring Boot and React.

## Prerequisites

- Java 17 or higher
- Node.js 18 or higher
- MySQL 8.0 or higher
- Maven
- npm or yarn

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Update the database configuration in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/nmtravel?createDatabaseIfNotExist=true
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. Update the JWT secret in `src/main/resources/application.properties`:
   ```properties
   app.jwt.secret=your-secure-secret-key
   ```

4. Build and run the backend:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

The backend server will start on `http://localhost:8080/api`

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:8080/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The frontend application will start on `http://localhost:5173`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Tours
- GET `/api/tours` - Get all tours
- GET `/api/tours/{id}` - Get tour by ID
- GET `/api/tours/status/{status}` - Get tours by status
- GET `/api/tours/section/{section}` - Get tours by section
- POST `/api/tours` - Create a new tour (Admin only)
- PUT `/api/tours/{id}` - Update a tour (Admin only)
- DELETE `/api/tours/{id}` - Delete a tour (Admin only)

### Bookings
- GET `/api/bookings` - Get all bookings (Admin only)
- GET `/api/bookings/{id}` - Get booking by ID
- GET `/api/bookings/user/{userId}` - Get bookings by user
- GET `/api/bookings/tour/{tourId}` - Get bookings by tour (Admin only)
- GET `/api/bookings/status/{status}` - Get bookings by status (Admin only)
- POST `/api/bookings` - Create a new booking
- PUT `/api/bookings/{id}` - Update a booking
- DELETE `/api/bookings/{id}` - Delete a booking

## Security

The application uses JWT (JSON Web Tokens) for authentication. Include the JWT token in the Authorization header for protected endpoints:

```
Authorization: Bearer your-jwt-token
```

## Development

### Backend
- Spring Boot 3.2.3
- Spring Security
- Spring Data JPA
- MySQL
- JWT Authentication
- Maven

### Frontend
- React
- Vite
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Query
- React Router
- Axios

## License

This project is licensed under the MIT License. 