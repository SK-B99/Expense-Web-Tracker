import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/lib/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SpendWise",
  description: "Track your personal finances with SpendWise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        jetbrainsMono.variable,
        fraunces.variable
      )}
    >
      <body
        className={cn(
          "min-h-full",
          "overflow-x-hidden",
          "bg-[#fafaf8]",
          "font-sans",
          "text-[#0A0A0A]"
        )}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}