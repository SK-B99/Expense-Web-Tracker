# SpendWise Frontend

The frontend for **SpendWise**, a personal finance web application for tracking income, expenses, transactions, and financial summaries.

## Tech Stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Lucide React

## Features

* Landing page
* User registration
* User login
* Authentication state management
* Financial dashboard
* Income and expense tracking
* Transaction management
* Financial reports
* Spending charts
* Recent transactions
* Responsive interface
* Privacy and Terms pages

## Project Structure

```text
my-app/
├── app/
│   ├── dashboard/
│   ├── login/
│   ├── signup/
│   ├── privacy/
│   ├── terms/
│   └── page.tsx
│
├── components/
│   ├── cards.tsx
│   ├── charts.tsx
│   ├── header.tsx
│   ├── ledger.tsx
│   ├── reports.tsx
│   ├── sidebar.tsx
│   ├── transaction-form.tsx
│   └── transactions-list.tsx
│
├── hooks/
│   └── use-auth.ts
│
├── lib/
│   ├── api-client.ts
│   ├── auth-context.tsx
│   ├── date-range.ts
│   └── utils.ts
│
└── public/
```

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Backend

The frontend communicates with the SpendWise NestJS backend through REST APIs.

Make sure the backend is running before using authenticated features.

## Author

**Samuel Kwarteng Baffoe**

GitHub: https://github.com/SK-B99
