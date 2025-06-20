"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Loader2, AlertCircle } from "lucide-react"

export default function AuthCallbackPage() {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">
            {status === "loading" && "Completing Sign In..."}
            {status === "success" && "Welcome to CISO360AI!"}
            {status === "error" && "Sign In Failed"}
          </CardTitle>
          <CardDescription>
            {status === "loading" && "Please wait while we complete your authentication"}
            {status === "success" && "Redirecting you to your dashboard"}
            {status === "error" && "There was a problem signing you in"}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {status === "loading" && (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <span className="text-gray-600">Processing...</span>
            </div>
          )}

          {status === "success" && (
            <div className="text-green-600">
              <div className="text-4xl mb-2">✓</div>
              <p>Authentication successful!</p>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-red-600">
                <AlertCircle className="h-6 w-6" />
                <span>Authentication Error</span>
              </div>
              <p className="text-sm text-gray-600">{error}</p>
              <button onClick={() => router.push("/auth/signin")} className="text-blue-600 hover:underline text-sm">
                Try signing in again
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
