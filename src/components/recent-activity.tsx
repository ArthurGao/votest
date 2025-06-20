import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { activities } from "@/lib/placeholder-data"

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
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
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
