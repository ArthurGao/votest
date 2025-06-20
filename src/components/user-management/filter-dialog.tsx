"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface FilterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FilterDialog({ open, onOpenChange }: FilterDialogProps) {
  const [filters, setFilters] = React.useState({
    role: "",
    department: "",
    status: "",
    lastLogin: "",
  })

  const [selectedRoles, setSelectedRoles] = React.useState<string[]>([])
  const [selectedDepartments, setSelectedDepartments] = React.useState<string[]>([])

  const roles = ["Admin", "Manager", "Developer", "Designer", "Analyst", "Sales Rep"]
  const departments = ["Engineering", "Design", "Marketing", "Sales", "Finance", "Human Resources"]

  const handleRoleChange = (role: string, checked: boolean) => {
    if (checked) {
      setSelectedRoles([...selectedRoles, role])
    } else {
      setSelectedRoles(selectedRoles.filter((r) => r !== role))
    }
  }

  const handleDepartmentChange = (department: string, checked: boolean) => {
    if (checked) {
      setSelectedDepartments([...selectedDepartments, department])
    } else {
      setSelectedDepartments(selectedDepartments.filter((d) => d !== department))
    }
  }

  const handleApplyFilters = () => {
    // Apply filters logic here
    console.log("Applying filters:", { selectedRoles, selectedDepartments, filters })
    onOpenChange(false)
  }

  const handleClearFilters = () => {
    setFilters({
      role: "",
      department: "",
      status: "",
      lastLogin: "",
    })
    setSelectedRoles([])
    setSelectedDepartments([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Filter Users</DialogTitle>
          <DialogDescription>Apply filters to narrow down the user list based on your criteria.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-3">
            <Label>Roles</Label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((role) => (
                <div key={role} className="flex items-center space-x-2">
                  <Checkbox
                    id={`role-${role}`}
                    checked={selectedRoles.includes(role)}
                    onCheckedChange={(checked) => handleRoleChange(role, checked as boolean)}
                  />
                  <Label htmlFor={`role-${role}`} className="text-sm font-normal">
                    {role}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            <Label>Departments</Label>
            <div className="grid grid-cols-2 gap-2">
              {departments.map((department) => (
                <div key={department} className="flex items-center space-x-2">
                  <Checkbox
                    id={`dept-${department}`}
                    checked={selectedDepartments.includes(department)}
                    onCheckedChange={(checked) => handleDepartmentChange(department, checked as boolean)}
                  />
                  <Label htmlFor={`dept-${department}`} className="text-sm font-normal">
                    {department}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="status">Status</Label>
            <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="lastLogin">Last Login</Label>
            <Select value={filters.lastLogin} onValueChange={(value) => setFilters({ ...filters, lastLogin: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Any time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This week</SelectItem>
                <SelectItem value="month">This month</SelectItem>
                <SelectItem value="quarter">This quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={handleClearFilters}>
            Clear All
          </Button>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
