import type { ComponentProps, CSSProperties, HTMLAttributes } from "react"
import { IconCheck, IconLoader, IconSearch } from "@tabler/icons-react"
import { cn } from "cn"
import { Button } from "react-aria-components/Button"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  Collection,
  Header,
  Menu,
  MenuItem,
  type MenuItemProps,
  type MenuProps,
  MenuSection,
  type MenuSectionProps,
  Separator,
  type SeparatorProps
} from "react-aria-components/Menu"
import { Input, SearchField, type SearchFieldProps } from "react-aria-components/SearchField"
import { Autocomplete } from "./autocomplete"
import { Dialog } from "./dialog"
import { InputGroup, InputGroupAddon } from "./input"
import { Link, type LinkProps } from "./link"

const Command = ({
  className,
  dir,
  style,
  ...props
}: Omit<ComponentProps<typeof Autocomplete>, "className" | "style"> & {
  className?: string
  dir?: HTMLAttributes<HTMLDivElement>["dir"]
  style?: CSSProperties
}) => (
  <div
    className={cn(
      "bg-popover text-popover-foreground flex size-full flex-col overflow-hidden rounded-xl! p-1",
      className
    )}
    data-slot="command"
    dir={dir}
    style={style}
  >
    <Autocomplete {...props} />
  </div>
)

const CommandDialog = ({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  overlayClassName,
  commandProps,
  ...props
}: ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
  overlayClassName?: string
} & { commandProps?: Partial<ComponentProps<typeof Command>> }) => (
  <Dialog {...props}>
    <Button className="sr-only" />
    <Dialog.Header className="sr-only">
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Description>{description}</Dialog.Description>
    </Dialog.Header>
    <Dialog.Content
      className={cn("top-1/3 translate-y-0 overflow-hidden rounded-xl! p-0", className)}
      overlayClassName={overlayClassName}
      showCloseButton={showCloseButton}
    >
      <Command {...commandProps}>{children}</Command>
    </Dialog.Content>
  </Dialog>
)

const CommandInput = ({
  className,
  isPending,
  ...props
}: SearchFieldProps & { isPending?: boolean; placeholder?: string }) => (
  <SearchField
    aria-label={props.placeholder || "Search"}
    className="p-1 pb-0"
    data-slot="command-input-wrapper"
    {...props}
  >
    <InputGroup className="bg-input/30 border-input/30 h-8! rounded-lg! shadow-none! *:data-[slot=input-group-addon]:pl-2!">
      <Input
        className={cn(
          "w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-search-cancel-button]:hidden",
          className
        )}
        data-slot="command-input"
      />
      <InputGroupAddon>
        {isPending ? (
          <IconLoader
            aria-label="Loading"
            className="size-4 shrink-0 animate-spin opacity-50"
            data-slot="loader"
            role="status"
          />
        ) : (
          <IconSearch className="size-4 shrink-0 opacity-50" />
        )}
      </InputGroupAddon>
    </InputGroup>
  </SearchField>
)

const CommandList = <T extends object>({ className, ...props }: MenuProps<T>) => (
  <Menu
    {...props}
    className={cn("no-scrollbar max-h-72 flex-1 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none", className)}
    data-slot="command-list"
  />
)

const CommandEmpty = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("py-6 text-center text-sm", className)} data-slot="command-empty" {...props} />
)

const CommandGroup = <T extends object>({ className, title, ...props }: MenuSectionProps<T> & { title?: string }) => (
  <MenuSection
    className={cn(
      "text-foreground **:[[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium",
      className
    )}
    data-slot="command-group"
  >
    {title && (
      <Header className="pointer-events-none" cmdk-group-heading="" data-slot="title">
        {title}
      </Header>
    )}
    <Collection items={props.items}>{props.children}</Collection>
  </MenuSection>
)

const CommandSeparator = ({ className, ...props }: SeparatorProps) => (
  <Separator className={cn("bg-border -mx-1 h-px", className)} data-slot="command-separator" {...props} />
)

const CommandItem = <T extends object>({ className, children, textValue, ...props }: MenuItemProps<T>) => (
  <MenuItem
    {...props}
    className={cn(
      "data-selected:bg-accent data-selected:text-accent-foreground data-selected:*:[svg]:text-accent-foreground data-focused:bg-accent data-focused:text-accent-foreground data-focused:*:[svg]:text-accent-foreground group/command-item relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-lg! data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    data-slot="command-item"
    render={(domProps) =>
      "href" in props ? <Link {...(domProps as LinkProps)} /> : <div {...(domProps as ComponentProps<"div">)} />
    }
    textValue={textValue || (typeof children === "string" ? children : undefined)}
  >
    {composeRenderProps(children, (children) => (
      <>
        {children}
        <IconCheck className="ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" />
      </>
    ))}
  </MenuItem>
)

const CommandShortcut = ({ className, ...props }: ComponentProps<"span">) => (
  <span
    className={cn(
      "text-muted-foreground group-data-selected/command-item:text-foreground group-data-focused/command-item:text-foreground ml-auto text-xs tracking-widest",
      className
    )}
    data-slot="command-shortcut"
    {...props}
  />
)

Command.Dialog = CommandDialog
Command.Input = CommandInput
Command.List = CommandList
Command.Empty = CommandEmpty
Command.Group = CommandGroup
Command.Item = CommandItem
Command.Shortcut = CommandShortcut
Command.Separator = CommandSeparator

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
}
