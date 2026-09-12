import Link from "next/link";
import { Fraunces, Inter } from "next/font/google";
import LedgerWidget from "./ledger";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function Landing() {
  return (
    <main className={`${inter.className} min-h-screen overflow-x-hidden text-[#0A0A0A]`}>
      
      <nav className="border-b border-[#E1DFD8]">
        <div className="mx-auto flex min-h-[72px] max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-7">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
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
              className={`${fraunces.className} text-[18px] font-semibold sm:text-[19px]`}
            >
              SpendWise
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-3 sm:gap-7">
            <Link
              href="/login"
              className="hidden text-sm text-[#64666E] transition-colors hover:text-[#0A0A0A] sm:block"
            >
              Sign in
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-[#0A0A0A] px-3.5 py-2.5 text-[13px] font-semibold text-[#F5F4F0] transition-opacity hover:opacity-90 sm:px-4.5 sm:text-sm"
            >
              Start for free
            </Link>
          </div>
        </div>
      </nav>

    
      <section className="mx-auto max-w-5xl px-5 pb-14 pt-12 sm:px-7 sm:pb-16 sm:pt-16 lg:pt-19">
        <div className="grid gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-start md:gap-10 lg:gap-14">
          
          <div className="min-w-0">
            <h1
              className={`${fraunces.className} max-w-[11ch] text-[36px] leading-[1.06] tracking-[-0.025em] sm:text-[44px] lg:text-[54px]`}
            >
              Where did the money actually go?
            </h1>

            <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.7] text-[#64666E] sm:mt-5.5 sm:text-[17px]">
              SpendWise makes it simple to track expenses, manage income, and
              see your financial progress at a glance.
            </p>

         
            <div className="mt-7 flex flex-col gap-2.5 xs:flex-row sm:flex-row sm:gap-3">
              <Link
                href="/signup"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[#0A0A0A] px-5 text-[15px] font-semibold text-[#F5F4F0] transition-opacity hover:opacity-90"
              >
                Start for free
              </Link>

              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-[#E1DFD8] px-5 text-[15px] font-semibold transition-colors hover:border-[#0A0A0A]"
              >
                Sign In
              </Link>
            </div>

         
            <div className="mt-9 flex max-w-[430px] items-start gap-2.5 text-[12.5px] leading-5 text-[#64666E] sm:mt-11.5 sm:text-[13px]">
              <svg
                width="34"
                height="14"
                viewBox="0 0 34 14"
                fill="none"
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M1 9C4 3 6 3 8 8C10 13 12 3 15 3C18 3 19 11 22 11C25 11 26 2 29 2C31 2 32 6 33 6"
                  stroke="#64666E"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>

              <span>
                trusted by people who want to manage money with less hassle
              </span>
            </div>
          </div>

        
          <div className="flex min-w-0 justify-center md:justify-end">
            <LedgerWidget />
          </div>
        </div>
      </section>

    
      <footer className="px-5 py-8 sm:px-7 sm:py-9">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center text-[12.5px] text-[#64666E] sm:flex-row sm:justify-between sm:text-left sm:text-[13px]">
          <span>
            Built by Samuel as a personal project. © 2026 SpendWise.
          </span>

          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="transition-colors hover:text-[#0A0A0A]"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-[#0A0A0A]"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}