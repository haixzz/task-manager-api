# Task Manager API

A RESTful Task Manager API built with Node.js, Express, MongoDB, and JWT authentication.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- express-validator
- Postman

## Features

- User registration
- User login
- Password hashing
- JWT authentication
- Create tasks
- View all tasks
- View a single task
- Update tasks
- Delete tasks
- User-specific tasks

## API Endpoints

### Authentication

#### Register
POST `/api/auth/register`

Example request:

```json
{
  "name": "Cherry",
  "email": "cherrymaeroamar2005@gmail.com",
  "password": "123456"
}