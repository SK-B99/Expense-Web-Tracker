export default function DashboardCards() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <div className="rounded-xl bg-blue-600 p-5 shadow-sm">
  <p className="text-sm font-medium text-blue-100">Available balance</p>
  <p className="mt-2 text-2xl font-bold tracking-tight text-white">$12,450.00</p>
  <p className="mt-2 text-xs text-blue-100">Across all accounts</p>
</div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">Income this month</p>
        <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900">$4,250.00</p>
        <p className="mt-2 text-xs text-emerald-600">Compared with last month</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">Expenses this month</p>
        <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900">$2,840.00</p>
        <p className="mt-2 text-xs text-red-600">Compared with last month</p>
      </div>
    </div>
  );
}