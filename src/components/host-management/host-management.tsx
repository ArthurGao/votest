"use client"

import * as React from "react"
import { Plus, Search, Filter, Download, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HostTable } from "@/components/host-management/host-table"
import { HostStats } from "@/components/host-management/host-stats"
import { AddHostDialog } from "@/components/host-management/add-host-dialog"
import { FilterDialog } from "@/components/host-management/filter-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function HostManagement() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [showAddHost, setShowAddHost] = React.useState(false)
  const [showFilters, setShowFilters] = React.useState(false)

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Host Management</h1>
          <p className="text-muted-foreground">Manage your organization&apos;s hosts and their configurations.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowFilters(true)}>
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
                <MoreHorizontal className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Export as Excel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => setShowAddHost(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Host
          </Button>
        </div>
      </div>

      {/* Stats */}
      <HostStats />

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Hosts</CardTitle>
          <CardDescription>A list of all hosts in your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search hosts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <HostTable searchQuery={searchQuery} />
        </CardContent>
      </Card>

      {/* Dialogs */}
      <AddHostDialog open={showAddHost} onOpenChange={setShowAddHost} />
      <FilterDialog open={showFilters} onOpenChange={setShowFilters} />
    </div>
  )
}
