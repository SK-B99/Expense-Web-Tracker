"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { api } from "@/lib/api-client";

type DateRange = {
  startDate: string;
  endDate: string;
};

type ReportsProps = {
  dateRange: DateRange;
};

type CategoryBreakdown = {
  category: string;
  amount: number;
  percentage: number;
};

type MonthlySummary = {
  month: string;
  income: number;
  expenses: number;
  net: number;
};

const CATEGORY_COLORS = [
  "#3b82f6",
  "#ef4444",
  "#f59e0b",
  "#22c55e",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
];

export default function Reports({ dateRange }: ReportsProps) {
  const [breakdown, setBreakdown] = useState<CategoryBreakdown[]>([]);
  const [summary, setSummary] = useState<MonthlySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const [breakdownRes, summaryRes] = await Promise.all([
          api.get<CategoryBreakdown[]>(
            `/reports/category-breakdown?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`,
          ),
          api.get<MonthlySummary[]>("/reports/monthly-summary?months=6"),
        ]);

        if (!cancelled) {
          setBreakdown(breakdownRes);
          setSummary(summaryRes);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load reports",
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
  }, [dateRange]);

  if (loading) {
    return (
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-400">Loading reports...</p>
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

  const totalSpent = breakdown.reduce((sum, row) => sum + row.amount, 0);

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
      
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="font-semibold text-gray-900">Spending by category</h3>
        <p className="mt-1 text-sm text-gray-500">For the selected period.</p>

        {breakdown.length === 0 ? (
          <div className="mt-6 flex min-h-40 items-center justify-center rounded-lg bg-gray-50 text-sm text-gray-400">
            No expenses recorded in this period.
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {breakdown.map((row, i) => (
              <div key={row.category}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">
                    {row.category}
                  </span>
                  <span className="text-gray-500">
                    ${row.amount.toFixed(2)} · {row.percentage}%
                  </span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${row.percentage}%`,
                      backgroundColor:
                        CATEGORY_COLORS[i % CATEGORY_COLORS.length],
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="mt-4 border-t border-gray-100 pt-3 text-sm text-gray-500">
              Total spent: <span className="font-semibold text-gray-900">${totalSpent.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="font-semibold text-gray-900">Income vs. expenses</h3>
        <p className="mt-1 text-sm text-gray-500">Last 6 months.</p>

        {summary.length === 0 ? (
          <div className="mt-6 flex min-h-40 items-center justify-center rounded-lg bg-gray-50 text-sm text-gray-400">
            No data for this period.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={240} className="mt-4">
            <BarChart data={summary}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}