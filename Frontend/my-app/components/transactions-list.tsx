
"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";

type DateRange = {
  startDate: string;
  endDate: string;
};

type Transaction = {
  id: number;
  type: "INCOME" | "EXPENSE";
  amount: number;
  category: string | null;
  description: string | null;
  date: string;
};

type TransactionsListProps = {
  dateRange: DateRange;
  refreshKey: number;
};

export default function TransactionsList({ dateRange, refreshKey }: TransactionsListProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const result = await api.get<Transaction[]>(
          `/transactions?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`,
        );
        if (!cancelled) setTransactions(result);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load transactions",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [dateRange, refreshKey]);

  if (loading) {
    return (
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-400">Loading transactions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-400">No transactions in this period.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left text-gray-500">
            <th className="px-5 py-3 font-medium">Date</th>
            <th className="px-5 py-3 font-medium">Description</th>
            <th className="px-5 py-3 font-medium">Category</th>
            <th className="px-5 py-3 text-right font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="border-b border-gray-50 last:border-0">
              <td className="px-5 py-3 text-gray-500">
                {new Date(t.date).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td className="px-5 py-3 text-gray-700">
                {t.description || "—"}
              </td>
              <td className="px-5 py-3 text-gray-500">
                {t.category || "Uncategorized"}
              </td>
              <td
                className={[
                  "px-5 py-3 text-right font-medium",
                  t.type === "INCOME" ? "text-green-600" : "text-red-600",
                ].join(" ")}
              >
                {t.type === "INCOME" ? "+" : "-"}$
                {t.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}