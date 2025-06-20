import { Users, UserCheck, UserX, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12 this month",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Active Users",
    value: "2,654",
    change: "93.2% active rate",
    icon: UserCheck,
    color: "text-green-600",
  },
  {
    title: "Inactive Users",
    value: "193",
    change: "6.8% inactive rate",
    icon: UserX,
    color: "text-orange-600",
  },
  {
    title: "Admins",
    value: "24",
    change: "0.8% of total users",
    icon: Shield,
    color: "text-purple-600",
  },
]

export function UserStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
