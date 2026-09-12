"use client";

import { useState } from "react";
import { Menu, Plus } from "lucide-react";
import TransactionForm from "./transaction-form";
import { useAuth } from "@/hooks/use-auth";

type HeaderProps = {
  onMenuClick?: () => void;
  onTransactionAdded?: () => void;
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function Header({ onMenuClick, onTransactionAdded }: HeaderProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user } = useAuth();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <>
      <header className="border-b border-gray-200 bg-white">
        <div className="flex min-h-[72px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          
          <div className="flex min-w-0 items-center gap-3">
            
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Open navigation"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 lg:hidden"
            >
              <Menu size={21} />
            </button>

            
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-500 sm:text-sm">
                {formattedDate}
              </p>

              <h1 className="mt-1 truncate text-lg font-bold tracking-tight text-gray-900 sm:text-2xl">
                {getGreeting()}, {firstName}
              </h1>
            </div>
          </div>

          
          <button
            type="button"
            onClick={() => setIsFormOpen(true)}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:px-4"
          >
            <Plus
              size={18}
              strokeWidth={2}
              aria-hidden="true"
            />

            <span className="hidden sm:inline">
              Add transaction
            </span>

            <span className="sm:hidden">
              Add
            </span>
          </button>
        </div>
      </header>

      
      {isFormOpen && (
        <TransactionForm
          onClose={() => setIsFormOpen(false)}
          onSuccess={onTransactionAdded}
        />
      )}
    </>
  );
}