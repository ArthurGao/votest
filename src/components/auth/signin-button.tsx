"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function SignInButton() {
  const handleSignIn = () => {
    signIn("zitadel", { callbackUrl: "/dashboard" })
  }

  return (
    <Button onClick={handleSignIn} className="w-full bg-blue-600 hover:bg-blue-700">
      Sign in with Zitadel
    </Button>
  )
}
