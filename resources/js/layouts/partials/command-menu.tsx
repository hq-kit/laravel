import { router, usePage } from "@inertiajs/react"
import { IconDashboard, IconHome, IconLogin, IconLogout, IconUserPlus } from "@tabler/icons-react"
import { useEffect } from "react"
import { Command } from "@/components/ui"
import type { SharedData } from "@/types"

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function CommandMenu({ open, setOpen }: Props) {
  const pathname = usePage<SharedData>().props.ziggy.location
  const { user } = usePage<SharedData>().props.auth

  useEffect(() => {
    router.on("navigate", () => setOpen(false))
  }, [pathname, setOpen])

  return (
    <Command.Modal isOpen={open} onOpenChange={setOpen} shortcut={{ key: "k" }}>
      <Command.Section>
        <Command.Item textValue="home" href={route("home")}>
          <IconHome />
          <Command.Label>Home</Command.Label>
        </Command.Item>
        {user && (
          <Command.Item textValue="dashboard" href={route("dashboard")}>
            <IconDashboard />
            <Command.Label>Dashboard</Command.Label>
          </Command.Item>
        )}
      </Command.Section>
      <Command.Section title="Authentication">
        {user ? (
          <Command.Item
            textValue="logout"
            onAction={() => router.flushAll()}
            href={route("logout")}
            isDestructive
            routerOptions={{ method: "post" }}
          >
            <IconLogout />
            <Command.Label>Logout</Command.Label>
          </Command.Item>
        ) : (
          <>
            <Command.Item textValue="login" href={route("login")}>
              <IconLogin />
              <Command.Label>Login</Command.Label>
            </Command.Item>
            <Command.Item textValue="register" href={route("register")}>
              <IconUserPlus />
              <Command.Label>Register</Command.Label>
            </Command.Item>
          </>
        )}
      </Command.Section>
    </Command.Modal>
  )
}
