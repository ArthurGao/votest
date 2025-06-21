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

interface Host {
  id: string;
  hostname: string;
}

// Helper arrays for mock data
const mockIPs = ["192.168.1.10", "10.0.5.21", "172.16.3.45", "192.168.2.108"];
const mockOS = ["Ubuntu 22.04", "CentOS 9", "Windows Server 2022", "Debian 11"];
const mockStatuses = ["Active", "Offline", "Active", "Vulnerable"];


interface HostTableProps {
  searchQuery: string;
  hosts: Host[];
}

export function HostTable({ searchQuery, hosts }: HostTableProps) {
  const filteredHosts = hosts.filter(
    (host) =>
      host.hostname.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getMockData = (index: number) => ({
    ipAddress: mockIPs[index % mockIPs.length],
    os: mockOS[index % mockOS.length],
    status: mockStatuses[index % mockStatuses.length],
  });

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
          {filteredHosts.map((host, index) => {
            const mockData = getMockData(index);
            return (
              <TableRow key={host.id}>
                <TableCell><Checkbox /></TableCell>
                <TableCell>
                  <div className="font-medium">{host.hostname}</div>
                  <div className="text-sm text-muted-foreground">{mockData.ipAddress}</div>
                </TableCell>
                <TableCell>{mockData.os}</TableCell>
                <TableCell>
                  <Badge variant={mockData.status === "Active" ? "default" : "secondary"}>
                    {mockData.status}
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
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
