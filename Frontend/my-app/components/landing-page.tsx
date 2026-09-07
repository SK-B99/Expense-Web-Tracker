import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  PieChart,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

export default function Landing() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-background">
            <Wallet size={19} />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            SpendWise
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Sign in
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 text-sm font-medium text-muted-foreground">
            PERSONAL FINANCE, SIMPLIFIED
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Know where your money
            <span className="block text-muted-foreground">
              is actually going.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Track your income and expenses, understand your spending habits,
            and get a clear picture of your finances in one place.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start tracking for free
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              Sign in to your account
            </Link>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Simple. Private. Built to help you stay on top of your money.
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/5">
            {/* Fake browser top */}
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />

              <div className="ml-3 h-6 flex-1 rounded-md bg-muted" />
            </div>

            <div className="grid min-h-[480px] md:grid-cols-[190px_1fr]">
              {/* Sidebar */}
              <aside className="hidden border-r border-border p-4 md:block">
                <div className="mb-8 text-sm font-semibold">SpendWise</div>

                <div className="space-y-1 text-sm">
                  <div className="rounded-md bg-muted px-3 py-2 font-medium">
                    Overview
                  </div>
                  <div className="px-3 py-2 text-muted-foreground">
                    Transactions
                  </div>
                  <div className="px-3 py-2 text-muted-foreground">
                    Income
                  </div>
                  <div className="px-3 py-2 text-muted-foreground">
                    Expenses
                  </div>
                  <div className="px-3 py-2 text-muted-foreground">
                    Reports
                  </div>
                </div>
              </aside>

              {/* Dashboard */}
              <div className="p-5 sm:p-8">
                <div className="mb-8 flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Financial overview
                    </p>
                    <h2 className="mt-1 text-xl font-semibold">
                      Good morning, Samuel
                    </h2>
                  </div>

                  <button className="rounded-md border border-border px-3 py-2 text-xs font-medium">
                    September 2026
                  </button>
                </div>

                {/* Stat Cards */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <StatCard
                    title="Total balance"
                    value="GH₵ 12,450"
                    icon={<Wallet size={17} />}
                    trend="+8.2%"
                  />

                  <StatCard
                    title="Income"
                    value="GH₵ 8,200"
                    icon={<TrendingUp size={17} />}
                    trend="+12.5%"
                  />

                  <StatCard
                    title="Expenses"
                    value="GH₵ 3,750"
                    icon={<TrendingDown size={17} />}
                    trend="-4.1%"
                  />
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
                  {/* Chart */}
                  <div className="rounded-lg border border-border p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Cash flow</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Income vs expenses
                        </p>
                      </div>

                      <TrendingUp size={18} className="text-muted-foreground" />
                    </div>

                    <div className="mt-8 flex h-40 items-end justify-between gap-3">
                      {[45, 70, 55, 85, 60, 90, 75, 100].map(
                        (height, index) => (
                          <div
                            key={index}
                            className="flex flex-1 flex-col justify-end gap-1"
                          >
                            <div
                              className="rounded-sm bg-foreground"
                              style={{ height: `${height}%` }}
                            />
                          </div>
                        )
                      )}
                    </div>

                    <div className="mt-3 flex justify-between text-[10px] text-muted-foreground">
                      <span>Week 1</span>
                      <span>Week 2</span>
                      <span>Week 3</span>
                      <span>Week 4</span>
                    </div>
                  </div>

                  {/* Spending */}
                  <div className="rounded-lg border border-border p-5">
                    <div className="flex items-center gap-2">
                      <PieChart size={18} />
                      <h3 className="font-medium">Top spending</h3>
                    </div>

                    <div className="mt-6 space-y-5">
                      <SpendingItem
                        name="Food & Dining"
                        amount="GH₵ 1,200"
                        percentage="65%"
                      />
                      <SpendingItem
                        name="Transportation"
                        amount="GH₵ 850"
                        percentage="45%"
                      />
                      <SpendingItem
                        name="Shopping"
                        amount="GH₵ 620"
                        percentage="32%"
                      />
                    </div>
                  </div>
                </div>

                {/* Recent transactions */}
                <div className="mt-6 rounded-lg border border-border">
                  <div className="flex items-center justify-between border-b border-border px-5 py-4">
                    <h3 className="font-medium">Recent transactions</h3>
                    <span className="text-xs text-muted-foreground">
                      View all
                    </span>
                  </div>

                  <div className="divide-y divide-border">
                    <Transaction
                      name="Monthly Salary"
                      category="Income"
                      amount="+ GH₵ 5,000"
                      positive
                    />
                    <Transaction
                      name="Melcom Shopping"
                      category="Shopping"
                      amount="- GH₵ 420"
                    />
                    <Transaction
                      name="Uber"
                      category="Transportation"
                      amount="- GH₵ 85"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 sm:grid-cols-3 lg:px-8">
          <Feature
            icon={<DollarSign size={20} />}
            title="Track every cedi"
            description="Keep a clear record of your income and daily expenses."
          />

          <Feature
            icon={<CreditCard size={20} />}
            title="Understand spending"
            description="See exactly where your money goes each month."
          />

          <Feature
            icon={<ArrowUpRight size={20} />}
            title="See the bigger picture"
            description="Get simple financial summaries that help you plan ahead."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-sm text-muted-foreground lg:px-8">
          <span>© {new Date().getFullYear()} SpendWise</span>
          <span>Personal finance made simple.</span>
        </div>
      </footer>
    </main>
  );
}

function StatCard({
  title,
  value,
  icon,
  trend,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}) {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="text-xs">{title}</span>
        {icon}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <span className="text-lg font-semibold">{value}</span>
        <span className="text-xs text-muted-foreground">{trend}</span>
      </div>
    </div>
  );
}

function SpendingItem({
  name,
  amount,
  percentage,
}: {
  name: string;
  amount: string;
  percentage: string;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-xs">
        <span>{name}</span>
        <span className="text-muted-foreground">{amount}</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-foreground"
          style={{ width: percentage }}
        />
      </div>
    </div>
  );
}

function Transaction({
  name,
  category,
  amount,
  positive = false,
}: {
  name: string;
  category: string;
  amount: string;
  positive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
          <DollarSign size={14} />
        </div>

        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{category}</p>
        </div>
      </div>

      <span
        className={`text-sm font-medium ${
          positive ? "" : "text-muted-foreground"
        }`}
      >
        {amount}
      </span>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border">
        {icon}
      </div>

      <h3 className="font-medium">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}