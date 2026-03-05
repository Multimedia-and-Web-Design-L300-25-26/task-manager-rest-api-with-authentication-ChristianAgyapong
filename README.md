[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/vq8_GOgi)

# Task Manager REST API with Authentication

A RESTful API built with Node.js, Express, and MongoDB that implements user authentication via JWT and protected task management routes.

---

## Setup Instructions

Install all project dependencies:

```bash
npm install
```

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then update the `.env` file with your configuration:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

> Do not commit the `.env` file to version control.

---

## Running the Application

Start the server in development mode:

```bash
npm run dev
```

Start the server in production mode:

```bash
npm start
```

---

## Running Tests

```bash
npm test
```

All tests use an in-memory MongoDB instance — no external database is required for testing.

---

## Project Structure

```
├── src/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   └── app.js
├── tests/
│   ├── auth.test.js
│   ├── tasks.test.js
│   └── setup.js
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

---

## Environment Variables

| Variable     | Description                        |
|--------------|------------------------------------|
| `PORT`       | Port the server runs on            |
| `MONGO_URI`  | MongoDB connection string          |
| `JWT_SECRET` | Secret key used to sign JWT tokens |

---

## API Reference

### Auth Endpoints

| Method | Endpoint             | Description         | Auth Required |
|--------|----------------------|---------------------|---------------|
| POST   | `/api/auth/register` | Register a new user | No            |
| POST   | `/api/auth/login`    | Login and get token | No            |

### Task Endpoints

| Method | Endpoint         | Description                | Auth Required |
|--------|------------------|----------------------------|---------------|
| POST   | `/api/tasks`     | Create a new task          | Yes           |
| GET    | `/api/tasks`     | Get all tasks for the user | Yes           |
| GET    | `/api/tasks/:id` | Get a task by ID           | Yes           |
| PUT    | `/api/tasks/:id` | Update a task by ID        | Yes           |
| DELETE | `/api/tasks/:id` | Delete a task by ID        | Yes           |

### Authentication

All protected routes require the following header:

```
Authorization: Bearer <token>
```

---

## Technical Details

- ES Modules (`import`/`export`) throughout
- Passwords hashed with `bcryptjs` before storage
- JWT tokens expire after 7 days
- Tasks are scoped to the authenticated user — users can only view, update, or delete their own tasks
