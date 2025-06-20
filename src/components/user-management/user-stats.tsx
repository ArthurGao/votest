import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { user_stats } from "@/lib/placeholder-data"

export function UserStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {user_stats.map((user_stats) => (
        <Card key={user_stats.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{user_stats.title}</CardTitle>
            <user_stats.icon className={`h-4 w-4 ${user_stats.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user_stats.value}</div>
            <p className="text-xs text-muted-foreground">{user_stats.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
