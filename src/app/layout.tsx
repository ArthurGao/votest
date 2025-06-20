import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CISO360AI - Cybersecurity Management Platform",
  description:
    "Comprehensive cybersecurity management platform powered by AI. Streamline your security operations, manage risks, and protect your organization.",
  keywords: ["cybersecurity", "CISO", "AI", "risk management", "compliance"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
