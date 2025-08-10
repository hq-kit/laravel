import type { ReactNode } from "react"
import { FlashProvider } from "@/components/providers"
import { AppNavbar } from "@/layouts/partials/app-navbar"
import { AppSidebar } from "@/layouts/partials/app-sidebar"
import type { NavItem } from "@/types"

interface AppLayoutProps {
  children: ReactNode
  layout?: "sidebar" | "navbar"
  variant?: "default" | "float" | "inset"
  breadcrumbs?: NavItem[]
}

export default ({
  children,
  layout = "sidebar",
  variant = "inset",
  breadcrumbs,
}: AppLayoutProps) => {
  return layout === "sidebar" ? (
    <div className="flex">
      <FlashProvider />
      <AppSidebar variant={variant} breadcrumbs={breadcrumbs}>
        {children}
      </AppSidebar>
    </div>
  ) : (
    <div className="grid min-h-dvh w-full">
      <FlashProvider />
      <AppNavbar variant={variant}>{children}</AppNavbar>
    </div>
  )
}
