"use client"

import * as React from "react"
import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

// Sample host data
const hosts = [
  {
    id: "host-1",
    hostname: "web-server-01",
    ipAddress: "192.168.1.10",
    os: "Ubuntu 22.04",
    status: "Active",
  },
  {
    id: "host-2",
    hostname: "db-server-main",
    ipAddress: "192.168.1.15",
    os: "CentOS 9",
    status: "Active",
  },
  {
    id: "host-3",
    hostname: "app-worker-alpha",
    ipAddress: "10.0.5.21",
    os: "Windows Server 2022",
    status: "Offline",
  },
];

interface HostTableProps {
  searchQuery: string
}

export function HostTable({ searchQuery }: HostTableProps) {
  const filteredHosts = hosts.filter(
    (host) =>
      host.hostname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      host.ipAddress.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"><Checkbox /></TableHead>
            <TableHead>Hostname</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>Operating System</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredHosts.map((host) => (
            <TableRow key={host.id}>
              <TableCell><Checkbox /></TableCell>
              <TableCell>
                <div className="font-medium">{host.hostname}</div>
                <div className="text-sm text-muted-foreground">{host.ipAddress}</div>
              </TableCell>
              <TableCell>{host.os}</TableCell>
              <TableCell>
                <Badge variant={host.status === "Active" ? "default" : "secondary"}>
                  {host.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit Host</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete Host</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
