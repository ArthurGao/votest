import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const activities = [
  {
    user: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    action: "completed project milestone",
    target: "Mobile App Redesign",
    time: "2 minutes ago",
  },
  {
    user: {
      name: "Mike Chen",
      email: "mike@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MC",
    },
    action: "uploaded new design files",
    target: "Brand Guidelines v2.0",
    time: "15 minutes ago",
  },
  {
    user: {
      name: "Emily Davis",
      email: "emily@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ED",
    },
    action: "commented on",
    target: "Q4 Marketing Strategy",
    time: "1 hour ago",
  },
  {
    user: {
      name: "Alex Rodriguez",
      email: "alex@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AR",
    },
    action: "shared document",
    target: "Product Roadmap 2024",
    time: "2 hours ago",
  },
  {
    user: {
      name: "Lisa Wang",
      email: "lisa@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "LW",
    },
    action: "created new task",
    target: "User Testing Session",
    time: "3 hours ago",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest team activities and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                <AvatarFallback className="text-xs">{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="text-sm">
                  <span className="font-medium">{activity.user.name}</span>
                  <span className="text-muted-foreground"> {activity.action} </span>
                  <span className="font-medium">{activity.target}</span>
                </div>
                <div className="text-xs text-muted-foreground">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
