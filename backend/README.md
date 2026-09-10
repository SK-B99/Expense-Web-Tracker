Expense Web Tracker

A full-stack web application for managing personal finances by tracking income, expenses, and financial summaries.

This project was developed as part of Task 3 (Medium) – Expense Tracker Web Application.

📌 Task Description

Develop a web application to track income, expenses, and financial summaries.

The application provides a dashboard for users to manage their financial records, view reports, and monitor their overall financial activity.

✨ Features
📊 Financial dashboard
💰 Income tracking
💸 Expense tracking
📈 Financial summaries and reports
🔐 User authentication
🗄️ Database-backed financial records
🔌 RESTful backend APIs
📱 Responsive frontend interface
🏗️ Project Structure

This project uses a monorepo architecture, with the frontend and backend maintained in a single Git repository.

Expense Web Tracker/
│
├── Frontend/
│   └── my-app/
│       ├── app/
│       ├── components/
│       ├── hooks/
│       ├── lib/
│       ├── public/
│       ├── package.json
│       └── ...
│
├── backend/
│   ├── src/
│   ├── test/
│   ├── package.json
│   └── ...
│
└── README.md

Frontend

The frontend is located in:

Frontend/my-app/


It is responsible for the user interface, dashboard, financial records, reports, and interaction with the backend API.

Backend

The backend is located in:

backend/


It provides the APIs and server-side functionality required to manage financial records, authentication, and database operations.

🛠️ Technology Stack
Frontend
Next.js
React
TypeScript
Tailwind CSS
ESLint
Backend
NestJS
TypeScript
REST API
Vitest
ESLint/Oxlint
Database

The backend is designed to persist financial records in a database.

Database configuration may be added or updated as backend development progresses.

🔄 Task Workflow
Step 1: Design Dashboard Screens

Create the application's main dashboard and supporting screens for:

Total income
Total expenses
Current balance
Recent transactions
Financial summaries
Reports
Step 2: Create Expense Management APIs

Develop backend APIs for managing financial records, including:

Creating income records
Creating expense records
Retrieving transactions
Updating transactions
Deleting transactions
Filtering financial records
Step 3: Store Financial Records in a Database

Persist application data in a database, including:

User information
Income records
Expense records
Transaction details
Relevant financial metadata
Step 4: Display Reports and Summaries

Provide users with useful financial insights such as:

Total income
Total expenses
Balance
Spending summaries
Income vs. expense comparisons
Transaction history
Step 5: Implement Authentication

Implement secure user authentication so that users can:

Register an account
Log in
Access protected resources
Manage their own financial records
Log out securely
🚀 Getting Started
Prerequisites

Make sure you have installed:

Node.js
npm
Git
Clone the Repository
git clone https://github.com/SK-B99/Expense-Web-Tracker.git
cd Expense-Web-Tracker

💻 Running the Frontend

Navigate to the frontend application:

cd Frontend/my-app


Install dependencies:

npm install


Start the development server:

npm run dev


The frontend will normally be available at:

http://localhost:3000

⚙️ Running the Backend

From the project root:

cd backend


Install dependencies:

npm install


Start the development server:

npm run start:dev


The backend API will normally run on:

http://localhost:3000


If the frontend and backend use the same port, configure one of them to use a different port.

🔐 Environment Variables

Environment-specific configuration should be stored in .env files and should not be committed to Git.

Example:

DATABASE_URL=your_database_connection_string
JWT_SECRET=your_secret_key
PORT=3001


Create an appropriate .env file inside the backend and configure the frontend environment variables as required.

🧪 Testing
Backend Unit Tests
cd backend
npm run test

Backend End-to-End Tests
npm run test:e2e

Test Coverage
npm run test:cov

📦 Production Build
Frontend
cd Frontend/my-app
npm run build

Backend
cd backend
npm run build

🌿 Git Workflow

The project follows a monorepo structure:

Expense Web Tracker/
├── Frontend/
└── backend/


Both applications are managed within the same Git repository.

For changes:

git status
git add .
git commit -m "Describe your changes"
git push origin master

🎯 Project Goals

The goal of this application is to provide a simple and effective way for users to understand and manage their personal finances.

The system combines:

A modern web interface
A structured backend API
Persistent financial data
Authentication
Reports and financial summaries
📄 License

This project is developed for educational and project purposes.