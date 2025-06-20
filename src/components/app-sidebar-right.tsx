"use client"

import type * as React from "react"
import { Calendar, FileText, MessageSquare, Settings, Star, Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Sample data for right sidebar
const notifications = [
  {
    id: 1,
    title: "Q4 revenue target exceeded by 12%",
    time: "5 min ago",
    type: "success",
  },
  {
    id: 2,
    title: "New user registration spike detected",
    time: "18 min ago",
    type: "info",
  },
  {
    id: 3,
    title: "Server response time increased",
    time: "1 hour ago",
    type: "warning",
  },
  {
    id: 4,
    title: "Weekly report is ready for review",
    time: "2 hours ago",
    type: "info",
  },
]

const quickActions = [
  {
    title: "New Document",
    icon: FileText,
    action: () => console.log("New document"),
  },
  {
    title: "Schedule Meeting",
    icon: Calendar,
    action: () => console.log("Schedule meeting"),
  },
  {
    title: "Send Message",
    icon: MessageSquare,
    action: () => console.log("Send message"),
  },
]

const recentActivity = [
  {
    title: "Revenue dashboard updated with Q4 data",
    time: "5 min ago",
    user: "System",
  },
  {
    title: "New conversion funnel analysis completed",
    time: "32 min ago",
    user: "Sarah Johnson",
  },
  {
    title: "User growth metrics exported to CSV",
    time: "1 hour ago",
    user: "Mike Chen",
  },
  {
    title: "Traffic sources report generated",
    time: "2 hours ago",
    user: "Emily Davis",
  },
]

export function AppSidebarRight({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar side="right" collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between p-2">
          <h2 className="text-lg font-semibold">Activity</h2>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Notifications */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between">
            <span>Notifications</span>
            <Badge variant="secondary" className="h-5 w-5 rounded-full p-0 text-xs">
              {notifications.length}
            </Badge>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2 p-2">
              {notifications.map((notification) => (
                <div key={notification.id} className="rounded-lg border p-3 text-sm hover:bg-accent cursor-pointer">
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                  </div>
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickActions.map((action) => (
                <SidebarMenuItem key={action.title}>
                  <SidebarMenuButton onClick={action.action}>
                    <action.icon className="h-4 w-4" />
                    <span>{action.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Recent Activity */}
        <SidebarGroup>
          <SidebarGroupLabel>Recent Activity</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2 p-2">
              {recentActivity.map((activity, index) => (
                <div key={index} className="rounded-lg p-3 text-sm hover:bg-accent cursor-pointer">
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{activity.user}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Starred Items */}
        <SidebarGroup>
          <SidebarGroupLabel>Starred</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>Important Project</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>Client Presentation</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>Team Meeting Notes</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-2">
          <Button variant="outline" className="w-full" size="sm">
            <Users className="h-4 w-4 mr-2" />
            View All Activity
          </Button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
