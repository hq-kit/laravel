import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { type ComponentProps, useSyncExternalStore } from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  Tab as RACTab,
  TabList as RACTabList,
  TabPanel as RACTabPanel,
  TabPanels as RACTabPanels,
  Tabs as RACTabs,
  SelectionIndicator,
  type TabListProps,
  type TabPanelProps,
  type TabPanelsProps,
  type TabProps,
  type TabsProps
} from "react-aria-components/Tabs"
import { Link, type LinkProps } from "./link"

const Tabs = ({ className, ...props }: TabsProps) => (
  <RACTabs
    className={composeRenderProps(className, (className) =>
      cn(
        "group/tabs flex gap-4 self-start data-[orientation=horizontal]:flex-col data-[orientation=vertical]:w-full data-[orientation=vertical]:flex-row",
        className
      )
    )}
    data-slot="tabs"
    {...props}
  />
)
const tabsListVariants = cva(
  "group/tabs-list text-muted-foreground flex w-fit [scrollbar-width:none] scrollbar-none items-center justify-center overflow-auto rounded-lg p-[3px] [-ms-overflow-style:none] data-[orientation=vertical]:flex-col data-[variant=line]:rounded-none [&::-webkit-scrollbar]:hidden",
  {
    variants: {
      variant: {
        fill: "bg-muted",
        line: "gap-1 bg-transparent"
      }
    },
    defaultVariants: {
      variant: "fill"
    }
  }
)

const TabsList = <T extends object>({
  className,
  variant,
  ...props
}: TabListProps<T> & VariantProps<typeof tabsListVariants>) => (
  <RACTabList
    className={composeRenderProps(className, (className) => cn(tabsListVariants({ variant }), className))}
    data-slot="tabs-list"
    data-variant={variant}
    {...props}
  />
)

function subscribeToHydration() {
  return () => {}
}
const TabsTrigger = ({ className, ...props }: TabProps) => {
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  )
  return (
    <RACTab
      className={composeRenderProps(className, (className) =>
        cn(
          "group/tab text-foreground/60 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground relative isolate inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap outline-hidden transition-[colors] group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          "data-selected:text-foreground dark:data-selected:text-foreground group-data-[variant=line]/tabs-list:bg-transparent",
          "href" in props ? "cursor-pointer" : "cursor-default",
          className
        )
      )}
      data-slot="tabs-trigger"
      render={(domProps) =>
        "href" in props ? <Link {...(domProps as LinkProps)} /> : <div {...(domProps as ComponentProps<"div">)} />
      }
      {...props}
    >
      {(values) => (
        <>
          {typeof props.children === "function" ? props.children(values) : props.children}
          {isHydrated && (
            <SelectionIndicator
              className={cn(
                "absolute top-0 left-0 -z-1 size-full rounded-[inherit] border data-entering:opacity-100 data-exiting:opacity-0 motion-safe:transition-[translate,width,color,height,opacity]",
                "bg-background dark:border-input dark:bg-input/30",
                "group-focus-visible/tab:border-ring group-focus-visible/tab:ring-ring/50 group-focus-visible/tab:ring-[3px]",
                "group-data-[variant=line]/tabs-list:border-transparent group-data-[variant=line]/tabs-list:bg-transparent dark:group-data-[variant=line]/tabs-list:border-transparent dark:group-data-[variant=line]/tabs-list:bg-transparent",
                "group-data-[variant=fill]/tabs-list:shadow-sm group-data-[variant=line]/tabs-list:shadow-none",
                "after:bg-foreground after:absolute after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:-bottom-1.25 group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:after:opacity-100"
              )}
              data-slot="selected-indicator"
            />
          )}
        </>
      )}
    </RACTab>
  )
}

const TabsContents = <T extends object>({ className, ...props }: TabPanelsProps<T>) => (
  <RACTabPanels
    {...props}
    className={cn("relative h-(--tab-panel-height) flex-1 outline-none motion-safe:transition-[height]", className)}
  />
)

const TabsContent = ({ className, ...props }: TabPanelProps) => (
  <RACTabPanel
    className={composeRenderProps(className, (className) => cn("flex-1 text-sm outline-none", className))}
    data-slot="tabs-content"
    {...props}
  />
)

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Contents = TabsContents
Tabs.Content = TabsContent

export { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger }
