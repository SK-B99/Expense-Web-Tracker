# SpendWise Backend

The backend API for **SpendWise**, a personal finance application for managing income, expenses, transactions, and financial reports.

## Tech Stack

* NestJS
* TypeScript
* PostgreSQL
* Prisma ORM
* CQRS
* JWT
* Passport
* bcrypt
* Docker

## Features

* User registration
* User login
* JWT authentication
* Access and refresh tokens
* Refresh-token rotation
* Logout
* Protected API endpoints
* Transaction management
* Financial dashboard
* Spending reports
* Category breakdowns
* Monthly summaries
* Request validation
* PostgreSQL database

## Project Structure

```text
src/
├── auth/
│   ├── commands/
│   │   ├── login/
│   │   ├── logout/
│   │   ├── refresh/
│   │   └── register/
│   ├── decorators/
│   ├── guards/
│   ├── strategies/
│   ├── auth.controller.ts
│   └── auth.module.ts
│
├── dashboard/
│   ├── queries/
│   ├── dashboard.controller.ts
│   └── dashboard.module.ts
│
├── reports/
│   └── queries/
│
├── transactions/
│   ├── commands/
│   ├── queries/
│   ├── transactions.controller.ts
│   └── transactions.module.ts
│
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
├── common/
├── app.module.ts
└── main.ts
```

## CQRS

The backend uses CQRS to separate commands from queries.

### Commands

Commands handle operations that change data:

```text
CreateTransaction
UpdateTransaction
DeleteTransaction
Register
Login
Refresh
Logout
```

### Queries

Queries handle data retrieval:

```text
GetTransaction
GetTransactions
GetDashboard
GetSpendingOverTime
GetCategoryBreakdown
GetMonthlySummary
```

## Database

SpendWise uses PostgreSQL with Prisma.

Main models:

```text
User
Transaction
RefreshToken
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Generate the Prisma client:

```bash
npx prisma generate
```

Open Prisma Studio:

```bash
npx prisma studio
```

## Environment Variables

Create a `.env` file:

```env
NODE_ENV=development
PORT=4000

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/0123"

FRONTEND_URL="http://localhost:3000"

JWT_ACCESS_SECRET="your-access-secret"
JWT_REFRESH_SECRET="your-refresh-secret"

JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
```

## Getting Started

Install dependencies:

```bash
npm install
```

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run start:dev
```

The API runs on:

```text
http://localhost:4000
```

## Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Docker

Build and start the project:

```bash
docker compose up -d --build
```

Stop the containers:

```bash
docker compose down
```

## API Areas

```text
/auth
/transactions
/dashboard
/reports
```

Protected endpoints require a valid JWT access token.

## Testing

Run tests:

```bash
npm test
```

Run end-to-end tests:

```bash
npm run test:e2e
```

## Author

**Samuel Kwarteng Baffoe**

GitHub: https://github.com/SK-B99
