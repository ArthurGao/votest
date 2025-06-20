"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { month: "January", revenue: 186000, expenses: 80000 },
  { month: "February", revenue: 305000, expenses: 120000 },
  { month: "March", revenue: 237000, expenses: 110000 },
  { month: "April", revenue: 273000, expenses: 140000 },
  { month: "May", revenue: 209000, expenses: 95000 },
  { month: "June", revenue: 314000, expenses: 160000 },
  { month: "July", revenue: 285000, expenses: 135000 },
  { month: "August", revenue: 342000, expenses: 175000 },
  { month: "September", revenue: 298000, expenses: 145000 },
  { month: "October", revenue: 367000, expenses: 185000 },
  { month: "November", revenue: 421000, expenses: 210000 },
  { month: "December", revenue: 394000, expenses: 195000 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue vs Expenses</CardTitle>
        <CardDescription>Monthly revenue and expenses for the current year</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="expenses"
              type="natural"
              fill="var(--color-expenses)"
              fillOpacity={0.4}
              stroke="var(--color-expenses)"
              stackId="a"
            />
            <Area
              dataKey="revenue"
              type="natural"
              fill="var(--color-revenue)"
              fillOpacity={0.4}
              stroke="var(--color-revenue)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 12.5% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">January - December 2024</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
