"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { LogIn, LogOut, UserPlus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

interface AuthUser {
  id: string
  name: string
  email: string
}

export function SimpleAuthButton() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in (from localStorage for demo)
    const storedUser = localStorage.getItem("ciso360ai-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("ciso360ai-user")
    setUser(null)
    router.push("/")
  }

  const handleSignIn = () => {
    router.push("/auth/signin")
  }

  const handleSignUp = () => {
    router.push("/auth/signup")
  }

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        Loading...
      </Button>
    )
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <Button onClick={handleSignIn} variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
        <LogIn className="h-4 w-4 mr-2" />
        Sign In
      </Button>
      <Button onClick={handleSignUp} size="sm" className="bg-blue-600 hover:bg-blue-700">
        <UserPlus className="h-4 w-4 mr-2" />
        Sign Up
      </Button>
    </div>
  )
}
