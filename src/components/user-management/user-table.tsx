"use client"

import * as React from "react"
import { MoreHorizontal, Edit, Trash2, UserX, UserCheck, Mail, Shield, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

// Sample user data
const users = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "Admin",
    department: "Engineering",
    status: "Active",
    lastLogin: "2024-01-15",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SJ",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike.chen@company.com",
    role: "Developer",
    department: "Engineering",
    status: "Active",
    lastLogin: "2024-01-14",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "MC",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    role: "Designer",
    department: "Design",
    status: "Active",
    lastLogin: "2024-01-13",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "ED",
  },
  {
    id: "4",
    name: "Alex Rodriguez",
    email: "alex.rodriguez@company.com",
    role: "Manager",
    department: "Marketing",
    status: "Inactive",
    lastLogin: "2024-01-10",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "AR",
  },
  {
    id: "5",
    name: "Lisa Wang",
    email: "lisa.wang@company.com",
    role: "Developer",
    department: "Engineering",
    status: "Active",
    lastLogin: "2024-01-15",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "LW",
  },
  {
    id: "6",
    name: "David Brown",
    email: "david.brown@company.com",
    role: "Analyst",
    department: "Finance",
    status: "Active",
    lastLogin: "2024-01-12",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "DB",
  },
  {
    id: "7",
    name: "Jennifer Wilson",
    email: "jennifer.wilson@company.com",
    role: "HR Manager",
    department: "Human Resources",
    status: "Active",
    lastLogin: "2024-01-14",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "JW",
  },
  {
    id: "8",
    name: "Robert Taylor",
    email: "robert.taylor@company.com",
    role: "Sales Rep",
    department: "Sales",
    status: "Inactive",
    lastLogin: "2024-01-08",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "RT",
  },
]

interface UserTableProps {
  searchQuery: string
}

export function UserTable({ searchQuery }: UserTableProps) {
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([])

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map((user) => user.id))
    } else {
      setSelectedUsers([])
    }
  }

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId])
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return <Shield className="h-4 w-4" />
      case "manager":
        return <User className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "destructive" as const
      case "manager":
        return "default" as const
      default:
        return "secondary" as const
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    return status === "Active" ? "default" : "secondary"
  }

  return (
    <div className="space-y-4">
      {selectedUsers.length > 0 && (
        <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
          <span className="text-sm font-medium">{selectedUsers.length} users selected</span>
          <Button size="sm" variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Send Email
          </Button>
          <Button size="sm" variant="outline">
            <UserX className="mr-2 h-4 w-4" />
            Deactivate
          </Button>
          <Button size="sm" variant="outline">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={(checked) => handleSelectUser(user.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getRoleBadgeVariant(user.role)} className="gap-1">
                    {getRoleIcon(user.role)}
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(user.status)}>
                    {user.status === "Active" ? (
                      <UserCheck className="mr-1 h-3 w-3" />
                    ) : (
                      <UserX className="mr-1 h-3 w-3" />
                    )}
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{user.lastLogin}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        {user.status === "Active" ? (
                          <>
                            <UserX className="mr-2 h-4 w-4" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Activate
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
