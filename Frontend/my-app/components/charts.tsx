"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { api } from "@/lib/api-client";

type DateRange = {
  startDate: string;
  endDate: string;
};

type ChartsProps = {
  dateRange: DateRange;
  refreshKey?: number;
};

type DailyPoint = {
  date: string;
  income: number;
  expenses: number;
};

function formatDateLabel(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export default function Charts({ dateRange, refreshKey }: ChartsProps) {
  const [data, setData] = useState<DailyPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchSpendingOverTime() {
      setLoading(true);
      try {
        const result = await api.get<DailyPoint[]>(
          `/dashboard/spending-over-time?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`,
        );
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        // keep previous data on failure
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSpendingOverTime();

    return () => {
      cancelled = true;
    };
  }, [dateRange, refreshKey]);

  return (
    <div className="min-h-80 rounded-xl border border-gray-200 bg-white p-5 shadow-sm xl:col-span-2">
      <div>
        <h3 className="font-semibold text-gray-900">Spending overview</h3>
        <p className="mt-1 text-sm text-gray-500">Track your income and expenses over time.</p>
      </div>
      <div className="mt-6 min-h-52">
        {loading ? (
          <div className="flex min-h-52 items-center justify-center rounded-lg bg-gray-50 text-sm text-gray-400">
            Loading...
          </div>
        ) : data.length === 0 ? (
          <div className="flex min-h-52 items-center justify-center rounded-lg bg-gray-50 text-sm text-gray-400">
            No transactions in this period
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={208}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDateLabel}
                tick={{ fontSize: 12 }}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                labelFormatter={formatDateLabel}
                formatter={(value: number) => `$${value.toFixed(2)}`}
              />
              <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}