"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import type { Session } from "next-auth"
import { AppSidebar } from "@/components/app-sidebar"
import { AppSidebarRight } from "@/components/app-sidebar-right"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Mail, MapPin, Phone, Edit, Settings, LogOut } from "lucide-react"

interface CustomSession extends Session {
    idToken?: string;
}

interface UserData {
    id: string;
    email: string;
    name: string;
    family_name: string;
    given_name: string;
    preferred_username: string;
    zitadel_user_id: string;
    picture?: string;
    phone?: string;
}

function ProfileContent() {
    const { data: session, status } = useSession()
    const [userData, setUserData] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (status === "authenticated") {
            const fetchUserData = async () => {
                try {
                    const idToken = (session as CustomSession)?.idToken
                    if (!idToken) {
                        throw new Error("ID token not found.")
                    }

                    const apiUrl = process.env.NEXT_PUBLIC_API_URL
                    if (!apiUrl) {
                        throw new Error("API URL is not configured.")
                    }

                    const response = await fetch(`${apiUrl}/auth/me`, {
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                        },
                    })

                    if (!response.ok) {
                        throw new Error(`Failed to fetch user data: ${response.statusText}`)
                    }

                    const data = await response.json()
                    setUserData(data)
                } catch (err) {
                    setError(err instanceof Error ? err.message : "An unknown error occurred")
                } finally {
                    setLoading(false)
                }
            }

            fetchUserData()
        } else if (status === "unauthenticated") {
            setLoading(false)
            setError("You must be logged in to view this page.")
        }
    }, [status, session])

    if (loading) {
        // You can replace this with a more sophisticated skeleton loader
        return <div>Loading profile...</div>
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>
    }
    
    if (!userData) {
        return <div>No user data available.</div>
    }

    const user = {
        name: userData.name || "N/A",
        email: userData.email || "N/A",
        phone: userData.phone || "+1 (555) 123-4567", // Mock data, adjust as needed
        location: "San Francisco, CA", // Mock data, adjust as needed
        joinDate: "N/A", // This data is not available from the API
        role: "Product Manager", // Mock data, adjust as needed
        department: "Engineering", // Mock data, adjust as needed
        avatar: userData.picture || `https://avatar.vercel.sh/${userData.name}.png?size=120`,
        bio: "Passionate product manager with 5+ years of experience building user-centric solutions. Love turning complex problems into simple, elegant experiences.", // Mock data
        status: "Active", // Mock data
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader className="text-center pb-4">
                        <div className="flex justify-center mb-4">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
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
                        <div className="flex justify-center mt-2">
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
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
                            <span className="text-gray-700">Joined N/A</span>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start bg-white text-gray-700" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Profile
                            </Button>
                            <Button variant="outline" className="w-full justify-start bg-white text-gray-700" size="sm">
                                <Settings className="h-4 w-4 mr-2" />
                                Settings
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start bg-white text-red-600 hover:bg-red-50"
                                size="sm"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Sign Out
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
                {/* About Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>About</CardTitle>
                        <CardDescription>A brief description about yourself</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700 leading-relaxed">{user.bio}</p>
                    </CardContent>
                </Card>

                {/* Work Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Work Information</CardTitle>
                        <CardDescription>Your role and department details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Position</label>
                                <p className="text-gray-900 mt-1">{user.role}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Department</label>
                                <p className="text-gray-900 mt-1">{user.department}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Employee ID</label>
                                <p className="text-gray-900 mt-1">{userData.id}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Manager</label>
                                <p className="text-gray-900 mt-1">Michael Chen</p>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Email Address</label>
                                <p className="text-gray-900 mt-1">{user.email}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Phone Number</label>
                                <p className="text-gray-900 mt-1">{user.phone}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Location</label>
                                <p className="text-gray-900 mt-1">{user.location}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Time Zone</label>
                                <p className="text-gray-900 mt-1">PST (UTC-8)</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Account Security */}
                <Card>
                    <CardHeader>
                        <CardTitle>Account Security</CardTitle>
                        <CardDescription>Manage your account security settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                            </div>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Enabled
                            </Badge>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">Password</p>
                                <p className="text-sm text-gray-500">Last changed 30 days ago</p>
                            </div>
                            <Button variant="outline" size="sm" className="bg-white text-gray-700">
                                Change Password
                            </Button>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">Login Sessions</p>
                                <p className="text-sm text-gray-500">Manage your active sessions</p>
                            </div>
                            <Button variant="outline" size="sm" className="bg-white text-gray-700">
                                View Sessions
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default function ProfilePage() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Profile</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <ProfileContent />
                </div>
            </SidebarInset>
            <AppSidebarRight />
        </SidebarProvider>
    )
}
