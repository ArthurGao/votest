import { RevenueChart } from "@/components/charts/revenue-chart"
import { SalesChart } from "@/components/charts/sales-chart"
import { TrafficSourcesChart } from "@/components/charts/traffic-sources-chart"
import { UserGrowthChart } from "@/components/charts/user-growth-chart"
import { StatsCards } from "@/components/stats-cards"
import { PageHeader } from "@/components/ui/page-header"
import { cookies } from 'next/headers'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const currentOrgProject = cookieStore.get('current_org_project')?.value
  
  let orgId, projectId;
  if (currentOrgProject) {
    [orgId, projectId] = currentOrgProject.split('/');
  }

  // You can now use orgId and projectId to fetch data for the dashboard
  console.log("Current Context from Cookie -> Org ID:", orgId, "Project ID:", projectId);

  return (
    <>
      <PageHeader
        items={[
          { title: "Dashboard", href: "#" },
          { title: "Analytics" },
        ]}
      />
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
      </div>
    </>
  )
}
