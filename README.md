# Booking Platform REST API

## Project Overview

The **Booking Platform REST API** is a backend application developed using **NestJS, TypeScript, PostgreSQL, and Prisma ORM** for managing services and customer bookings.

This project was developed as part of the **EN2H Software Engineer Intern Technical Assessment**.

The API provides secure authentication, service management, and booking management functionalities following REST API best practices.

## Features

* User registration and login
* JWT-based authentication
* Password hashing using bcrypt
* Service CRUD operations
* Booking creation and management
* Booking status updates and cancellation
* PostgreSQL database integration
* Prisma ORM for database operations
* Request validation using class-validator

---

## Technologies Used

| Technology      | Purpose                        |
| --------------- | ------------------------------ |
| NestJS          | Backend framework              |
| TypeScript      | Programming language           |
| PostgreSQL      | Relational database            |
| Prisma ORM      | Database access and migrations |
| JWT             | Authentication                 |
| Passport.js     | Authentication strategy        |
| Bcrypt          | Password encryption            |
| Class Validator | Request validation             |

---

# Installation

## 1. Clone the Repository

```bash
git clone https://github.com/JanudiJithmini/booking-platform-api.git
```

## 2. Navigate to Project Directory

```bash
cd booking-platform-api
```

## 3. Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root directory.

Add the following variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/booking_platform?schema=public"

JWT_SECRET=your_secret_key
```

### Environment Variable Description

| Variable     | Description                              |
| ------------ | ---------------------------------------- |
| DATABASE_URL | PostgreSQL database connection URL       |
| JWT_SECRET   | Secret key used for JWT token generation |

A sample environment file is provided:

```
.env.example
```

---

# Database Setup

This project uses Prisma ORM with PostgreSQL.

## Run Database Migration

```bash
npx prisma migrate dev
```

## Generate Prisma Client

```bash
npx prisma generate
```

Migration files are included in:

```
prisma/migrations
```

---

# Running the Application

## Development Mode

```bash
npm run start:dev
```

The API will run on:

```
http://localhost:3000
```

## Production Mode

Build the application:

```bash
npm run build
```

Run production server:

```bash
npm run start:prod
```

---

# Project Structure

```
src
│
├── auth
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   └── dto
│
├── users
│
├── services
│
├── bookings
│
├── prisma
│
├── app.module.ts
└── main.ts
```

---

# Authentication

The API uses JWT authentication.

After successful login, an access token is returned.

Example:

```
Authorization: Bearer <JWT_TOKEN>
```

Protected endpoints require this token in the request header.

---

# API Documentation

## Authentication APIs

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| POST   | `/auth/register` | Register a new user         |
| POST   | `/auth/login`    | Login and receive JWT token |

---

## Service APIs

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| POST   | `/services`     | Create a service  |
| GET    | `/services`     | Get all services  |
| GET    | `/services/:id` | Get service by ID |
| PUT    | `/services/:id` | Update service    |
| DELETE | `/services/:id` | Delete service    |

---

## Booking APIs

| Method | Endpoint               | Description           |
| ------ | ---------------------- | --------------------- |
| POST   | `/bookings`            | Create a booking      |
| GET    | `/bookings`            | Get all bookings      |
| GET    | `/bookings/:id`        | Get booking by ID     |
| PATCH  | `/bookings/:id/status` | Update booking status |
| PATCH  | `/bookings/:id/cancel` | Cancel booking        |

---

# Validation and Error Handling

The API uses `class-validator` for request validation.

Examples:

* Required field validation
* Email format validation
* Password validation
* Invalid request handling

The API returns meaningful HTTP status codes:

| Status Code | Meaning            |
| ----------- | ------------------ |
| 200         | Successful request |
| 201         | Resource created   |
| 400         | Validation error   |
| 401         | Unauthorized       |
| 404         | Resource not found |
| 409         | Conflict           |

---

# Business Rules

* Users must register before creating bookings.
* Email addresses must be unique.
* Booking must belong to an existing service.
* Booking date cannot be in the past.
* Cancelled bookings cannot be completed.
* Only authenticated users can manage services.

---

# Database Design

The application contains three main entities:

## User

Stores user authentication information.

Fields:

* id
* name
* email
* password

## Service

Stores available services.

Fields:

* id
* title
* description
* price

## Booking

Stores customer bookings.

Fields:

* id
* userId
* serviceId
* bookingDate
* status

Relationships:

```
User 1 ---- * Booking * ---- 1 Service
```

---

# API Testing

The APIs can be tested using:

* Postman Collection
* Swagger Documentation (if configured)

---

# Assumptions Made

* PostgreSQL is installed locally.
* Users have access to the database before running migrations.
* JWT secrets are managed using environment variables.
* Authentication is required for protected operations.

---

# Future Improvements

* Swagger API documentation
* Refresh token authentication
* Role-based authorization
* Pagination
* Advanced booking search and filtering
* Unit and integration testing
* Docker containerization
* Cloud deployment

---

# Author

**Janudi Akmeemana**

Software Engineering Intern Candidate

EN2H Technical Assessment
