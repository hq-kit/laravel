

import type { VariantProps } from "class-variance-authority"
import type { ComponentProps, ReactNode } from "react"
import { IconCheck, IconSearch, IconSelector } from "@tabler/icons-react"
import { cn } from "cn"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { Header } from "react-aria-components/Header"
import { SearchField } from "react-aria-components/SearchField"
import {
  Button,
  Collection,
  type Key,
  ListBox,
  ListBoxItem,
  type ListBoxProps,
  ListBoxSection,
  type ListBoxSectionProps,
  Popover,
  type PopoverProps,
  Select as RACSelect,
  SelectValue as RACSelectValue,
  type SelectProps,
  type SelectValueProps
} from "react-aria-components/Select"
import { Separator } from "react-aria-components/Separator"
import { Autocomplete } from "./autocomplete"
import { fieldVariants } from "./field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input"

const Select = <T extends object, M extends "single" | "multiple" = "single">({
  className,
  orientation = "vertical",
  ...props
}: SelectProps<T, M> & VariantProps<typeof fieldVariants>) => {
  return (
    <RACSelect
      className={composeRenderProps(className, (className) => cn(fieldVariants({ orientation }), className))}
      data-orientation={orientation}
      data-slot="field"
      {...props}
    >
      {(values) => (typeof props.children === "function" ? props.children(values) : props.children)}
    </RACSelect>
  )
}

const SelectValue = <T extends object>({ className, children, ...props }: SelectValueProps<T>) => (
  <RACSelectValue
    className={cn("data-placeholder:text-muted-foreground flex flex-1 text-left", className)}
    data-slot="select-value"
    {...props}
  >
    {typeof children === "function"
      ? children
      : ({ selectedItems, selectedText, defaultChildren }) =>
          selectedItems.length > 1 ? selectedText : defaultChildren}
  </RACSelectValue>
)

const SelectTrigger = ({
  className,
  size = "default",
  children,
  ...props
}: Omit<ComponentProps<typeof Button>, "children"> & {
  children?: ReactNode
  size?: "sm" | "default"
}) => (
  <Button
    className={cn(
      "border-input focus-visible:border-ring focus-visible:ring-ring/50 data-placeholder:text-muted-foreground group-data-invalid/field:border-destructive group-data-invalid/field:ring-destructive/20 dark:bg-input/30 dark:group-data-invalid/field:border-destructive/50 dark:group-data-invalid/field:ring-destructive/40 dark:hover:bg-input/50 flex w-full items-center justify-between gap-1.5 rounded-lg border bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none group-data-invalid/field:ring-3 focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    data-size={size}
    data-slot="select-trigger"
    slot="control"
    {...props}
  >
    {children}
    <IconSelector className="text-muted-foreground pointer-events-none size-4" />
  </Button>
)

const SelectContent = <T extends object>({
  placement = "bottom",
  className,
  offset = 4,
  crossOffset = 0,
  isSearchable = false,
  ...props
}: ListBoxProps<T> &
  Pick<PopoverProps, "placement" | "offset" | "crossOffset"> & {
    isSearchable?: boolean
  }) => (
  <Popover
    className="data-exiting:fade-out-0 data-entering:fade-in-0 data-exiting:zoom-out-95 data-entering:zoom-in-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 bg-popover text-popover-foreground ring-foreground/10 data-entering:animate-in data-exiting:animate-out relative isolate z-50 grid w-(--trigger-width) min-w-20 origin-(--trigger-anchor-point) grid-rows-[auto_1fr] overflow-hidden rounded-lg shadow-md ring-1 duration-100"
    crossOffset={crossOffset}
    data-slot="select-content"
    offset={offset}
    placement={placement}
  >
    {isSearchable ? (
      <Autocomplete>
        <SearchField aria-label="Search" autoFocus className="p-1 pb-0" data-slot="select-input-wrapper">
          <InputGroup>
            <InputGroupInput className="[&::-webkit-search-cancel-button]:hidden" data-slot="select-input" />
            <InputGroupAddon>
              <IconSearch className="size-4 shrink-0 opacity-50" />
            </InputGroupAddon>
          </InputGroup>
        </SearchField>
        <ListBox
          className={cn(
            "group/select-list max-h-[inherit] overflow-x-hidden overflow-y-auto p-1 outline-hidden has-data-[slot=select-group]:p-0",
            className
          )}
          data-slot="select-list"
          {...props}
        />
      </Autocomplete>
    ) : (
      <ListBox
        className={cn(
          "group/select-list max-h-[inherit] overflow-x-hidden overflow-y-auto p-1 outline-hidden has-data-[slot=select-group]:p-0",
          className
        )}
        data-slot="select-list"
        {...props}
      />
    )}
  </Popover>
)

const SelectGroup = <T extends object>({ title, children, ...props }: ListBoxSectionProps<T> & { title?: string }) => (
  <ListBoxSection className={cn("scroll-my-1 p-1", props.className)} data-slot="select-group" {...props}>
    {title && (
      <Header className="text-muted-foreground px-1.5 py-1 text-xs" data-slot="select-label">
        {title}
      </Header>
    )}
    <Collection items={props.items}>{children}</Collection>
  </ListBoxSection>
)
const SelectItem = ({ className, children, ...props }: ComponentProps<typeof ListBoxItem>) => {
  const textValue = typeof children === "string" ? children : props.textValue
  return (
    <ListBoxItem
      className={cn(
        "focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-focused:bg-accent data-focused:text-accent-foreground relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      data-slot="select-item"
      textValue={textValue}
      {...props}
    >
      {composeRenderProps(children, (children, { isSelected }) => (
        <>
          <span className="flex flex-1 shrink-0 items-center gap-2 whitespace-nowrap">{children}</span>
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
            {isSelected ? <IconCheck className="pointer-events-none" /> : null}
          </span>
        </>
      ))}
    </ListBoxItem>
  )
}

const SelectSeparator = ({ className, ...props }: ComponentProps<typeof Separator>) => (
  <Separator
    className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
    data-slot="select-separator"
    {...props}
  />
)

const SelectEmpty = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "text-muted-foreground hidden w-full justify-center py-2 text-center text-sm group-data-empty/select-list:flex",
      className
    )}
    data-slot="select-empty"
    {...props}
  />
)

Select.Content = SelectContent
Select.Group = SelectGroup
Select.Item = SelectItem
Select.Separator = SelectSeparator
Select.Trigger = SelectTrigger
Select.Value = SelectValue
Select.Empty = SelectEmpty

export type { Key }
export { Select, SelectContent, SelectEmpty, SelectGroup, SelectItem, SelectSeparator, SelectTrigger, SelectValue }
