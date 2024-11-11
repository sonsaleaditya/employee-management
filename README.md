# Employee Management System

An admin panel for managing employee information, built with a MERN stack (MongoDB, Express, React, Node.js) and utilizing JWT for authentication. This panel allows admins to add, view, edit, and delete employee information, and includes features such as a search functionality.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Documentation](#api-documentation)
  - [Admin Signup](#1-admin-signup)
  - [Admin Login](#2-admin-login)
  - [Fetch Employees](#3-fetch-employees)
  - [Search Employees](#4-search-employees)
  - [Delete Employee](#5-delete-employee)
- [Error Codes](#error-codes)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Admin can sign up and log in with JWT-based authentication.
- **CRUD Operations**: Admin can create, read, update, and delete employee records.
- **Image Upload**: Profile image upload feature for employees.
- **Search**: Search for employees by name, email, or designation.

## Tech Stack

- **Frontend**: React, Axios, CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Docker, Kubernetes (Minikube)

## Project Structure

```
├── client
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   └── App.js
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── server.js
└── README.md
```

## Setup and Installation

### Prerequisites

- **Node.js**: >= 14.x
- **MongoDB**: Local or cloud MongoDB instance
- **Docker & Kubernetes** (optional): For deployment in a containerized environment

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/employee-management-system.git
   cd employee-management-system
   ```

2. **Backend Setup**:

   ```bash
   cd server
   npm install
   ```

3. **Frontend Setup**:

   ```bash
   cd client
   npm install
   ```

4. **Environment Variables**:

   Create a `.env` file in the `server` directory:

   ```env
   PORT=5000
   MONGO_URI=your_mongo_uri
   JWT_SECRET=your_jwt_secret
   ```

5. **Run the Project**:

   - Start the backend server:

     ```bash
     cd server
     npm start
     ```

   - Start the frontend:

     ```bash
     cd client
     npm start
     ```

6. **Navigate to the Application**:

   Open your browser and go to `http://localhost:3000` for the frontend, and `http://localhost:5000` for the backend API.

## Usage

### Running with Docker & Kubernetes

If you are using Docker and Kubernetes, use the `docker-compose.yml` or `kubernetes` folder configuration to deploy the project.

1. **Docker**:

   ```bash
   docker-compose up
   ```

2. **Kubernetes** (Minikube):

   ```bash
   kubectl apply -f kubernetes/
   ```

## API Documentation

### 1. Admin Signup

**Endpoint**: `/api/v1/admin/admin-sign-up`  
**Method**: `POST`  
**Request Body**:

```json
{
  "username": "admin@example.com",
  "password": "adminpassword"
}
```

**Response**:

```json
{
  "success": true,
  "msg": "Admin user created successfully"
}
```

### 2. Admin Login

**Endpoint**: `/api/v1/admin/admin-sign-in`  
**Method**: `POST`  
**Request Body**:

```json
{
  "username": "admin@example.com",
  "password": "adminpassword"
}
```

**Response**:

```json
{
  "success": true,
  "token": "jwt-token"
}
```

### 3. Fetch Employees

**Endpoint**: `/api/v1/admin/fetch-employee`  
**Method**: `GET`  
**Headers**:

```http
Authorization: Bearer YOUR_TOKEN
```

**Response**:

```json
{
  "success": true,
  "employees": [
    {
      "_id": "employeeId",
      "name": "John Doe",
      "email": "john@example.com",
      "mobile": "1234567890",
      "designation": "Developer",
      "image": "https://example.com/profile.jpg"
    }
  ]
}
```

### 4. Search Employees

**Endpoint**: `/api/v1/admin/search-employee?keyword={keyword}`  
**Method**: `GET`  
**Headers**:

```http
Authorization: Bearer YOUR_TOKEN
```

**Response**:

```json
{
  "success": true,
  "employees": [
    {
      "_id": "employeeId",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "mobile": "0987654321",
      "designation": "Manager",
      "image": "https://example.com/profile.jpg"
    }
  ]
}
```

### 5. Delete Employee

**Endpoint**: `/api/v1/admin/delete-employee/{employeeId}`  
**Method**: `DELETE`  
**Headers**:

```http
Authorization: Bearer YOUR_TOKEN
```

**Response**:

```json
{
  "success": true,
  "msg": "Employee deleted successfully"
}
```

## Error Codes

- **401 Unauthorized**: Invalid or expired token.
- **404 Not Found**: Employee not found.
- **500 Internal Server Error**: Unexpected server error.

## Contributing

1. Fork the repository.
2. Create a new branch with your feature or bug fix.
3. Commit your changes and push to the new branch.
4. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
