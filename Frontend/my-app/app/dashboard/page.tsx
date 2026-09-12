"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, ChevronDown } from "lucide-react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import DashboardCards from "@/components/cards";
import Charts from "@/components/charts";
import RecentTransactions from "@/components/recent";
import { useAuth } from "@/hooks/use-auth";

const monthOptions = [
  { label: "This month", value: "this-month" },
  { label: "Last month", value: "last-month" },
];

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0].value);
  const [activeView, setActiveView] = useState("overview");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTransactionAdded = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  if (authLoading || !user) {
    return null;
  }

  return (
    <div className="min-h-dvh bg-gray-50">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((prev) => !prev)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        activeView={activeView}
        onViewChange={setActiveView}
      />

      <main
        className={[
          "min-h-dvh transition-all duration-300 ease-in-out",
          collapsed ? "lg:pl-20" : "lg:pl-72",
        ].join(" ")}
      >
        <Header
          onMenuClick={() => setMobileOpen(true)}
          onTransactionAdded={handleTransactionAdded}
        />

        <section className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                {activeView === "overview" && "Your Overview"}
                {activeView === "transactions" && "Transactions"}
                {activeView === "reports" && "Reports"}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {activeView === "overview" &&
                  "Here's an overview of your finances."}
                {activeView === "transactions" &&
                  "All your transactions in one place."}
                {activeView === "reports" &&
                  "Insights and trends from your spending."}
              </p>
            </div>

            <div className="relative shrink-0">
              <Calendar
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                aria-label="Filter by month"
                className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-9 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {monthOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          {activeView === "overview" && (
            <>
              <DashboardCards month={selectedMonth} refreshKey={refreshKey} />

              <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
                <Charts month={selectedMonth} refreshKey={refreshKey} />
                <RecentTransactions month={selectedMonth} refreshKey={refreshKey} />
              </div>
            </>
          )}

          {activeView === "transactions" && (
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-400">
                Transactions view goes here.
              </p>
            </div>
          )}

          {activeView === "reports" && (
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-400">
                Reports view goes here.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}