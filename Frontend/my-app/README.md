# Expense Web Tracker

A web application to track income, expenses, and financial summaries — built with Next.js, TypeScript, and Tailwind CSS on the frontend.

## Description

Expense Web Tracker (branded **Spendify** in the UI) helps users monitor their financial activity through a dashboard that surfaces account balances, income, expenses, and recent transactions at a glance.

## Task Workflow

| Step | Task | Status |
|------|------|--------|
| 1 | Design dashboard screens | ✅ In progress — core layout built |
| 2 | Create expense management APIs | ⬜ Not started |
| 3 | Store financial records in a database | ⬜ Not started |
| 4 | Display reports and summaries | 🟡 UI scaffolded (static data) |
| 5 | Implement authentication | 🟡 UI scaffolded (login/signup pages, no backend wiring yet) |

## Project Structure

```
Expense Web Tracker/
├── Backend/
└── Frontend/
    └── my-app/
        ├── app/
        │   ├── dashboard/
        │   │   └── page.tsx        # Main dashboard route
        │   ├── login/
        │   │   └── page.tsx
        │   ├── signup/
        │   │   └── page.tsx
        │   ├── privacy/
        │   │   └── page.tsx
        │   ├── terms/
        │   │   └── page.tsx
        │   ├── layout.tsx
        │   ├── page.tsx             # Landing page
        │   └── globals.css
        │
        ├── components/
        │   ├── sidebar.tsx          # Collapsible/responsive nav sidebar
        │   ├── header.tsx           # Top bar, greeting, add-transaction trigger
        │   ├── cards.tsx            # Dashboard summary cards
        │   ├── charts.tsx           # Spending overview chart
        │   ├── recent.tsx           # Recent transactions list
        │   ├── transaction-form.tsx # Add transaction modal/form
        │   ├── landing-page.tsx
        │   ├── login-form.tsx
        │   ├── signup-form.tsx
        │   └── ui/                  # Shared UI primitives (button, card, input, etc.)
        │
        ├── hooks/
        ├── lib/
        ├── public/
        └── package.json
```

## Frontend Progress

### Dashboard (`app/dashboard/page.tsx`)
- Responsive shell with a collapsible sidebar (desktop) and slide-over drawer (mobile).
- Sidebar navigation (`Overview`, `Transactions`, `Reports`) driven by local view state rather than routing, since these represent views within the dashboard rather than separate pages.
- Header with a live-formatted date, personalized greeting, and an "Add transaction" action that opens `TransactionForm`.
- Summary cards for balance, income, and expenses.
- Placeholder sections for the spending chart and recent transactions, ready to be connected to real data.
- Month filter (This month / Last month) scaffolded in the UI; not yet wired to actual data filtering.

### Auth Pages
- `login/page.tsx` and `signup/page.tsx` exist with accompanying form components (`login-form.tsx`, `signup-form.tsx`).
- These are currently UI-only — no backend authentication is wired up yet (Step 5 pending).

### Other Pages
- Landing page (`app/page.tsx` + `landing-page.tsx`).
- Static `privacy` and `terms` pages.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** lucide-react
- **UI primitives:** Custom components (`components/ui`)

## Remaining Work

- [ ] Build expense management APIs (Step 2)
- [ ] Set up database schema and persistence for financial records (Step 3)
- [ ] Connect dashboard cards, charts, and recent transactions to real data
- [ ] Wire the month filter to actual filtered queries
- [ ] Implement authentication (Step 5) and protect the dashboard route
- [ ] Connect `login-form.tsx` / `signup-form.tsx` to backend auth endpoints
- [ ] Build out dedicated Transactions and Reports views (currently placeholders)

## Getting Started (Frontend)

```bash
cd Frontend/my-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Getting Started (Backend)

_Backend setup instructions to be added once the API and database layers are implemented._