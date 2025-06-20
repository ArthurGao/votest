"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { source: "organic", visitors: 2750, fill: "var(--color-organic)" },
  { source: "direct", visitors: 1890, fill: "var(--color-direct)" },
  { source: "social", visitors: 1230, fill: "var(--color-social)" },
  { source: "referral", visitors: 980, fill: "var(--color-referral)" },
  { source: "email", visitors: 650, fill: "var(--color-email)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  organic: {
    label: "Organic Search",
    color: "hsl(var(--chart-1))",
  },
  direct: {
    label: "Direct",
    color: "hsl(var(--chart-2))",
  },
  social: {
    label: "Social Media",
    color: "hsl(var(--chart-3))",
  },
  referral: {
    label: "Referral",
    color: "hsl(var(--chart-4))",
  },
  email: {
    label: "Email",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function TrafficSourcesChart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Traffic Sources</CardTitle>
        <CardDescription>Website visitors by source</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" nameKey="source" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
