"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Bell, User, Settings, LogOut, Menu, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState, type ReactNode } from "react"
import { Sidebar } from "./sidebar"

interface AppLayoutProps {
  children: ReactNode
  pageTitle?: string
  searchPlaceholder?: string
}

export function AppLayout({ children, pageTitle, searchPlaceholder = "Search..." }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50 font-montserrat">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-[248px]">
        <Sidebar className="w-full" />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-[248px] p-0 border-slate-600">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar - Original height restored */}
        <div className="bg-slate-600 border-b border-slate-500 px-4 lg:px-6 py-2 flex items-center justify-between">
          {/* Left Side - Mobile Menu + Back + Page Title */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="lg:hidden h-10 w-10 p-0 text-white hover:bg-slate-500">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
            </Sheet>

            {/* Back Arrow + "Back" */}
            <Link
              href="/community"
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Back</span>
            </Link>

            {/* Page Title - Increased font size */}
            {pageTitle && <h1 className="text-xl lg:text-2xl font-bold text-white">{pageTitle}</h1>}
          </div>

          {/* Right Side - Search + User Menu */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={searchPlaceholder}
                  className="pl-10 w-64 bg-slate-500 border-slate-400 text-white placeholder:text-gray-300"
                />
              </div>
            </div>

            {/* Notification Bell */}
            <Link href="/notifications">
              <Button
                variant="ghost"
                className="h-10 w-10 lg:h-12 lg:w-12 p-2 text-yellow-400 hover:bg-slate-500 hover:text-yellow-300 transition-all duration-200 hover:scale-110 relative"
              >
                <Bell
                  className="h-8 w-8 lg:h-12 lg:w-12 transition-transform duration-200 hover:animate-pulse"
                  fill="currentColor"
                />
                {/* Notification Badge */}
                <span className="absolute -top-1 -right-1 h-6 w-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  3
                </span>
              </Button>
            </Link>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-500 rounded-lg px-2 py-1 transition-colors">
                  <Avatar className="h-8 w-8 lg:h-10 lg:w-10">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-white hidden sm:block">Profile</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4 text-blue-500" fill="currentColor" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link href="/notifications?tab=settings">
                    <Settings className="mr-2 h-4 w-4 text-gray-600" fill="currentColor" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600" asChild>
                  <Link href="/logout">
                    <LogOut className="mr-2 h-4 w-4 text-red-600" />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  )
}
