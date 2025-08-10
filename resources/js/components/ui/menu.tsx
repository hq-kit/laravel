import { cn } from "@/lib/utils"
import { IconCheck, IconChevronRight } from "@tabler/icons-react"
import type { CSSProperties, ComponentPropsWithRef } from "react"
import {
  Button,
  type ButtonProps,
  Collection,
  Header,
  type MenuProps,
  type MenuSectionProps,
  type MenuTriggerProps,
  PopoverContext,
  type PopoverProps,
  Menu as RACMenu,
  MenuItem as RACMenuItem,
  type MenuItemProps as RACMenuItemProps,
  MenuSection as RACMenuSection,
  MenuTrigger as RACMenuTrigger,
  SubmenuTrigger,
  composeRenderProps,
  useSlottedContext,
} from "react-aria-components"
import {
  ListBoxDetails,
  ListBoxLabel,
  ListBoxSeparator,
  headerStyle,
  itemStyle,
  sectionStyle,
} from "./list-box"
import { PopoverContent } from "./popover"

const Menu = ({ ...props }: MenuTriggerProps) => <RACMenuTrigger {...props} />

interface MenuContentProps<T>
  extends MenuProps<T>,
    Pick<
      PopoverProps,
      | "placement"
      | "offset"
      | "crossOffset"
      | "arrowBoundaryOffset"
      | "triggerRef"
      | "isOpen"
      | "onOpenChange"
      | "shouldFlip"
    > {
  className?: string
  style?: CSSProperties
  respectScreen?: boolean
}

const MenuContent = <T extends object>({
  className,
  respectScreen = true,
  ...props
}: MenuContentProps<T>) => {
  const popoverContext = useSlottedContext(PopoverContext)!
  const isSubmenuTrigger = popoverContext?.trigger === "SubmenuTrigger"
  const optimalOffset = isSubmenuTrigger ? 0 : 8
  return (
    <PopoverContent
      showArrow={false}
      respectScreen={respectScreen}
      offset={props.offset ?? optimalOffset}
      {...props}
    >
      <RACMenu
        className={cn(
          "grid max-h-[calc(var(--visual-viewport-height)-10rem)] grid-cols-[auto_1fr_auto] overflow-auto rounded-lg p-1 outline-hidden sm:max-h-[inherit] sm:min-w-40",
          className,
        )}
        {...props}
      />
    </PopoverContent>
  )
}

interface MenuItemProps extends RACMenuItemProps {
  isDestructive?: boolean
}

const MenuItem = ({ className, isDestructive = false, children, ...props }: MenuItemProps) => {
  const textValue = props.textValue || (typeof children === "string" ? children : undefined)
  return (
    <RACMenuItem
      className={composeRenderProps(className, (className) =>
        itemStyle({
          className: cn(
            isDestructive
              ? "text-destructive **:text-destructive open:bg-destructive/10 open:text-destructive focus:bg-destructive/10 focus:text-destructive focus:**:text-destructive"
              : "text-foreground",
            className,
          ),
        }),
      )}
      textValue={textValue}
      {...props}
    >
      {(values) => (
        <>
          {values.isSelected && <IconCheck className="mr-2 text-primary" data-slot="checked" />}
          {typeof children === "function" ? children(values) : children}
          {values.hasSubmenu && <IconChevronRight data-slot="chevron" className="ml-auto" />}
        </>
      )}
    </RACMenuItem>
  )
}

const MenuHeader = ({ className, ...props }: ComponentPropsWithRef<typeof Header>) => (
  <Header
    className={cn(
      "-mx-1 col-span-full mb-1 touch-none border-b px-2.5 py-2 font-semibold text-base sm:px-3 sm:pb-2.5 sm:text-sm",
      className,
    )}
    {...props}
  />
)

const MenuSection = <T extends object>({
  className,
  items,
  children,
  ...props
}: MenuSectionProps<T> & { title?: string }) => {
  return (
    <RACMenuSection className={sectionStyle()} {...props}>
      {"title" in props && <Header className={headerStyle()}>{props.title}</Header>}
      <Collection items={items}>{children}</Collection>
    </RACMenuSection>
  )
}

const MenuTrigger = (props: ButtonProps) => <Button {...props} />

const MenuLabel = ListBoxLabel
const MenuSeparator = ListBoxSeparator
const MenuDetails = ListBoxDetails

Menu.Trigger = MenuTrigger
Menu.Submenu = SubmenuTrigger
Menu.Item = MenuItem
Menu.Content = MenuContent
Menu.Header = MenuHeader
Menu.Section = MenuSection
Menu.Details = MenuDetails
Menu.Label = MenuLabel
Menu.Separator = MenuSeparator

export { Menu, MenuContent, MenuDetails, MenuItem, MenuLabel, MenuSection, MenuSeparator }
export type { MenuContentProps }
