"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"
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

// This is the structure of the data after being fetched and mapped.
// It's what this presentation component will receive.
export interface ProfileUserData {
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

export function ProfileContent({ user }: { user: ProfileUserData | null }) {
  if (!user) {
    return <div>Loading user data...</div>
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
                <CardDescription className="text-sm">
                  {user.role}
                </CardDescription>
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
                <CardDescription>
                  A brief description about yourself
                </CardDescription>
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
                    <p className="text-sm text-gray-500">
                      Last changed 30 days ago
                    </p>
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