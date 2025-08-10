import type { ReactNode } from "react"
import { Toaster } from "@/components/toaster"
import { AppSidebar } from "@/layouts/partials/app-sidebar"
import type { NavItem } from "@/types"

interface SidebarLayoutProps {
  children: ReactNode
  variant?: "default" | "float" | "inset"
  breadcrumbs?: NavItem[]
}

export default ({ children, variant = "inset", breadcrumbs }: SidebarLayoutProps) => {
  return (
    <div className="flex">
      <Toaster />
      <AppSidebar variant={variant} breadcrumbs={breadcrumbs}>
        {children}
      </AppSidebar>
    </div>
  )
}
