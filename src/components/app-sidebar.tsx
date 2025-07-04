import type * as React from "react"
import type { Session } from "next-auth"
import { getIdToken, requireAuth } from "@/lib/auth"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { OrgSwitcher } from "@/components/org-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

// --- Data Fetching Logic ---
interface CustomSession extends Session {
  idToken?: string;
}

async function fetchUser() {
  try {
      const session = await requireAuth() as CustomSession;
      const idToken = session?.idToken;

      if (!idToken) {
          throw new Error("ID token not found in session.");
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
          throw new Error("API URL is not configured.");
      }

      const response = await fetch(`${apiUrl}/auth/me`, {
          headers: {
              Authorization: `Bearer ${idToken}`,
          },
          cache: 'no-store', 
      });

      if (!response.ok) {
          const errorBody = await response.text();
          console.error(`Failed to fetch user data: ${response.status} ${response.statusText}`, { errorBody });
          throw new Error(`Failed to fetch user data.`);
      }

      const userData = await response.json();
      
      return {
          name: userData.name || "User",
          email: userData.email,
          avatar: userData.picture || `https://avatar.vercel.sh/${userData.name}.png`,
      };

  } catch (error) {
      console.error("Error fetching user:", error);
      return {
          name: "Guest",
          email: "",
          avatar: "https://avatar.vercel.sh/guest.png",
      };
  }
}

const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: "square-terminal",
    isActive: false,
    items: [
      {
        title: "Analytics",
        url: "/dashboard",
      },
      {
        title: "Reports",
        url: "#",
      },
      {
        title: "Settings",
        url: "#",
      },
    ],
  },
  {
    title: "Organization",
    url: "#",
    icon: "users",
    isActive: true,
    items: [
      {
        title: "User Management",
        url: "/organization/users",
      },
      {
        title: "Teams",
        url: "#",
      },
      {
        title: "Roles & Permissions",
        url: "#",
      },
      {
        title: "Settings",
        url: "#",
      },
    ],
  },
  {
    title: "Assets",
    url: "#",
    icon: "database",
    items: [
      {
        title: "Hosts",
        url: "/assets/hosts",
      },
    ],
  },
  {
    title: "Documentation",
    url: "#",
    icon: "book-open",
    items: [
      {
        title: "Introduction",
        url: "#",
      },
      {
        title: "Get Started",
        url: "#",
      },
      {
        title: "Tutorials",
        url: "#",
      },
      {
        title: "Changelog",
        url: "#",
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: "settings-2",
    items: [
      {
        title: "General",
        url: "#",
      },
      {
        title: "Team",
        url: "#",
      },
      {
        title: "Billing",
        url: "#",
      },
      {
        title: "Limits",
        url: "#",
      },
    ],
  },
]

const projects = [
  {
    name: "Design Engineering",
    url: "#",
    icon: "frame",
  },
  {
    name: "Sales & Marketing",
    url: "#",
    icon: "piechart",
  },
  {
    name: "Travel",
    url: "#",
    icon: "map",
  },
]

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = await fetchUser();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const idToken = await getIdToken();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <OrgSwitcher apiUrl={apiUrl} idToken={idToken} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
