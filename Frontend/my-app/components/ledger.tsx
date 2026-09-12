"use client";

import { useState } from "react";

type Category = "housing" | "food" | "transport" | "subs" | "other";

type LedgerItem = {
  id: string;
  desc: string;
  amount: number;
  category: Category;
};

const CATEGORY_WORDS: Record<Exclude<Category, "other">, string[]> = {
  housing: [
    "rent",
    "mortgage",
    "housing",
    "utilities",
    "electric",
    "water bill",
  ],
  food: [
    "coffee",
    "lunch",
    "dinner",
    "grocery",
    "groceries",
    "food",
    "snack",
    "breakfast",
    "restaurant",
  ],
  transport: [
    "bus",
    "uber",
    "lyft",
    "gas",
    "parking",
    "train",
    "transit",
    "fuel",
  ],
  subs: [
    "netflix",
    "spotify",
    "subscription",
    "app",
    "membership",
    "gym",
  ],
};

const DOT_COLOR: Record<Category, string> = {
  housing: "#9C7FE0",
  food: "#E0A62F",
  transport: "#2E9BE0",
  subs: "#D96C9C",
  other: "#8B8D93",
};

function guessCategory(text: string): Category {
  const t = text.toLowerCase();

  for (const [category, words] of Object.entries(CATEGORY_WORDS)) {
    if (words.some((w) => t.includes(w))) {
      return category as Category;
    }
  }

  return "other";
}

const INITIAL_ITEMS: LedgerItem[] = [
  {
    id: "1",
    desc: "Rent, this week's share",
    amount: 612,
    category: "housing",
  },
  {
    id: "2",
    desc: "Coffee",
    amount: 4.5,
    category: "food",
  },
  {
    id: "3",
    desc: "Bus pass",
    amount: 65,
    category: "transport",
  },
];

function formatAmount(n: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function LedgerWidget() {
  const [items, setItems] = useState<LedgerItem[]>(INITIAL_ITEMS);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");

  const total = items.reduce((sum, item) => sum + item.amount, 0);

  function handleAdd() {
    const trimmedDesc = desc.trim();
    const parsedAmount = parseFloat(amount);

    if (
      !trimmedDesc ||
      Number.isNaN(parsedAmount) ||
      parsedAmount <= 0
    ) {
      return;
    }

    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        desc: trimmedDesc,
        amount: parsedAmount,
        category: guessCategory(trimmedDesc),
      },
    ]);

    setDesc("");
    setAmount("");
  }

  return (
    <div className="relative w-full max-w-[430px] rotate-[0.6deg] rounded-2xl border border-[#E1DFD8] bg-white p-4 pb-5 sm:p-6 sm:pb-5">
      <p className="mb-3.5 text-[13px] text-[#64666E] sm:text-[13.5px]">
        Add something you bought today
      </p>

     
      <div className="min-w-0">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex min-w-0 items-center gap-2.5 border-b border-dashed border-[#E1DFD8] py-2.5 last:border-none"
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{
                backgroundColor: DOT_COLOR[item.category],
              }}
            />

            <span className="min-w-0 flex-1 truncate text-[13px] sm:text-sm">
              {item.desc}
            </span>

            <span className="shrink-0 text-[13px] font-semibold tabular-nums sm:text-sm">
              ${formatAmount(item.amount)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3.5 flex items-baseline justify-between gap-4 border-t border-[#E1DFD8] pt-3.5">
        <span className="text-[12px] text-[#64666E] sm:text-[13px]">
          So far this week
        </span>

        <span className="shrink-0 text-[20px] font-semibold tabular-nums sm:text-[22px]">
          ${formatAmount(total)}
        </span>
      </div>

      
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              document.getElementById("amt-input")?.focus();
            }
          }}
          placeholder="What did you buy?"
          maxLength={28}
          className="h-10 min-w-0 w-full rounded-md border border-[#E1DFD8] bg-[#F5F4F0] px-2.5 text-sm outline-none transition-colors placeholder:text-[#8B8D93] focus:border-[#2E56E8] focus:bg-white sm:flex-[1.4]"
        />

        <div className="flex w-full gap-2 sm:w-auto sm:flex-[1.7]">
          <input
            id="amt-input"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
            }}
            placeholder="0.00"
            step="0.01"
            min="0"
            className="h-10 min-w-0 flex-1 rounded-md border border-[#E1DFD8] bg-[#F5F4F0] px-2.5 text-sm outline-none transition-colors placeholder:text-[#8B8D93] focus:border-[#2E56E8] focus:bg-white sm:flex-none sm:w-[100px]"
          />

          <button
            type="button"
            onClick={handleAdd}
            className="h-10 shrink-0 rounded-md bg-[#2E56E8] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#2447CB]"
          >
            Add it
          </button>
        </div>
      </div>

      <p className="mt-2.5 text-[11px] leading-4 text-[#64666E] sm:text-xs">
        Login to have a real experience
      </p>
    </div>
  );
}