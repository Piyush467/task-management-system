# 🚀 Task Management System

A full-stack **Task Management System** built as a Backend Intern Assignment using **Node.js, Express.js, TypeScript, React, MongoDB Atlas, JWT Authentication, and Swagger**.

The application allows users to manage their own tasks while providing an admin dashboard to monitor and manage all tasks.

---

# ✨ Features

## Authentication

- User Registration
- User Login
- Secure JWT Authentication
- HTTP-only Cookie Authentication
- User Logout
- Get Current User Profile (`/auth/me`)

---

## User Features

- Create Tasks
- View Personal Tasks
- Update Tasks
- Delete Tasks
- Change Task Status
- Search Tasks
- Filter Tasks by Status
- Responsive Dashboard
- Loading States
- Toast Notifications
- Delete Confirmation Modal

---

## Admin Features

- Secure Admin Login
- View All Users' Tasks
- Delete Any Task
- Dashboard Statistics
- Responsive Admin Dashboard

---

## Backend Features

- RESTful API
- MVC Architecture
- Service Layer Architecture
- Zod Request Validation
- JWT Authentication
- Role-Based Authorization
- Global Error Handling
- MongoDB Atlas Integration
- Swagger API Documentation

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Mongoose
- JWT
- Zod
- Swagger
- Cookie Parser
- Helmet
- Morgan

---

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hot Toast

---

# 📂 Project Structure

```
Task-Management-System
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── types
│   │   ├── utils
│   │   ├── validators
│   │   └── server.ts
│   │
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── layouts
│   │   ├── pages
│   │   ├── services
│   │   ├── types
│   │   └── App.tsx
│   │
│   ├── package.json
│   └── .env.example
│
├── docker-compose.yml
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/Piyush467/task-management-system

cd task-management-system
```

---

# Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file using `.env.example`.

Example:

```env
PORT=5001

MONGO_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d

COOKIE_EXPIRES_IN=7

NODE_ENV=development
```

Start the backend:

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd frontend

npm install
```

Create a `.env` file using `.env.example`.

Example:

```env
VITE_API_URL=http://localhost:5001/api/v1
```

Start the frontend:

```bash
npm run dev
```

---

# 🐳 Docker (Backend)

Build and run the backend using Docker:

```bash
docker compose up --build
```

The backend will be available at:

```
http://localhost:5001
```

---

# 📖 API Documentation

Swagger UI:

```
http://localhost:5001/api-docs
```

The documentation includes:

- Authentication APIs
- Task APIs
- Admin APIs
- Request Schemas
- Response Schemas
- Cookie Authentication

---

# 🔐 Authentication

Authentication is implemented using:

- JWT Tokens
- HTTP-only Cookies
- Protected Routes
- Role-Based Authorization

Roles supported:

- User
- Admin

---

# 📌 API Endpoints

## Authentication

- POST `/auth/register`
- POST `/auth/login`
- POST `/auth/logout`
- GET `/auth/me`

---

## Tasks

- POST `/tasks`
- GET `/tasks`
- GET `/tasks/:id`
- PATCH `/tasks/:id`
- DELETE `/tasks/:id`

---

## Admin

- GET `/admin/tasks`
- DELETE `/admin/tasks/:id`

---

# 🌐 Environment Variables

## Backend

```env
PORT=
MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=
COOKIE_EXPIRES_IN=
NODE_ENV=
```

---

## Frontend

```env
VITE_API_URL=
```

---

# 📈 Scalability

The project follows a layered architecture separating:

- Controllers
- Services
- Models
- Routes
- Middlewares
- Validation

This makes the project easy to maintain and extend.

Potential future improvements include:

- Redis Caching
- Pagination Enhancements
- Task Categories
- Due Dates & Reminders
- File Attachments
- Email Notifications
- Rate Limiting
- Unit & Integration Tests
- CI/CD Pipeline
- Dockerized Frontend
- Production Deployment

---

# 👨‍💻 Author

**Piyush**

- GitHub: https://github.com/Piyush467
- LinkedIn: https://www.linkedin.com/in/piyush-mehrotra-278119296/

---

# 📄 License

This project was developed as part of a Backend Intern Assignment for educational and evaluation purposes.