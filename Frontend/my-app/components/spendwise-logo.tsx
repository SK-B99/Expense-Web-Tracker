import { Fraunces, Inter } from "next/font/google";
export function SpendWiseLogo() {
  return (
    <span className="flex items-center gap-2.5">
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="1"
          y="1"
          width="24"
          height="24"
          rx="6"
          fill="#0A0A0A"
        />

        <path
          d="M8 8V17M11.5 8V17M15 8V17M18.5 8V17M7 16L19 9"
          stroke="#F5F4F0"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>

      <span
        className={`${fraunces.className} text-[19px] font-semibold text-[#0A0A0A]`}
      >
        SpendWise
      </span>
    </span>
  )
}