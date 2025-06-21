import { UserManagement } from "@/components/user-management/user-management"
import { PageHeader } from "@/components/ui/page-header"

export default function UsersPage() {
  return (
    <>
      <PageHeader
        items={[
          { title: "Organization", href: "#" },
          { title: "User Management" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <UserManagement />
      </div>
    </>
  )
}
