"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { month: "January", users: 1200 },
  { month: "February", users: 1450 },
  { month: "March", users: 1680 },
  { month: "April", users: 1920 },
  { month: "May", users: 2150 },
  { month: "June", users: 2380 },
  { month: "July", users: 2650 },
  { month: "August", users: 2890 },
  { month: "September", users: 3120 },
  { month: "October", users: 3450 },
  { month: "November", users: 3780 },
  { month: "December", users: 4100 },
]

const chartConfig = {
  users: {
    label: "Users",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function UserGrowthChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
        <CardDescription>Total active users over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey="users"
              type="natural"
              stroke="var(--color-users)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-users)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
