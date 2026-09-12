"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { useRouter } from "next/navigation";

type DateRange = {
  startDate: string;
  endDate: string;
};

type RecentTransactionsProps = {
  dateRange: DateRange;
  refreshKey?: number;
};

type Transaction = {
  id: number;
  type: "INCOME" | "EXPENSE";
  amount: number;
  category: string;
  description: string;
  date: string;
};

type DashboardData = {
  recentTransactions: Transaction[];
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export default function RecentTransactions({ dateRange, refreshKey }: RecentTransactionsProps) {
  const router = useRouter();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchDashboard() {
      setLoading(true);
      try {
        const result = await api.get<DashboardData>(
          `/dashboard?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`,
        );
        if (!cancelled) {
          setTransactions(result.recentTransactions ?? []);
        }
      } catch (err) {
        
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchDashboard();

    return () => {
      cancelled = true;
    };
  }, [dateRange, refreshKey]);

  return (
    <div className="min-h-80 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-gray-900">Recent transactions</h3>
          <p className="mt-1 text-sm text-gray-500">Your latest activity.</p>
        </div>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="flex min-h-52 items-center justify-center rounded-lg bg-gray-50 text-sm text-gray-400">
            Loading...
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex min-h-52 items-center justify-center rounded-lg bg-gray-50 text-sm text-gray-400">
            No transactions yet
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {transactions.map((tx) => (
              <li key={tx.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900">{tx.description}</p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {tx.category} · {formatDate(tx.date)}
                  </p>
                </div>
                <p
                  className={[
                    "shrink-0 text-sm font-semibold",
                    tx.type === "INCOME" ? "text-emerald-600" : "text-red-600",
                  ].join(" ")}
                >
                  {tx.type === "INCOME" ? "+" : "-"}
                  {formatCurrency(tx.amount)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}