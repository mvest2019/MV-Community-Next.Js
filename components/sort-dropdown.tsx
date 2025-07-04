"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function SortDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-gray-600">
          Sort by: Recent
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Recent</DropdownMenuItem>
        <DropdownMenuItem>Relevant</DropdownMenuItem>
        <DropdownMenuItem>Top</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
