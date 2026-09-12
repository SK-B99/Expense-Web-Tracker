"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { api } from "@/lib/api-client";

type TransactionFormProps = {
  onClose: () => void;
  onSuccess?: () => void;
};

export default function TransactionForm({
  onClose,
  onSuccess,
}: TransactionFormProps) {
  const dialogRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = new FormData(event.currentTarget);
    const type = (form.get("type") as string).toUpperCase(); // "expense" -> "EXPENSE"
    const amount = parseFloat(form.get("amount") as string);
    const description = form.get("description") as string;
    const category = form.get("category") as string;
    const dateInput = form.get("date") as string; // "2026-09-12"

    try {
      setSubmitting(true);
      await api.post("/transactions", {
        type,
        amount,
        category,
        description,
        date: new Date(dateInput).toISOString(),
      });
      onSuccess?.();
      onClose();
    } catch (err) {
      setError("Could not save the transaction. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-gray-950/40 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="transaction-form-title"
    >
     
      <button
        type="button"
        aria-label="Close transaction form"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <form
        ref={dialogRef}
        onSubmit={handleSubmit}
        className="relative flex max-h-[90dvh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-w-md sm:rounded-2xl"
      >
    
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <h2
              id="transaction-form-title"
              className="text-lg font-semibold tracking-tight text-gray-900 sm:text-xl"
            >
              Add transaction
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Record your income or expense
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Close transaction form"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>

       
        <div className="overflow-y-auto px-5 py-5 sm:px-6">
          <div className="space-y-5">
            
            <fieldset>
              <legend className="mb-2 text-sm font-medium text-gray-700">
                Type
              </legend>

              <div className="grid grid-cols-2 gap-3">
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 transition-colors hover:bg-gray-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                  <input
                    type="radio"
                    name="type"
                    value="expense"
                    defaultChecked
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    Expense
                  </span>
                </label>

                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 transition-colors hover:bg-gray-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                  <input
                    type="radio"
                    name="type"
                    value="income"
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    Income
                  </span>
                </label>
              </div>
            </fieldset>

         
            <div>
              <label
                htmlFor="amount"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Amount
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm font-medium text-gray-400">
                  $
                </span>

                <input
                  id="amount"
                  name="amount"
                  type="number"
                  inputMode="decimal"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-8 pr-3 text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

          
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Description
              </label>

              <input
                id="description"
                name="description"
                type="text"
                placeholder="What did you spend on?"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

           
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                defaultValue=""
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="" disabled>
                  Select a category
                </option>

                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="shopping">Shopping</option>
                <option value="bills">Bills</option>
              </select>
            </div>

            
            <div>
              <label
                htmlFor="date"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Date
              </label>

              <input
                id="date"
                name="date"
                type="date"
                defaultValue={new Date()
                  .toISOString()
                  .split("T")[0]}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>
        </div>

       
        <div className="border-t border-gray-100 bg-white px-5 py-4 sm:px-6">
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:w-auto"
            >
              {submitting ? "Saving..." : "Save transaction"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}