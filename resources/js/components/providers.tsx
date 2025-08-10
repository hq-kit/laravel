import { router, usePage } from "@inertiajs/react"
import { useEffect, useState } from "react"
import { RouterProvider } from "react-aria-components"
import { toast } from "sonner"
import { Toast } from "@/components/ui"
import type { SharedData } from "@/types"

export type Theme = "light" | "dark" | "system"

const prefersDark = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches

const applyTheme = (theme: Theme) => {
  const isDark = theme === "dark" || (theme === "system" && prefersDark())

  document.documentElement.classList.toggle("dark", isDark)
}

const mediaQuery =
  typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)") : null

const handleSystemThemeChange = () => {
  const currentTheme = localStorage.getItem("theme") as Theme
  applyTheme(currentTheme || "system")
}

export function initializeTheme() {
  const savedTheme = (localStorage.getItem("theme") as Theme) || "system"

  applyTheme(savedTheme)

  // Add the event listener for system theme changes...
  if (mediaQuery) {
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange)
  }
  return () => {}
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("system")

  const updateTheme = (mode: Theme) => {
    setTheme(mode)
    localStorage.setItem("theme", mode)
    applyTheme(mode)
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null
    updateTheme(savedTheme || "system")

    if (mediaQuery) {
      return () => mediaQuery.removeEventListener("change", handleSystemThemeChange)
    }
    return () => {}
  }, [])

  return { theme, updateTheme }
}

export function FlashProvider() {
  const { flash } = usePage<SharedData>().props
  useEffect(() => {
    if (flash?.message) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(toast as any)[flash.type](flash.message)
    }
  }, [flash])
  return <Toast />
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RouterProvider navigate={(to, options) => router.visit(to, options)}>
      {children}
    </RouterProvider>
  )
}
