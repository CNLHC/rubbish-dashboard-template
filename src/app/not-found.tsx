"use client"
import { usePathname } from "next/navigation"
import React, { useEffect } from "react"
import AdminLayout from "./admin/components/admin-layout"
import { Center } from "@mantine/core"

const NotFound = () => {
  const pathname = usePathname()
  if (pathname.startsWith("/admin")) {
    return (
      <AdminLayout>
        <div className="h-full">
          <Center>当前页面正在施工</Center>
        </div>
      </AdminLayout>
    )
  }
  return (
    <div className="h-full">
      <Center>404</Center>
    </div>
  )
}

export default NotFound
