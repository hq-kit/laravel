import { IconMenu } from "@tabler/icons-react"
import {
  type ComponentPropsWithRef,
  createContext,
  type Ref,
  use,
  useCallback,
  useMemo,
  useState,
} from "react"
import type { ButtonProps, LinkProps } from "react-aria-components"
import { composeRenderProps, Link } from "react-aria-components"
import { useIsMobile } from "@/lib/hooks"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Sheet } from "./sheet"

const HEIGHT = "3.5rem"

type NavbarOptions = {
  isSticky?: boolean
  variant?: "default" | "float" | "inset"
}

type NavbarContextProps = {
  open: boolean
  setOpen: (open: boolean) => void
  isCompact: boolean
  toggleNavbar: () => void
} & NavbarOptions

const NavbarContext = createContext<NavbarContextProps | null>(null)

function useNavbar() {
  const context = use(NavbarContext)
  if (!context) {
    throw new Error("useNavbar must be used within a Navbar.")
  }

  return context
}

interface NavbarProps extends ComponentPropsWithRef<"header">, NavbarOptions {
  defaultOpen?: boolean
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const Navbar = ({
  children,
  isOpen: openProp,
  onOpenChange: setOpenProp,
  defaultOpen = false,
  className,
  isSticky = false,
  variant = "default",
  ...props
}: NavbarProps) => {
  const isCompact = useIsMobile()
  const [_open, _setOpen] = useState(defaultOpen)
  const open = openProp ?? _open

  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      if (setOpenProp) {
        return setOpenProp?.(typeof value === "function" ? value(open) : value)
      }

      _setOpen(value)
    },
    [setOpenProp, open],
  )

  const toggleNavbar = useCallback(() => {
    setOpen((open) => !open)
  }, [setOpen])

  const contextValue = useMemo<NavbarContextProps>(
    () => ({
      open,
      setOpen,
      isCompact,
      toggleNavbar,
      variant,
      isSticky,
    }),
    [open, setOpen, isCompact, toggleNavbar, variant, isSticky],
  )
  return (
    <NavbarContext value={contextValue}>
      <header
        data-navbar-variant={variant}
        style={{
          // @ts-ignore
          "--navbar-height": HEIGHT,
        }}
        className={cn(
          "group/navbar [--navbar-breadcrumbs-height:0px] has-data-navbar-breadcrumbs:[--navbar-breadcrumbs-height:3rem]",
          "relative isolate flex w-full flex-col",
          isSticky && "sticky top-0 z-50",
          variant === "float" && "px-2.5 pt-2",
          variant === "inset" && "min-h-dvh bg-sidebar",
          className,
        )}
        {...props}
      >
        {children}
      </header>
    </NavbarContext>
  )
}

interface NavbarNavProps extends ComponentPropsWithRef<"div"> {
  variant?: "navbar" | "float" | "inset"
  isSticky?: boolean
  useDefaultResponsive?: boolean
}

const NavbarNav = ({
  useDefaultResponsive = true,
  className,
  ref,
  children,
  ...props
}: NavbarNavProps) => {
  const { isCompact, variant, open, setOpen } = useNavbar()

  if (isCompact && useDefaultResponsive) {
    return (
      <Sheet isOpen={open} onOpenChange={setOpen} {...props}>
        <Sheet.Trigger className="sr-only" />
        <Sheet.Content side="left" aria-label="Compact Navbar" data-navbar="compact">
          <Sheet.Body className="px-2 md:px-4">{children}</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    )
  }

  return (
    <div
      data-navbar-nav="true"
      ref={ref}
      className={cn(
        "group peer hidden w-full items-center px-4 md:flex md:px-0",
        "h-(--navbar-height)",
        "[&>div]:mx-auto [&>div]:w-full [&>div]:max-w-7xl [&>div]:items-center md:[&>div]:flex lg:[&>div]:max-w-(--breakpoint-xl) 2xl:[&>div]:max-w-(--breakpoint-2xl)",
        variant === "float" &&
          "mx-auto w-full max-w-7xl rounded-lg border border-sidebar-border bg-sidebar px-4 text-sidebar-foreground md:px-6 lg:max-w-(--breakpoint-xl) lg:px-8 2xl:max-w-(--breakpoint-2xl)",
        variant === "default" &&
          "border-sidebar-border border-b bg-sidebar text-sidebar-foreground sm:[&>div]:px-6 lg:[&>div]:px-8",
        variant === "inset" &&
          "mx-auto md:px-6 [&>div]:mx-auto [&>div]:w-full [&>div]:items-center md:[&>div]:flex",
        className,
      )}
      {...props}
    >
      <div>{children}</div>
    </div>
  )
}

interface NavbarTriggerProps extends ButtonProps {
  ref?: Ref<HTMLButtonElement>
}

const NavbarTrigger = ({ className, onPress, ref, ...props }: NavbarTriggerProps) => {
  const { toggleNavbar } = useNavbar()
  return (
    <Button
      ref={ref}
      data-navbar-trigger="true"
      variant="ghost"
      aria-label={props["aria-label"] || "Toggle Navbar"}
      icon
      className={className}
      onPress={(event) => {
        onPress?.(event)
        toggleNavbar()
      }}
      {...props}
    >
      <IconMenu />
      <span className="sr-only">Toggle Navbar</span>
    </Button>
  )
}

const NavbarSection = ({ className, ...props }: ComponentPropsWithRef<"div">) => {
  const { isCompact } = useNavbar()
  return (
    <div
      data-navbar-section
      className={cn(
        "flex",
        isCompact ? "flex-col gap-y-1" : "flex-row items-center gap-x-3",
        className,
      )}
      {...props}
    >
      {"title" in props && (
        <h4 className="-mx-2 my-4 px-5 font-medium text-sm md:hidden">{props.title}</h4>
      )}
      {props.children}
    </div>
  )
}

interface NavbarItemProps extends LinkProps {
  isCurrent?: boolean
}

const NavbarItem = ({ className, isCurrent, ...props }: NavbarItemProps) => (
  <Link
    data-navbar-item
    aria-current={isCurrent ? "page" : undefined}
    className={composeRenderProps(className, (className) =>
      cn(
        "relative flex cursor-pointer items-center gap-x-2 rounded-md px-3 py-2 text-muted-foreground no-underline outline-hidden transition-colors md:text-sm",
        "**:data-[slot=chevron]:size-4 **:data-[slot=chevron]:transition-transform",
        "*:[svg]:-mx-0.5 *:[svg]:size-4 *:[svg]:shrink-0",
        "pressed:text-sidebar-primary hover:text-sidebar-primary focus:text-sidebar-primary focus-visible:ring-2 focus-visible:ring-sidebar-ring/50 disabled:cursor-default disabled:opacity-50 pressed:**:data-[slot=chevron]:rotate-180",
        isCurrent &&
          "pointer-events-none cursor-default bg-sidebar-accent text-sidebar-accent-foreground",
        className,
      ),
    )}
    {...props}
  />
)

const NavbarLogo = ({ className, ...props }: LinkProps) => {
  return (
    <Link
      className={composeRenderProps(className, (className) =>
        cn(
          "relative flex items-center gap-x-2 px-2 py-4 text-sidebar-foreground focus:outline-hidden focus-visible:outline-1 focus-visible:outline-sidebar-ring md:mr-4 md:px-0 md:py-0",
          className,
        ),
      )}
      {...props}
    />
  )
}

const NavbarFlex = ({ className, ref, ...props }: ComponentPropsWithRef<"div">) => {
  return <div ref={ref} className={cn("flex items-center gap-2", className)} {...props} />
}

interface NavbarCompactProps extends ComponentPropsWithRef<"div"> {
  variant?: "float" | "inset" | "navbar"
}

const NavbarCompact = ({ className, ref, ...props }: NavbarCompactProps) => {
  const { variant } = useNavbar()
  return (
    <div
      ref={ref}
      className={cn(
        "flex justify-between bg-sidebar text-sidebar-foreground peer-has-[[data-navbar-variant=float]]:border peer-has-[[data-navbar-variant=float]]:border-sidebar-border md:hidden",
        variant === "float" && "h-12 rounded-lg border px-3.5",
        variant === "inset" && "h-14 border-b px-4",
        variant === "default" && "h-14 border-b px-4",
        className,
      )}
      {...props}
    />
  )
}

const NavbarBreadcrumbs = ({
  className,
  ref,
  children,
  ...props
}: ComponentPropsWithRef<"div">) => {
  const { variant } = useNavbar()
  return (
    <div
      data-navbar-breadcrumbs={true}
      ref={ref}
      className={cn(
        "flex h-(--navbar-breadcrumbs-height) items-center",
        variant === "default" &&
          "w-full border-sidebar-border border-b bg-sidebar text-sidebar-foreground *:max-w-7xl *:px-4 md:*:px-6 lg:*:max-w-(--breakpoint-xl) 2xl:*:max-w-(--breakpoint-2xl)",
        variant === "inset" &&
          "w-full rounded-lg rounded-b-none border-sidebar-border border-b px-4 md:mx-auto md:max-w-[calc(100vw-16px)] md:border md:px-6",
        variant === "float" &&
          "mx-auto w-full max-w-7xl rounded-lg bg-background px-2 text-foreground md:px-4 lg:max-w-(--breakpoint-xl) 2xl:max-w-(--breakpoint-2xl)",
        className,
      )}
      {...props}
    >
      <div className="mx-auto w-full">{children}</div>
    </div>
  )
}

const NavbarInset = ({ className, ref, ...props }: ComponentPropsWithRef<"div">) => {
  const { variant } = useNavbar()
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full flex-col overflow-auto",
        variant === "default" &&
          "max-h-[calc(100vh-var(--navbar-height,0px)-var(--navbar-breadcrumbs-height,0px)-8px)]",
        variant === "inset" &&
          "max-h-[calc(100vh-var(--navbar-height,0px)-var(--navbar-breadcrumbs-height,0px))] overflow-auto bg-background pb-2 md:px-2",
        variant === "float" &&
          "h-[calc(100vh-var(--navbar-height,0px)-var(--navbar-breadcrumbs-height,0px)-8px)] bg-background pb-2 md:px-0",
        className,
      )}
    >
      <main
        className={cn(
          "mx-auto flex size-full flex-1 grow flex-col",
          variant === "inset" &&
            "max-h-fit overflow-auto border-sidebar-border bg-background px-4 shadow-sm md:rounded-lg md:border md:group-has-data-navbar-breadcrumbs/navbar:rounded-t-none md:group-has-data-navbar-breadcrumbs/navbar:border-t-0",
          variant === "default" && "overflow-auto",
          variant === "float" &&
            "max-w-7xl lg:max-w-(--breakpoint-xl) 2xl:max-w-(--breakpoint-2xl)",
        )}
      >
        {props.children}
      </main>
    </div>
  )
}

Navbar.Nav = NavbarNav
Navbar.Inset = NavbarInset
Navbar.Compact = NavbarCompact
Navbar.Flex = NavbarFlex
Navbar.Trigger = NavbarTrigger
Navbar.Logo = NavbarLogo
Navbar.Item = NavbarItem
Navbar.Breadcrumbs = NavbarBreadcrumbs
Navbar.Section = NavbarSection

export { Navbar, NavbarBreadcrumbs, NavbarInset }
