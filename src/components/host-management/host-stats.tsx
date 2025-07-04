import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Server, WifiOff, Shield } from "lucide-react"

export function HostStats() {
  const stats = [
    { title: "Total Hosts", value: "1,254", icon: Server },
    { title: "Active Hosts", value: "1,198", icon: Users },
    { title: "Offline Hosts", value: "56", icon: WifiOff },
    { title: "Vulnerable Hosts", value: "24", icon: Shield },
  ]
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
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
