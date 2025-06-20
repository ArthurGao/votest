"use client"

import type * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { OrgSwitcher } from "@/components/org-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { teams, navMain, projects, active_user, navSettings } from "@/lib/placeholder-data"
import { NavSettings } from "./nav-settings"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <OrgSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavSettings items={navSettings} />
        <NavUser user={active_user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
