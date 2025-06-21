"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AddHostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddHostDialog({ open, onOpenChange }: AddHostDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Host</DialogTitle>
          <DialogDescription>
            Enter the details for the new host. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hostname" className="text-right">
              Hostname
            </Label>
            <Input id="hostname" placeholder="e.g., web-server-02" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ipAddress" className="text-right">
              IP Address
            </Label>
            <Input id="ipAddress" placeholder="e.g., 192.168.1.11" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="os" className="text-right">
              Operating System
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select OS" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ubuntu">Ubuntu</SelectItem>
                <SelectItem value="centos">CentOS</SelectItem>
                <SelectItem value="windows">Windows Server</SelectItem>
                <SelectItem value="debian">Debian</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save Host</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
