import { router, usePage } from "@inertiajs/react"
import { IconDashboard, IconLogout, IconSettings } from "@tabler/icons-react"
import { Avatar, buttonStyle, Link, Menu, User } from "@/components/ui"
import { cn } from "@/lib/utils"
import type { SharedData } from "@/types"

export function NavUser({
  showInfo = false,
  layout = "sidebar",
}: {
  showInfo?: boolean
  layout?: "navbar" | "sidebar"
}) {
  const { user } = usePage<SharedData>().props.auth

  return user ? (
    <Menu>
      <Menu.Trigger
        className={cn(
          "flex items-center justify-between rounded-lg pressed:bg-muted/50 hover:bg-muted/40",
          layout === "sidebar" ? "size-full p-2" : "mx-2",
        )}
      >
        {showInfo ? (
          <User shape="square" name={user.name} src={user.avatar!} description={user.email} />
        ) : (
          <Avatar shape="square" src={user.avatar!} />
        )}
      </Menu.Trigger>
      <Menu.Content placement={layout === "navbar" ? "bottom end" : "top start"}>
        <Menu.Header className="sm:pr-8">
          <User
            size="lg"
            shape="square"
            name={user.name}
            src={user.avatar!}
            description={user.email}
          />
        </Menu.Header>
        <Menu.Item href={route("dashboard")}>
          <IconDashboard />
          <Menu.Label>Dashboard</Menu.Label>
        </Menu.Item>
        <Menu.Item href={route("profile.edit")}>
          <IconSettings />
          <Menu.Label>Settings</Menu.Label>
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item
          href={route("logout")}
          onAction={() => router.flushAll()}
          isDestructive
          routerOptions={{ method: "post" }}
        >
          <IconLogout />
          <Menu.Label>Logout</Menu.Label>
        </Menu.Item>
      </Menu.Content>
    </Menu>
  ) : (
    <Link href={route("login")} className={buttonStyle({ variant: "outline" })}>
      Login
    </Link>
  )
}
