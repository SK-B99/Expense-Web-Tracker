"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";

type DateRange = {
  startDate: string;
  endDate: string;
};

type DashboardCardsProps = {
  dateRange: DateRange;
  refreshKey?: number;
};

type DashboardData = {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function DashboardCards({ dateRange, refreshKey }: DashboardCardsProps) {
  const [data, setData] = useState<DashboardData | null>(null);
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
          setData(result);
        }
      } catch (err) {
        // keep previous data on failure rather than blanking the cards
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
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <div className="rounded-xl bg-blue-600 p-5 shadow-sm">
        <p className="text-sm font-medium text-blue-100">Available balance</p>
        <p className="mt-2 text-2xl font-bold tracking-tight text-white">
          {loading ? "..." : formatCurrency(data?.balance ?? 0)}
        </p>
        <p className="mt-2 text-xs text-blue-100">Across all accounts</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">Income this month</p>
        <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
          {loading ? "..." : formatCurrency(data?.totalIncome ?? 0)}
        </p>
        <p className="mt-2 text-xs text-emerald-600">Compared with last month</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">Expenses this month</p>
        <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
          {loading ? "..." : formatCurrency(data?.totalExpenses ?? 0)}
        </p>
        <p className="mt-2 text-xs text-red-600">Compared with last month</p>
      </div>
    </div>
  );
}