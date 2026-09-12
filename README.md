# SpendWise

A full-stack personal finance web application for tracking income, expenses, and financial activity through a simple dashboard.

SpendWise allows users to record financial transactions, monitor their balance, review spending patterns, and generate financial summaries and reports.

## Overview

SpendWise is built as a full-stack application with a separate frontend and backend.

The backend provides the REST API, authentication, transaction management, dashboard calculations, and reporting functionality.

The frontend provides the user interface for authentication, transaction management, financial summaries, charts, and reports.

### Core Features

* User registration and login
* JWT-based authentication
* Access and refresh token authentication
* Secure refresh token rotation
* Logout and refresh-token invalidation
* Income tracking
* Expense tracking
* Transaction management
* Financial dashboard
* Spending summaries
* Category breakdowns
* Monthly financial summaries
* Spending-over-time data
* Protected API endpoints
* PostgreSQL database
* Docker support
* API validation
* CQRS-based backend architecture
* Responsive frontend

---

## Application Structure

```text
Expense Web Tracker/
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── auth/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── prisma/
│   │   ├── reports/
│   │   └── transactions/
│   │
│   ├── Dockerfile
│   ├── package.json
│   ├── prisma.config.ts
│   ├── tsconfig.json
│   └── ...
│
├── Frontend/
│   └── my-app/
│       ├── app/
│       │   ├── dashboard/
│       │   ├── login/
│       │   ├── privacy/
│       │   ├── signup/
│       │   └── terms/
│       │
│       ├── components/
│       ├── hooks/
│       ├── lib/
│       ├── public/
│       └── ...
│
├── docker-compose.yml
└── gitignore
```

---

# Technology Stack

## Backend

* **NestJS** — backend framework
* **TypeScript** — programming language
* **Prisma ORM** — database access
* **PostgreSQL** — relational database
* **CQRS** — command/query separation
* **JWT** — authentication
* **Passport** — authentication strategy
* **bcrypt** — password and refresh-token hashing
* **class-validator** — request validation
* **Docker** — containerization

## Frontend

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui components**
* **Lucide icons**
* Client-side authentication and API integration

---

# Architecture

SpendWise uses a separated frontend/backend architecture.

```text
┌─────────────────────────────┐
│          Frontend           │
│        Next.js / React      │
└──────────────┬──────────────┘
               │
               │ HTTP / REST API
               ▼
┌─────────────────────────────┐
│           Backend           │
│           NestJS            │
├─────────────────────────────┤
│ Auth                        │
│ Transactions                │
│ Dashboard                   │
│ Reports                     │
└──────────────┬──────────────┘
               │
               │ Prisma
               ▼
┌─────────────────────────────┐
│        PostgreSQL           │
└─────────────────────────────┘
```

The frontend is responsible for presentation and user interaction.

The backend handles business logic, authentication, authorization, validation, financial calculations, and database operations.

---

# Backend Architecture

The backend follows a modular NestJS architecture with CQRS.

```text
backend/
└── src/
    ├── auth/
    ├── dashboard/
    ├── reports/
    ├── transactions/
    ├── prisma/
    ├── common/
    ├── app.module.ts
    └── main.ts
```

## CQRS

The application separates operations that change data from operations that read data.

### Commands

Commands represent operations that modify application state.

Examples:

```text
CreateTransactionCommand
UpdateTransactionCommand
DeleteTransactionCommand
RegisterCommand
LoginCommand
RefreshCommand
LogoutCommand
```

### Queries

Queries are responsible for retrieving data.

Examples:

```text
GetTransactionQuery
GetTransactionsQuery
GetDashboardQuery
GetSpendingOverTimeQuery
GetCategoryBreakdownQuery
GetMonthlySummaryQuery
```

This separation keeps transaction changes and data retrieval independent and makes the backend easier to maintain as the application grows.

---

# Backend Modules

## Authentication

Location:

```text
backend/src/auth/
```

Authentication includes:

* User registration
* User login
* Access tokens
* Refresh tokens
* Refresh-token rotation
* Logout
* JWT validation
* Protected routes

Structure:

```text
auth/
├── commands/
│   ├── login/
│   ├── logout/
│   ├── refresh/
│   └── register/
│
├── decorators/
│   ├── current-user.decorator.ts
│   └── public.decorator.ts
│
├── guards/
│   └── jwt-auth.guard.ts
│
├── strategies/
│   └── jwt.strategy.ts
│
├── auth.controller.ts
└── auth.module.ts
```

### Authentication Flow

```text
User
 │
 │ Login
 ▼
Auth Controller
 │
 ▼
Login Command
 │
 ▼
Login Handler
 │
 ├── Validate credentials
 │
 ├── Generate access token
 │
 ├── Generate refresh token
 │
 └── Store refresh-token hash
 │
 ▼
Authenticated User
```

The access token is short-lived and is used to access protected API endpoints.

The refresh token is long-lived and is used to obtain a new access token when the access token expires.

Refresh tokens are stored as hashes in the database rather than storing the raw token.

---

# Transactions

Location:

```text
backend/src/transactions/
```

Transactions are divided into commands and queries.

```text
transactions/
├── commands/
│   ├── create-transaction/
│   ├── update-transaction/
│   └── delete-transaction/
│
├── queries/
│   ├── get-transaction/
│   └── get-transactions/
│
├── transactions.controller.ts
└── transactions.module.ts
```

Supported transaction types:

```text
INCOME
EXPENSE
```

A transaction contains information such as:

* Amount
* Type
* Category
* Description
* Date
* User

Every transaction belongs to a specific user.

---

# Dashboard

Location:

```text
backend/src/dashboard/
```

The dashboard provides aggregated financial information for the authenticated user.

It can provide information such as:

* Current balance
* Total income
* Total expenses
* Financial summaries
* Spending over time

Dashboard data is calculated from the user's transactions.

---

# Reports

Location:

```text
backend/src/reports/
```

Reports provide more detailed financial analysis.

Current report queries include:

```text
GetCategoryBreakdownQuery
GetMonthlySummaryQuery
```

The reports module can be used to provide information such as:

* Spending by category
* Monthly income
* Monthly expenses
* Monthly balance
* Financial trends

---

# Database

SpendWise uses PostgreSQL with Prisma ORM.

The Prisma schema is located at:

```text
backend/prisma/schema.prisma
```

The main database entities are:

```text
User
Transaction
RefreshToken
```

## User

Stores account information.

```text
id
name
email
passwordHash
createdAt
updatedAt
```

## Transaction

Stores financial transactions.

```text
id
userId
type
amount
category
description
date
createdAt
updatedAt
```

## RefreshToken

Stores hashed refresh tokens used for session management.

```text
id
tokenHash
userId
expiresAt
createdAt
```

---

# Database Relationships

```text
User
 │
 ├─────────────── Transaction
 │
 └─────────────── RefreshToken
```

A user can have multiple transactions.

A user can also have multiple refresh tokens, allowing multiple authenticated sessions.

Deleting a user also removes their related transactions and refresh tokens.

---

# API

The backend exposes REST API endpoints.

The API runs on:

```text
http://localhost:4000
```

## Authentication Endpoints

### Register

```http
POST /auth/register
```

Creates a new user account.

Example request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

```http
POST /auth/login
```

Authenticates the user and returns an access token.

The refresh token is handled through the refresh-token authentication mechanism.

### Refresh

```http
POST /auth/refresh
```

Uses the refresh token to generate a new access token and rotates the refresh token.

### Logout

```http
POST /auth/logout
```

Invalidates the refresh token and clears the authentication session.

---

# Transaction Endpoints

```http
POST   /transactions
GET    /transactions
GET    /transactions/:id
PUT    /transactions/:id
DELETE /transactions/:id
```

These endpoints are protected and require an authenticated user.

A user can only access their own financial transactions.

---

# Dashboard Endpoint

```http
GET /dashboard
```

Returns financial information for the authenticated user.

Example response structure:

```json
{
  "balance": 2500,
  "totalIncome": 5000,
  "totalExpenses": 2500
}
```

The exact response can evolve as the dashboard develops.

---

# Reports Endpoints

The reports module provides financial analysis through query endpoints.

Examples include:

```http
GET /reports/category-breakdown
GET /reports/monthly-summary
```

The reports are generated from the authenticated user's transactions.

---

# Authentication and Security

SpendWise uses JWT authentication.

The authentication system consists of two token types.

## Access Token

The access token:

* Is short-lived
* Is used to access protected endpoints
* Contains the authenticated user's ID
* Is validated using the JWT strategy

Example request:

```http
Authorization: Bearer <access-token>
```

## Refresh Token

The refresh token:

* Is long-lived
* Is used to obtain new access tokens
* Is stored securely by the client
* Is hashed before being stored in the database
* Is rotated when used
* Can be invalidated during logout

### Refresh Token Rotation

When a refresh token is used:

```text
Old Refresh Token
        │
        ▼
Validate Token
        │
        ▼
Find Stored Hash
        │
        ▼
Delete Old Token
        │
        ▼
Create New Refresh Token
        │
        ▼
Store New Hash
        │
        ▼
Return New Access Token
```

This prevents an old refresh token from remaining valid after it has been used.

---

# Password Security

Passwords are never stored as plain text.

During registration:

```text
Password
   │
   ▼
bcrypt
   │
   ▼
Password Hash
   │
   ▼
Database
```

During login, the supplied password is compared against the stored hash.

The same hashing approach is used for refresh tokens before they are stored.

---

# Frontend

The frontend is located at:

```text
Frontend/my-app/
```

The frontend is built with Next.js and React.

## Main Pages

```text
app/
├── dashboard/
│   └── page.tsx
│
├── login/
│   └── page.tsx
│
├── signup/
│   └── page.tsx
│
├── privacy/
│   └── page.tsx
│
├── terms/
│   └── page.tsx
│
└── page.tsx
```

## Components

The frontend contains reusable components for:

* Dashboard cards
* Charts
* Header
* Sidebar
* Ledger
* Recent transactions
* Reports
* Transaction forms
* Transaction lists
* Login form
* Signup form
* SpendWise branding

Structure:

```text
components/
├── cards.tsx
├── charts.tsx
├── header.tsx
├── landing-page.tsx
├── ledger.tsx
├── login-form.tsx
├── recent.tsx
├── reports.tsx
├── sidebar.tsx
├── signup-form.tsx
├── spendwise-logo.tsx
├── transaction-form.tsx
└── transactions-list.tsx
```

---

# Frontend Authentication

Authentication-related logic is handled through:

```text
hooks/use-auth.ts
lib/auth-context.tsx
lib/api-client.ts
```

The API client communicates with the NestJS backend.

The authentication context manages the authenticated user's state throughout the application.

The frontend uses the access token when making requests to protected backend endpoints.

When the access token expires, the refresh endpoint can be used to obtain a new access token.

---

# Dashboard

The main dashboard provides a central view of the user's financial activity.

It is designed around common personal finance information such as:

* Current balance
* Income
* Expenses
* Recent transactions
* Spending trends
* Category breakdowns
* Financial reports

The dashboard consumes data from the backend rather than calculating authoritative financial records only on the client.

---

# Development Workflow

The project was developed in the following stages:

### Step 1 — Design dashboard screens

Create the initial application interface and financial dashboard.

### Step 2 — Create transaction APIs

Build the backend endpoints for creating, reading, updating, and deleting transactions.

### Step 3 — Store financial records

Connect the backend to PostgreSQL through Prisma.

### Step 4 — Display reports and summaries

Build dashboard calculations, category breakdowns, monthly summaries, and spending trends.

### Step 5 — Implement authentication

Add registration, login, JWT authentication, refresh tokens, token rotation, and logout.

---

# Local Development

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* PostgreSQL
* Git
* Docker and Docker Compose (optional)

---

# Clone the Repository

```bash
git clone <your-repository-url>
cd "Expense Web Tracker"
```

---

# Backend Setup

Move into the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
NODE_ENV=development
PORT=4000

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=0123

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/0123"

FRONTEND_URL="http://localhost:3000"

JWT_ACCESS_SECRET="your-access-secret"
JWT_REFRESH_SECRET="your-refresh-secret"

JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
```

If Observe monitoring is enabled, configure:

```env
OBSERVE_APP_KEY="your_app_key"
OBSERVE_APP_SECRET="your_app_secret"
OBSERVE_SERVICE_ID="expense_tracker"
```

Do not commit the `.env` file to Git.

---

# Prisma Setup

Generate the Prisma client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

If you are setting up the project for the first time and migrations already exist:

```bash
npx prisma migrate deploy
```

To inspect the database using Prisma Studio:

```bash
npx prisma studio
```

---

# Start the Backend

Development mode:

```bash
npm run start:dev
```

The backend will run on:

```text
http://localhost:4000
```

---

# Frontend Setup

Open another terminal:

```bash
cd Frontend/my-app
```

Install dependencies:

```bash
npm install
```

Create the required frontend environment variables.

For example:

```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:3000
```

---

# Running with Docker

The repository also includes:

```text
docker-compose.yml
```

Docker can be used to run the application's infrastructure and services in a consistent environment.

From the project root:

```bash
docker compose up -d --build
```

To stop the containers:

```bash
docker compose down
```

To view running containers:

```bash
docker compose ps
```

To view logs:

```bash
docker compose logs
```

---

# Testing

The backend includes testing configuration using Vitest.

Run the test suite with:

```bash
npm test
```

For end-to-end tests:

```bash
npm run test:e2e
```

For test coverage:

```bash
npm run test:cov
```

Available test configuration files include:

```text
vitest.config.ts
vitest.config.e2e.ts
```

---

# Building for Production

## Backend

```bash
cd backend
npm run build
```

The compiled application is generated in:

```text
backend/dist/
```

## Frontend

```bash
cd Frontend/my-app
npm run build
```

Start the production frontend:

```bash
npm start
```

---

# Environment Variables

## Backend

| Variable                 | Description                        |
| ------------------------ | ---------------------------------- |
| `NODE_ENV`               | Application environment            |
| `PORT`                   | Backend server port                |
| `DATABASE_URL`           | PostgreSQL connection string       |
| `POSTGRES_USER`          | PostgreSQL username                |
| `POSTGRES_PASSWORD`      | PostgreSQL password                |
| `POSTGRES_DB`            | PostgreSQL database name           |
| `FRONTEND_URL`           | Frontend URL                       |
| `JWT_ACCESS_SECRET`      | Secret used to sign access tokens  |
| `JWT_REFRESH_SECRET`     | Secret used to sign refresh tokens |
| `JWT_ACCESS_EXPIRES_IN`  | Access-token lifetime              |
| `JWT_REFRESH_EXPIRES_IN` | Refresh-token lifetime             |
| `OBSERVE_APP_KEY`        | Observe application key            |
| `OBSERVE_APP_SECRET`     | Observe application secret         |
| `OBSERVE_SERVICE_ID`     | Observe service identifier         |

## Frontend

| Variable              | Description     |
| --------------------- | --------------- |
| `NEXT_PUBLIC_API_URL` | Backend API URL |

Never commit production secrets to the repository.

---

# Project Commands

## Backend

```bash
npm install
npm run start:dev
npm run build
npm run start
npm test
npm run test:e2e
npm run test:cov
npx prisma generate
npx prisma migrate dev
npx prisma studio
```

## Frontend

```bash
npm install
npm run dev
npm run build
npm start
```

---

# Project Development Principles

The backend follows several design principles.

## Separation of Responsibilities

Controllers handle HTTP requests.

Commands and queries represent application operations.

Handlers contain the corresponding business logic.

Prisma handles database access.

Authentication is separated into its own module.

This keeps individual parts of the application focused on specific responsibilities.

## Validation

Incoming request data is validated before reaching the business logic.

This helps prevent invalid transaction and authentication data from entering the application.

## User Data Isolation

Transactions are associated with a specific user.

Protected endpoints use the authenticated user's identity when retrieving and modifying financial data.

A user should not be able to access another user's transactions.

---

# Security Considerations

The application implements several security measures:

* Password hashing with bcrypt
* Hashed refresh tokens
* Short-lived access tokens
* Long-lived refresh tokens
* Refresh-token rotation
* Refresh-token invalidation on logout
* Protected transaction endpoints
* JWT validation
* Request validation
* User-specific transaction queries
* Environment variables for secrets
* HTTP-only refresh-token cookies

For production deployment, additional measures should be configured, including:

* HTTPS
* Strong randomly generated JWT secrets
* Production database credentials
* Secure cookie configuration
* Appropriate CORS configuration
* Rate limiting
* Logging and monitoring
* Database backups
* Proper secret management

---

# Data Flow

A typical transaction request follows this flow:

```text
Frontend
   │
   │ POST /transactions
   ▼
TransactionsController
   │
   ▼
CreateTransactionCommand
   │
   ▼
CreateTransactionHandler
   │
   ▼
PrismaService
   │
   ▼
PostgreSQL
   │
   ▼
Transaction Created
   │
   ▼
API Response
   │
   ▼
Frontend
```

A dashboard request follows a similar read-oriented flow:

```text
Frontend
   │
   │ GET /dashboard
   ▼
DashboardController
   │
   ▼
GetDashboardQuery
   │
   ▼
GetDashboardHandler
   │
   ▼
PrismaService
   │
   ▼
PostgreSQL
   │
   ▼
Financial Aggregations
   │
   ▼
API Response
   │
   ▼
Dashboard UI
```

---



The project currently includes the core foundation for a personal finance application:

* [x] Project structure
* [x] NestJS backend
* [x] Next.js frontend
* [x] PostgreSQL database
* [x] Prisma ORM
* [x] Database migrations
* [x] User registration
* [x] User login
* [x] JWT access tokens
* [x] Refresh tokens
* [x] Refresh-token rotation
* [x] Logout
* [x] Protected routes
* [x] Transaction creation
* [x] Transaction retrieval
* [x] Transaction updates
* [x] Transaction deletion
* [x] Dashboard queries
* [x] Spending-over-time query
* [x] Category breakdown reporting
* [x] Monthly summary reporting
* [x] Frontend dashboard
* [x] Login page
* [x] Signup page
* [x] Privacy page
* [x] Terms page
* [x] Docker configuration

---

# Future Improvements

Possible future improvements include:

* Budget management
* Recurring transactions
* Savings goals
* Multiple currencies
* Transaction search and filtering
* Date-range filtering
* Export transactions to CSV
* Export financial reports to PDF
* Email notifications
* Password reset
* Email verification
* Two-factor authentication
* Rate limiting
* Advanced analytics
* Improved mobile experience
* Automated database backups
* Production monitoring
* CI/CD pipelines

---

# Contributing

Contributions are welcome.

To contribute:

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Run the relevant tests.

```bash
npm test
```

5. Commit your changes.

```bash
git commit -m "Add your feature"
```

6. Push the branch.

```bash
git push origin feature/your-feature
```

7. Open a pull request.

---

# License

This project is currently available for personal and educational use.



---

# Author

**Samuel Kwarteng Baffoe**

Software Engineer | Full-Stack Developer

* GitHub: [SK-B99](https://github.com/SK-B99)
* LinkedIn: [Samuel Baffoe](https://linkedin.com/in/samuel-baffoe-744427208)

---

## SpendWise

A practical full-stack finance application built to manage income, expenses, transactions, financial summaries, and personal spending insights.
