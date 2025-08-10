import type { ReactNode } from "react"
import { Toaster } from "@/components/toaster"
import { AppNavbar } from "@/layouts/partials/app-navbar"
import type { NavItem } from "@/types"

interface NavbarLayoutProps {
  children: ReactNode
  variant?: "default" | "float" | "inset"
  breadcrumbs?: NavItem[]
}

export default ({ children, variant = "inset", breadcrumbs }: NavbarLayoutProps) => {
  return (
    <div className="grid min-h-dvh w-full">
      <Toaster />
      <AppNavbar variant={variant} breadcrumbs={breadcrumbs}>
        {children}
      </AppNavbar>
    </div>
  )
}
