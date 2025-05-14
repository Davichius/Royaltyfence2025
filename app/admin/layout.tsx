"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, MessageSquare, Users } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center px-4">
          <h1 className="text-xl font-bold">Royalty Fence Admin</h1>

          <nav className="ml-auto flex space-x-4">
            <Link
              href="/admin/chat"
              className={`flex items-center px-3 py-2 rounded-md ${
                pathname === "/admin/chat" ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
              }`}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Live Chat
            </Link>
            <Link
              href="/admin/analytics"
              className={`flex items-center px-3 py-2 rounded-md ${
                pathname === "/admin/analytics" ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
              }`}
            >
              <BarChart className="mr-2 h-4 w-4" />
              Analytics
            </Link>
            <Link
              href="/admin/staff"
              className={`flex items-center px-3 py-2 rounded-md ${
                pathname === "/admin/staff" ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
              }`}
            >
              <Users className="mr-2 h-4 w-4" />
              Staff
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  )
}
