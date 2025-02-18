# CRUD Operations API with Authentication
 ![Image](https://github.com/user-attachments/assets/cd9f19ec-3c1c-4d3a-822e-2d64d4eba2db)


A **MERN application** that provides user authentication and CRUD operations on products using MongoDB.

## Features

- **User Authentication** (Signup, Login, Logout) with session management.
- **Session Management** using MongoDB to persist sessions.
- **Product Management** (Create, Read, Update, Delete) for users.
- **Search functionality** for products based on name, category, or company.

## Technologies Used

- **Node.js**: JavaScript runtime environment for building the application.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user and product data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Bcrypt.js**: Library for hashing passwords to ensure secure user authentication.
- **Cookie Parser**: Middleware for handling cookies.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.
- **Express-Session**: Session management to persist user login state.
- **Connect-Mongo**: MongoDB session store to persist session data in MongoDB.

## Key Features Covered

1. **Session Management**: Uses `express-session` and `connect-mongo` to store sessions in MongoDB and ensure user authentication is persistent.
2. **Bcrypt for Password Hashing**: Securely hashes passwords to protect users' credentials.
3. **CRUD Operations**: Allows users to add, update, view, and delete products.
4. **CORS**: Ensures the frontend hosted on Vercel can communicate with the backend server while keeping sessions and cookies intact.
5. **Error Handling**: Provides clear error messages for debugging.
6. **Responsive Design**: Suitable for mobile, tablet, and desktop views.

## Installation

### 1. Clone the Repository

To get started, clone the repository using the following command:

```bash
git clone https://github.com/Rakeshkumarsahugithub/CRUD-Operations.git

