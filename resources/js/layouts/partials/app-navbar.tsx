import { IconHome, IconSearch } from "@tabler/icons-react"
import type React from "react"
import { useState } from "react"
import AppLogo from "@/components/app-logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Keyboard, Navbar } from "@/components/ui"
import { Button } from "@/components/ui/button"
import CommandMenu from "@/layouts/partials/command-menu"
import { NavUser } from "@/layouts/partials/nav-user"
import type { NavItem } from "@/types"
import { Breadcrumbs } from "./app-breadcrumbs"
import { AppFooter } from "./app-footer"

interface AppNavbarProps {
  variant?: "default" | "float" | "inset"
  breadcrumbs?: NavItem[]
  children?: React.ReactNode
}

export function AppNavbar({ variant, breadcrumbs, children }: AppNavbarProps) {
  const [openCmd, setOpenCmd] = useState(false)
  return (
    <>
      <CommandMenu open={openCmd} setOpen={setOpenCmd} />
      <Navbar isSticky variant={variant}>
        {/* Desktop Navigation */}
        <Navbar.Nav>
          <Navbar.Logo href="/dashboard">
            <AppLogo className="mr-4 size-6" />
          </Navbar.Logo>
          <Navbar.Section>
            <Navbar.Item isCurrent={route().current("home")} href={route("home")}>
              <IconHome />
              Home
            </Navbar.Item>
          </Navbar.Section>

          <Navbar.Section className="ml-auto hidden md:flex">
            <Navbar.Flex>
              <Button variant="outline" onPress={() => setOpenCmd(true)}>
                <IconSearch />
                <Keyboard keys={["meta", "k"]} />
              </Button>
              <ThemeToggle />
              <NavUser layout="navbar" />
            </Navbar.Flex>
          </Navbar.Section>
        </Navbar.Nav>

        {/* Mobile Menu */}
        <Navbar.Compact>
          <Navbar.Flex>
            <Navbar.Trigger />
            <Navbar.Logo href="/dashboard">
              <AppLogo className="size-6" />
            </Navbar.Logo>
          </Navbar.Flex>
          <Navbar.Flex>
            <Button variant="ghost" icon onPress={() => setOpenCmd(true)}>
              <IconSearch />
            </Button>
            <ThemeToggle variant="ghost" />
            <NavUser layout="navbar" />
          </Navbar.Flex>
        </Navbar.Compact>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Navbar.Breadcrumbs>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </Navbar.Breadcrumbs>
        )}
        <Navbar.Inset>
          {children}
          <AppFooter />
        </Navbar.Inset>
      </Navbar>
      {/* <div className="mih-h-[calc(100vh-var(--navbar-height))]">{children}</div> */}
    </>
  )
}
