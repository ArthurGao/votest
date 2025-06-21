"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import type { Session } from "next-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CalendarDays,
  Edit,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Settings,
} from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"

interface CustomSession extends Session {
  idToken?: string
}

interface UserData {
  id: string
  email: string
  name: string
  family_name: string
  given_name: string
  preferred_username: string
  zitadel_user_id: string
  picture?: string
  phone?: string
}

interface ProfileUserData {
  name: string
  email: string
  avatar: string
  phone: string
  location: string
  joinDate: string
  role: string
  department: string
  bio: string
  status: string
  employeeId: string
  manager: string
  timeZone: string
}

function ProfileContent({ user }: { user: ProfileUserData | null }) {
  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <>
      <PageHeader items={[{ title: "Profile" }]} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-4 text-center">
                <div className="mb-4 flex justify-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-lg">
                      {user.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription className="text-sm">{user.role}</CardDescription>
                <div className="mt-2 flex justify-center">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    {user.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{user.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{user.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{user.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <CalendarDays className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Joined {user.joinDate}</span>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-white text-gray-700"
                    size="sm"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-white text-gray-700"
                    size="sm"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-white text-red-600 hover:bg-red-50"
                    size="sm"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
                <CardDescription>A brief description about yourself</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-gray-700">{user.bio}</p>
              </CardContent>
            </Card>

            {/* Work Information */}
            <Card>
              <CardHeader>
                <CardTitle>Work Information</CardTitle>
                <CardDescription>
                  Your role and department details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Position
                    </label>
                    <p className="mt-1 text-gray-900">{user.role}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Department
                    </label>
                    <p className="mt-1 text-gray-900">{user.department}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Employee ID
                    </label>
                    <p className="mt-1 text-gray-900">{user.employeeId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Manager
                    </label>
                    <p className="mt-1 text-gray-900">{user.manager}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>How others can reach you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email Address
                    </label>
                    <p className="mt-1 text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Phone Number
                    </label>
                    <p className="mt-1 text-gray-900">{user.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Location
                    </label>
                    <p className="mt-1 text-gray-900">{user.location}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Time Zone
                    </label>
                    <p className="mt-1 text-gray-900">{user.timeZone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Security */}
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>
                  Manage your account security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      Two-Factor Authentication
                    </p>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-green-200 bg-green-50 text-green-700"
                  >
                    Enabled
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Password</p>
                    <p className="text-sm text-gray-500">Last changed 30 days ago</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white text-gray-700"
                  >
                    Change Password
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Login Sessions</p>
                    <p className="text-sm text-gray-500">
                      Manage your active sessions
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white text-gray-700"
                  >
                    View Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const idToken = (session as CustomSession)?.idToken
      if (status === "authenticated" && idToken) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            }
          )
          if (!response.ok) {
            throw new Error("Failed to fetch user data")
          }
          const data = await response.json()
          setUser(data)
        } catch (error) {
          console.error(error)
        }
      }
    }

    fetchUserData()
  }, [session, status])

  if (status === "loading") {
    return <div>Loading session...</div>
  }

  if (status === "unauthenticated") {
    return <div>Please sign in to view your profile.</div>
  }

  if (!user) {
    return <div>Loading user data...</div>
  }

  // Mapping fetched data to the structure expected by ProfileContent
  const profileUser: ProfileUserData = {
    name: user.name || "N/A",
    email: user.email || "N/A",
    avatar: user.picture || `https://avatar.vercel.sh/${user.name}.png?size=120`,
    phone: user.phone || "+1 (555) 123-4567",
    location: "San Francisco, CA", // Mock data
    joinDate: "N/A", // Mock data
    role: "Product Manager", // Mock data
    department: "Engineering", // Mock data
    bio: "Passionate product manager with 5+ years of experience building user-centric solutions. Love turning complex problems into simple, elegant experiences.", // Mock data
    status: "Active", // Mock data
    employeeId: user.zitadel_user_id || "N/A",
    manager: "Michael Chen", // Mock data
    timeZone: "PST (UTC-8)", // Mock data
  }

  return <ProfileContent user={profileUser} />
}
