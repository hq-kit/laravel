

import { IconMenu2 } from "@tabler/icons-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import {
  type ComponentProps,
  type CSSProperties,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react"
import { type ButtonProps, Button as RACButton } from "react-aria-components/Button"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "./button"
import { Link, type LinkProps } from "./link"
import { Separator } from "./separator"
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./sheet"
import { Skeleton } from "./skeleton"

const NAVBAR_HEIGHT = "3.5rem"
const NAVBAR_HEIGHT_MOBILE = "3rem"
const NAVBAR_GAP = "1rem"

type NavbarContextProps = {
  open: boolean
  setOpen: (open: boolean) => void
  isMobile: boolean
  toggleNavbar: () => void
}

const NavbarContext = createContext<NavbarContextProps | null>(null)

const useNavbar = () => {
  const context = useContext(NavbarContext)
  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider.")
  }

  return context
}

const NavbarProvider = ({
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  ...props
}: ComponentProps<"div"> & {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  sticky?: boolean
}) => {
  const isMobile = useIsMobile()

  // This is the internal state of the navbar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = useState(false)
  const open = openProp ?? _open
  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }
    },
    [setOpenProp, open]
  )

  // Helper to toggle the navbar.
  const toggleNavbar = useCallback(() => {
    return isMobile && setOpen((open) => !open)
  }, [isMobile, setOpen])

  const contextValue = useMemo<NavbarContextProps>(
    () => ({
      open,
      setOpen,
      isMobile,
      toggleNavbar
    }),
    [open, setOpen, isMobile, toggleNavbar]
  )

  return (
    <NavbarContext.Provider value={contextValue}>
      <div
        className={cn(
          "has-data-[variant=inset]:bg-sidebar has-data-[variant=inset]:items-center relative isolate flex w-full flex-col has-data-[variant=inset]:max-h-dvh",
          className
        )}
        style={
          {
            "--navbar-height": isMobile ? NAVBAR_HEIGHT_MOBILE : NAVBAR_HEIGHT,
            "--navbar-gap": NAVBAR_GAP,
            "--navbar-width": `calc(100% - ${NAVBAR_GAP} - ${NAVBAR_GAP})`
          } as CSSProperties
        }
        {...props}
      />
    </NavbarContext.Provider>
  )
}

const Navbar = ({
  variant = "navbar",
  fluid = false,
  container = false,
  sticky = false,
  className,
  children,
  ...props
}: ComponentProps<"div"> & {
  variant?: "navbar" | "floating" | "inset"
  sticky?: boolean
  fluid?: boolean
  container?: boolean
}) => {
  const { isMobile } = useNavbar()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let lastY = window.scrollY
    let accumulated = 0

    const onScroll = () => {
      const currentY = window.scrollY
      const diff = currentY - lastY

      accumulated += diff

      if (currentY <= 50) {
        setVisible(true)
        accumulated = 0
      } else if (accumulated > 100) {
        setVisible(false)
        accumulated = 0
      } else if (accumulated < -50) {
        setVisible(true)
        accumulated = 0
      }

      lastY = currentY
    }

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return (
    <div
      className={cn(
        "group peer text-sidebar-foreground relative z-50",
        variant === "floating"
          ? "mx-auto min-h-[calc(var(--navbar-height)+var(--navbar-gap))] w-full max-w-7xl xl:max-w-(--breakpoint-xl)"
          : "min-h-(--navbar-height)"
      )}
      data-container={container}
      data-fluid={fluid}
      data-mobile={isMobile}
      data-slot="navbar"
      data-sticky={sticky}
      data-variant={variant}
    >
      {/* This is what handles the navbar gap on desktop */}
      <div
        className={cn(
          "from-sidebar via-sidebar fixed inset-x-0 top-0 bg-linear-to-b to-transparent transition-all",
          variant === "floating" ? "h-[calc(var(--navbar-height)+var(--navbar-gap))]" : "h-(--navbar-height)",
          !sticky && !visible && "h-0"
        )}
        data-slot="navbar-gap"
      />
      <div
        className={cn(
          "bg-sidebar group-data-[variant=floating]:ring-sidebar-border fixed inset-x-0 z-30 mx-auto h-(--navbar-height) transition-all group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1",
          sticky || visible ? "translate-y-0" : "-translate-y-[calc(var(--navbar-height)+var(--navbar-gap)+1px)]",
          variant === "floating"
            ? "top-(--navbar-gap) w-(--navbar-width) max-w-7xl group-data-[fluid=true]:max-w-full xl:max-w-(--breakpoint-xl)"
            : "top-0 w-full",
          variant === "navbar" && "border-b-sidebar-border border-b",
          className
        )}
        data-slot="navbar-container"
        {...props}
      >
        <div
          className={cn(
            "mx-auto flex size-full max-w-7xl items-center overflow-hidden xl:max-w-(--breakpoint-xl)",
            isMobile ? "px-0" : "px-(--navbar-gap) group-data-[fluid=true]:px-0",
            fluid && "max-w-none xl:max-w-none"
          )}
          data-navbar="navbar"
          data-slot="navbar-inner"
        >
          {isMobile && (
            <div className="mr-2 flex items-center gap-2 p-2">
              <NavbarTrigger />
              <Separator orientation="vertical" />
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}

const NavbarTrigger = ({ className, onPress, ...props }: ComponentProps<typeof Button>) => {
  const { toggleNavbar } = useNavbar()

  return (
    <Button
      className={cn(className)}
      data-sidebar="trigger"
      data-slot="navbar-trigger"
      onPress={(e) => {
        onPress?.(e)
        toggleNavbar()
      }}
      size="icon"
      variant="ghost"
      {...props}
    >
      <IconMenu2 />
      <span className="sr-only">Toggle Navbar</span>
    </Button>
  )
}

const NavbarInset = ({ className, ...props }: ComponentProps<"main">) => (
  <main
    className={cn(
      "bg-background relative mx-auto flex min-h-[calc(100vh-(var(--navbar-height)+var(--navbar-gap)))] flex-col overflow-auto peer-data-[variant=floating]:min-h-[calc(100vh-(var(--navbar-height)+var(--navbar-gap)))] md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:mt-0! md:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm",
      "w-[calc(100%-var(--navbar-gap))] peer-data-[container=true]:max-w-7xl peer-data-[variant=default]:w-full xl:peer-data-[container=true]:max-w-(--breakpoint-xl)",
      className
    )}
    data-slot="navbar-inset"
    {...props}
  />
)

const NavbarHeader = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn("sticky left-0 z-10 flex items-center gap-2 p-2", className)}
    data-navbar="header"
    data-slot="navbar-header"
    {...props}
  />
)

const NavbarActions = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn("ml-auto inline-flex items-center gap-2 p-2", className)}
    data-navbar="actions"
    data-slot="navbar-actions"
    {...props}
  />
)

const NavbarSeparator = ({ className, ...props }: ComponentProps<typeof Separator>) => (
  <Separator
    className={cn("bg-sidebar-border mx-2 h-full w-px", className)}
    data-navbar="separator"
    data-slot="sidebar-separator"
    {...props}
  />
)

const NavbarContent = ({ className, ...props }: ComponentProps<"div">) => {
  const { isMobile, open, setOpen } = useNavbar()
  if (isMobile) {
    return (
      <SheetContent
        className="bg-sidebar text-sidebar-foreground p-0 [&>button]:hidden"
        isOpen={open}
        onOpenChange={setOpen}
        {...props}
        data-navbar="navbar"
        position="left"
      >
        <SheetHeader className="sr-only p-0!">
          <SheetTitle>Navbar</SheetTitle>
          <SheetDescription>Displays the mobile navbar.</SheetDescription>
        </SheetHeader>
          <div className="flex h-full w-full flex-col">{props.children}</div>
      </SheetContent>
    )
  }
  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 scrollbar-none gap-0 overflow-auto",
        "scroll-fade-r mr-12 flex-row items-center",
        "in-data-[slot=sheet-content]:mr-0 in-data-[slot=sheet-content]:flex-col in-data-[slot=sheet-content]:items-start",
        className
      )}
      data-navbar="content"
      data-slot="navbar-content"
      {...props}
    />
  )
}

const NavbarGroup = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "relative flex flex-row p-2 in-data-[slot=sheet-content]:w-full in-data-[slot=sheet-content]:min-w-0 in-data-[slot=sheet-content]:flex-col",
      className
    )}
    data-navbar="group"
    data-slot="navbar-group"
    {...props}
  />
)

const NavbarGroupContent = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "flex flex-row text-sm in-data-[slot=sheet-content]:w-full in-data-[slot=sheet-content]:min-w-0 in-data-[slot=sheet-content]:flex-col",
      className
    )}
    data-navbar="group-content"
    data-slot="navbar-group-content"
    {...props}
  />
)

const NavbarMenu = ({ className, ...props }: ComponentProps<"ul">) => (
  <ul
    className={cn(
      "flex flex-row gap-2 in-data-[slot=sheet-content]:w-full in-data-[slot=sheet-content]:min-w-0 in-data-[slot=sheet-content]:flex-col",
      className
    )}
    data-navbar="menu"
    data-slot="navbar-menu"
    {...props}
  />
)

const NavbarMenuItem = ({ className, ...props }: ComponentProps<"li">) => (
  <li
    className={cn("group/menu-item relative", className)}
    data-navbar="menu-item"
    data-slot="navbar-menu-item"
    {...props}
  />
)

const navbarMenuButtonVariants = cva(
  "ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:font-medium [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background hover:bg-sidebar-accent hover:text-sidebar-accent-foreground shadow-[0_0_0_1px_var(--sidebar-border)] hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

const NavbarMenuButton = ({
  isActive = false,
  variant = "default",
  size = "default",
  className,
  ...props
}: Omit<LinkProps, "className" | "slot" | "ref"> &
  ButtonProps & {
    isActive?: boolean
  } & VariantProps<typeof navbarMenuButtonVariants>) => {
  const Comp = "href" in props ? Link : RACButton

  return (
    <Comp
      className={cn(navbarMenuButtonVariants({ variant, size }), className)}
      {...(isActive && { "data-active": "true" })}
      data-navbar="menu-button"
      data-size={size}
      data-slot="navbar-menu-button"
      type="button"
      {...props}
    />
  )
}

const NavbarMenuSkeleton = ({
  className,
  showIcon = false,
  ...props
}: ComponentProps<"div"> & {
  showIcon?: boolean
}) => {
  // Random width between 50 to 90%.
  const width = useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      data-navbar="menu-skeleton"
      data-slot="navbar-menu-skeleton"
      {...props}
    >
      {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width
          } as CSSProperties
        }
      />
    </div>
  )
}

const NavbarMenuSub = ({ className, ...props }: ComponentProps<"ul">) => {
  return (
    <ul
      className={cn(
        "border-sidebar-border mx-3.5 flex translate-x-px flex-row gap-1 border-l px-2.5 py-0.5 group-data-[collapsible=icon]:hidden in-data-[slot=sheet-content]:w-full in-data-[slot=sheet-content]:min-w-0 in-data-[slot=sheet-content]:flex-col",
        className
      )}
      data-navbar="menu-sub"
      data-slot="navbar-menu-sub"
      {...props}
    />
  )
}

const NavbarMenuSubItem = ({ className, ...props }: ComponentProps<"li">) => {
  return (
    <li
      className={cn("group/menu-sub-item relative", className)}
      data-navbar="menu-sub-item"
      data-slot="navbar-menu-sub-item"
      {...props}
    />
  )
}

const NavbarMenuSubButton = ({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: ComponentProps<typeof Link> & {
  asChild?: boolean
  size?: "sm" | "md"
  isActive?: boolean
}) => (
  <Link
    className={cn(
      "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden group-data-[collapsible=icon]:hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[size=md]:text-sm data-[size=sm]:text-xs [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
      className
    )}
    {...(isActive && { "data-active": "true" })}
    data-sidebar="menu-sub-button"
    data-size={size}
    data-slot="sidebar-menu-sub-button"
    {...props}
  />
)

Navbar.Provider = NavbarProvider
Navbar.Content = NavbarContent
Navbar.Group = NavbarGroup
Navbar.GroupContent = NavbarGroupContent
Navbar.Header = NavbarHeader
Navbar.Actions = NavbarActions
Navbar.Inset = NavbarInset
Navbar.Menu = NavbarMenu
Navbar.MenuButton = NavbarMenuButton
Navbar.MenuItem = NavbarMenuItem
Navbar.MenuSkeleton = NavbarMenuSkeleton
Navbar.MenuSub = NavbarMenuSub
Navbar.MenuSubButton = NavbarMenuSubButton
Navbar.MenuSubItem = NavbarMenuSubItem
Navbar.Separator = NavbarSeparator
Navbar.Trigger = NavbarTrigger

export {
  Navbar,
  NavbarActions,
  NavbarContent,
  NavbarGroup,
  NavbarGroupContent,
  NavbarHeader,
  NavbarInset,
  NavbarMenu,
  NavbarMenuButton,
  NavbarMenuItem,
  NavbarMenuSkeleton,
  NavbarMenuSub,
  NavbarMenuSubButton,
  NavbarMenuSubItem,
  NavbarProvider,
  NavbarSeparator,
  NavbarTrigger,
  useNavbar
}
