"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api-client"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const form = new FormData(e.currentTarget)

    const name = form.get("name") as string
    const email = form.get("email") as string
    const password = form.get("password") as string

    try {
      setLoading(true)

      await api.post("/auth/register", {
        name,
        email,
        password,
      })

      router.push("/login")
    } catch (err) {
      setError("Could not create account. Try a different email.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={cn("w-full", className)}
      {...props}
    >
      <form onSubmit={handleSubmit}>
        <FieldGroup className="gap-5">

         
          <Field className="gap-2">
            <FieldLabel
              htmlFor="name"
              className="text-sm font-medium text-[#183047]"
            >
              Name
            </FieldLabel>

            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              required
              className="h-12 rounded-lg border-[#d8d8d4] bg-white px-4 text-[15px] shadow-none placeholder:text-[#9aa5b1] focus-visible:border-[#183047] focus-visible:ring-1 focus-visible:ring-[#183047]"
            />
          </Field>

          
          <Field className="gap-2">
            <FieldLabel
              htmlFor="email"
              className="text-sm font-medium text-[#183047]"
            >
              Email address
            </FieldLabel>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="h-12 rounded-lg border-[#d8d8d4] bg-white px-4 text-[15px] shadow-none placeholder:text-[#9aa5b1] focus-visible:border-[#183047] focus-visible:ring-1 focus-visible:ring-[#183047]"
            />
          </Field>

          <Field className="gap-2">
            <FieldLabel
              htmlFor="password"
              className="text-sm font-medium text-[#183047]"
            >
              Password
            </FieldLabel>

            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              required
              className="h-12 rounded-lg border-[#d8d8d4] bg-white px-4 text-[15px] shadow-none placeholder:text-[#9aa5b1] focus-visible:border-[#183047] focus-visible:ring-1 focus-visible:ring-[#183047]"
            />

            <FieldDescription className="text-xs text-[#68788a]">
              Use at least 8 characters.
            </FieldDescription>
          </Field>

          
          {error && (
            <p className="text-center text-sm text-red-600">
              {error}
            </p>
          )}

        
          <Field className="pt-1">
            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-lg bg-[#111] text-[15px] font-medium text-white shadow-none transition-opacity hover:bg-[#111] hover:opacity-90"
            >
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </Field>

        </FieldGroup>
      </form>
    </div>
  )
}