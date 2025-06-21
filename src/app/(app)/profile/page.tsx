import { getIdToken } from "@/lib/auth"
import {
  ProfileContent,
  type ProfileUserData,
} from "@/components/profile/profile-content"

// This is the raw data structure from the API
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

async function getUserData(): Promise<UserData | null> {
  const idToken = await getIdToken()
  if (!idToken) {
    console.error("Not authenticated")
    return null
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    console.error("API URL is not configured")
    return null
  }

  try {
    const response = await fetch(`${apiUrl}/auth/me`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      cache: "no-store",
    })
    if (!response.ok) {
      console.error(`Failed to fetch user data: ${response.statusText}`)
      return null
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching user data:", error)
    return null
  }
}

export default async function ProfilePage() {
  const user = await getUserData()

  if (!user) {
    return <div>Failed to load user data. Please try logging in again.</div>
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
