export default function RecentTransactions(){
    return(
        <div className="min-h-80 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Recent transactions</h3>
                  <p className="mt-1 text-sm text-gray-500">Your latest activity.</p>
                </div>
                <button type="button" className="shrink-0 text-sm font-medium text-blue-600 hover:text-blue-700">
                  View all
                </button>
              </div>
              <div className="mt-6 flex min-h-52 items-center justify-center rounded-lg bg-gray-50 text-sm text-gray-400">
                Transactions go here
              </div>
            </div>
    )
}