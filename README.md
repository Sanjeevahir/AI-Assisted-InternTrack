# AI-Assisted InternTrack - Week 2

## Mini Software Module: Task Management REST API

A backend REST API for managing internship/project tasks.

### Features
- Create, list, view, update and delete tasks
- Status: PLANNED, IN_PROGRESS, REVIEW, COMPLETED
- Priority: LOW, MEDIUM, HIGH
- PostgreSQL persistence
- Zod input validation
- Error handling
- Helmet, CORS and Morgan middleware
- Health check
- Automated tests

### Stack
Node.js, Express.js, PostgreSQL, Zod, Jest, Supertest

### Setup
1. Install Node.js 20+ and PostgreSQL.
2. Create a PostgreSQL database named `interntrack`.
3. Create `.env` from `.env.example`.
4. Put your PostgreSQL password in `DATABASE_URL`.
5. Run:
   `npm install`
6. Initialize:
   `npm run db:init`
7. Start:
   `npm start`

API: `http://localhost:5000`

### Endpoints
- GET `/api/health`
- POST `/api/tasks`
- GET `/api/tasks`
- GET `/api/tasks/:id`
- PUT `/api/tasks/:id`
- DELETE `/api/tasks/:id`

### Example POST JSON
{
  "title": "Complete Week 2 API",
  "description": "Implement the task management module",
  "status": "IN_PROGRESS",
  "priority": "HIGH",
  "assignee": "Sanjeev",
  "due_date": "2026-10-05"
}

### Test
`npm test`

### Development Decisions
The module uses a modular Express structure with separate routes, controllers, middleware and database access. Parameterized SQL queries are used for safer database operations, and Zod validates task input before controller execution.
