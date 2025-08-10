import { IconBook, IconDashboard, IconFolder, IconSearch } from "@tabler/icons-react"
import { type ReactNode, useEffect, useState } from "react"
import AppLogo from "@/components/app-logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button, Link, Sidebar, SidebarInset, SidebarNav } from "@/components/ui"
import type { NavItem } from "@/types"
import { Breadcrumbs } from "./app-breadcrumbs"
import CommandMenu from "./command-menu"
import { NavUser } from "./nav-user"

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: IconDashboard,
  },
]

const footerNavItems: NavItem[] = [
  {
    title: "Repository",
    href: "https://github.com/laravel/react-starter-kit",
    icon: IconFolder,
  },
  {
    title: "Documentation",
    href: "https://laravel.com/docs/starter-kits",
    icon: IconBook,
  },
]

interface AppSidebarProps {
  breadcrumbs?: NavItem[]
  variant: "inset" | "float" | "default"
  children: ReactNode
}

export function AppSidebar({ variant, children, breadcrumbs }: AppSidebarProps) {
  const pathname = window.location.pathname
  const [open, setOpen] = useState<boolean>(false)
  const [openCmd, setOpenCmd] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      <CommandMenu open={openCmd} setOpen={setOpenCmd} />
      <Sidebar
        collapsible="dock"
        variant={variant}
        isMobileOpen={open}
        onMobileOpenChange={setOpen}
      >
        <Sidebar.Header>
          <AppLogo />
          <Sidebar.Label className="text-[#ee2e03] text-sm">
            {import.meta.env.VITE_APP_NAME}
          </Sidebar.Label>
        </Sidebar.Header>

        <Sidebar.Content className="flex-1">
          <Sidebar.Section title="Platform">
            {mainNavItems.map((item) => (
              <Sidebar.Item key={item.title} href={item.href} isCurrent={pathname === item.href}>
                {item.icon && <item.icon />}
                <Sidebar.Label>{item.title}</Sidebar.Label>
              </Sidebar.Item>
            ))}
          </Sidebar.Section>
          <Sidebar.Section className="mt-auto">
            {footerNavItems.map((item) => (
              <Sidebar.Item key={item.title} href={item.href}>
                {item.icon && <item.icon />}
                <Sidebar.Label>{item.title}</Sidebar.Label>
              </Sidebar.Item>
            ))}
          </Sidebar.Section>
        </Sidebar.Content>

        <Sidebar.Footer>
          <NavUser showInfo />
        </Sidebar.Footer>
        <Sidebar.Rail />
        <Sidebar.Trigger />
      </Sidebar>
      <SidebarInset>
        <SidebarNav>
          <Link href="#" className="ml-auto pl-16 md:hidden">
            <AppLogo className="size-6" />
          </Link>
          {breadcrumbs && (
            <div className="hidden md:flex">
              <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
          )}
          <div className="ml-auto flex gap-2">
            <Button variant="outline" icon onPress={() => setOpenCmd(true)}>
              <IconSearch />
            </Button>
            <ThemeToggle />
          </div>
        </SidebarNav>
        {children}
      </SidebarInset>
    </>
  )
}
