import { LoginForm } from "@/components/login-form"
import { Fraunces } from "next/font/google"

const fraunces = Fraunces({
  subsets: ["latin"],
})

export default function LoginPage() {
  return (
    <main
      className={`${fraunces.className} min-h-svh bg-[#fafaf8] text-[#183047]`}
    >
    
      <header className="border-b border-[#dededb]">
        <div className="mx-auto flex h-[76px] w-full max-w-6xl items-center px-6 md:px-8">
          
         
          <a
            href="/"
            className="flex items-center gap-2.5"
            aria-label="SpendWise home"
          >
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

            <span className="text-[19px] font-semibold text-[#0A0A0A]">
              SpendWise
            </span>
          </a>
        </div>
      </header>

   
      <section className="flex min-h-[calc(100svh-76px)] items-center justify-center px-6 py-16">
        <div className="w-full max-w-[420px]">

        
          <div className="mb-9 text-center">
            <h1 className="font-serif text-[42px] font-semibold leading-[1.05] tracking-[-0.035em] text-[#111] md:text-[48px]">
              Welcome back
            </h1>

            <p className="mt-4 text-[15px] leading-6 text-[#52657a]">
              Sign in to your SpendWise account
            </p>
          </div>

      
          <LoginForm />

        
          <p className="mt-8 text-center text-sm text-[#52657a]">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-[#111] underline underline-offset-4 transition-opacity hover:opacity-60"
            >
              Start for free
            </a>
          </p>
        </div>
      </section>

      <footer className="pb-8 text-center text-xs text-[#68788a]">
        <div className="flex items-center justify-center gap-4">
          <a
            href="/privacy"
            className="transition-colors hover:text-[#111]"
          >
            Privacy
          </a>

          <a
            href="/terms"
            className="transition-colors hover:text-[#111]"
          >
            Terms
          </a>
        </div>
      </footer>
    </main>
  )
}