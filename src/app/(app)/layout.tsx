import { AppSidebar } from '@/components/app-sidebar'
import { AppSidebarRight } from '@/components/app-sidebar-right'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
      <AppSidebarRight />
    </SidebarProvider>
  )
} 