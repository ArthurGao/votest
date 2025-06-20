import { ArrowDownIcon, ArrowUpIcon, Shield, AlertTriangle, Users, Activity } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Security Score",
    value: "87/100",
    change: "+5.2%",
    changeType: "increase" as const,
    icon: Shield,
  },
  {
    title: "Active Threats",
    value: "23",
    change: "-12.1%",
    changeType: "decrease" as const,
    icon: AlertTriangle,
  },
  {
    title: "Vulnerability Count",
    value: "147",
    change: "+8.7%",
    changeType: "increase" as const,
    icon: Activity,
  },
  {
    title: "Compliance Rate",
    value: "94.3%",
    change: "+2.1%",
    changeType: "increase" as const,
    icon: Users,
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stat.changeType === "increase" ? (
                <ArrowUpIcon className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <ArrowDownIcon className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={stat.changeType === "increase" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
