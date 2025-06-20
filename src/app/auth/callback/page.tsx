"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Loader2, AlertCircle } from "lucide-react"

function CallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [error, setError] = useState("")

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get("code")
        const error = searchParams.get("error")

        if (error) {
          setError(`Authentication failed: ${error}`)
          setStatus("error")
          return
        }

        if (!code) {
          setError("No authorization code received")
          setStatus("error")
          return
        }

        // Exchange code for tokens
        const response = await fetch("/api/auth/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        })

        if (!response.ok) {
          throw new Error("Failed to exchange code for tokens")
        }

        const { user, tokens } = await response.json()

        // Store user session
        localStorage.setItem("ciso360ai-user", JSON.stringify(user))
        localStorage.setItem("ciso360ai-tokens", JSON.stringify(tokens))

        setStatus("success")

        // Redirect to dashboard after a brief delay
        setTimeout(() => {
          router.push("/dashboard")
        }, 1500)
      } catch (err) {
        console.error("Auth callback error:", err)
        setError(err instanceof Error ? err.message : "Authentication failed")
        setStatus("error")
      }
    }

    handleCallback()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Signing In...</CardTitle>
          <CardDescription>Processing your authentication, please wait.</CardDescription>
        </CardHeader>
        <CardContent>
          {status === "loading" && (
            <div className="flex flex-col items-center space-y-2">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <span>Signing you in...</span>
            </div>
          )}
          {status === "error" && (
            <div className="flex flex-col items-center space-y-2 text-red-600">
              <AlertCircle className="h-6 w-6" />
              <span>{error}</span>
            </div>
          )}
          {status === "success" && (
            <div className="flex flex-col items-center space-y-2 text-green-600">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Login successful! Redirecting...</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense>
      <CallbackContent />
    </Suspense>
  )
}
