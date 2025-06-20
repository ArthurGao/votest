import { AppSidebar } from "@/components/app-sidebar"
import { AppSidebarRight } from "@/components/app-sidebar-right"
import { RevenueChart } from "@/components/charts/revenue-chart"
import { SalesChart } from "@/components/charts/sales-chart"
import { TrafficSourcesChart } from "@/components/charts/traffic-sources-chart"
import { UserGrowthChart } from "@/components/charts/user-growth-chart"
import { RecentActivity } from "@/components/recent-activity"
import { StatsCards } from "@/components/stats-cards"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Analytics</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Stats Cards */}
          <StatsCards />

          {/* Charts Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>
            <TrafficSourcesChart />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <SalesChart />
            <UserGrowthChart />
          </div>

          {/* Recent Activity */}
          <RecentActivity />
        </div>
      </SidebarInset>
      <AppSidebarRight />
    </SidebarProvider>
  )
}
