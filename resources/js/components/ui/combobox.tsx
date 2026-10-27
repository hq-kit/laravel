

import type { VariantProps } from "class-variance-authority"
import { IconCheck, IconChevronDown, IconX } from "@tabler/icons-react"
import { cn } from "cn"
import { type ComponentProps, use } from "react"
import {
  Collection,
  ComboBox,
  type ComboBoxProps,
  ComboBoxStateContext,
  ComboBoxValue,
  Input,
  ListBox,
  ListBoxItem,
  type ListBoxItemProps,
  type ListBoxProps,
  ListBoxSection,
  type ListBoxSectionProps,
  Popover,
  type PopoverProps
} from "react-aria-components/ComboBox"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { Group } from "react-aria-components/Group"
import { Header } from "react-aria-components/Header"
import { Separator, type SeparatorProps } from "react-aria-components/Separator"
import { TagGroup, TagList, type TagListProps, type TagProps } from "react-aria-components/TagGroup"
import { Tag } from "@/components/ui/tag"
import { fuzzy } from "./autocomplete"
import { Button } from "./button"
import { fieldVariants } from "./field"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./input"

const Combobox = <T extends object, M extends "single" | "multiple" = "single">({
  className,
  orientation = "vertical",
  ...props
}: ComboBoxProps<T, M> & VariantProps<typeof fieldVariants>) => (
  <ComboBox
    className={composeRenderProps(className, (className) => cn(fieldVariants({ orientation }), className))}
    data-orientation={orientation}
    defaultFilter={fuzzy}
    menuTrigger="focus"
    {...props}
  />
)

const ComboboxClear = ({ className, ...props }: ComponentProps<typeof InputGroupButton>) => {
  const state = use(ComboBoxStateContext)
  if (state?.inputValue === "") {
    return null
  }

  return (
    <InputGroupButton
      aria-label="Clear"
      className={cn(className)}
      data-slot="combobox-clear"
      onPress={() => {
        state?.setValue(null)
      }}
      size="icon-xs"
      slot={null}
      variant="ghost"
      {...props}
    >
      <IconX className="pointer-events-none" />
    </InputGroupButton>
  )
}

const ComboboxInput = ({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComponentProps<"input"> & {
  showTrigger?: boolean
  showClear?: boolean
}) => (
  <InputGroup className={cn("w-auto", className)}>
    <InputGroupInput disabled={disabled} {...props} />
    <InputGroupAddon align="inline-end">
      {showTrigger && (
        <InputGroupButton
          className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent [&_svg:not([class*='size-'])]:size-4"
          data-slot="combobox-trigger"
          isDisabled={disabled}
          size="icon-xs"
          variant="ghost"
        >
          <IconChevronDown className="text-muted-foreground pointer-events-none size-4" />
        </InputGroupButton>
      )}
      {showClear && <ComboboxClear isDisabled={disabled} />}
    </InputGroupAddon>
    {children}
  </InputGroup>
)

const ComboboxChips = <T extends object>(props: TagListProps<T> & { isDisabled?: boolean }) => {
  const state = use(ComboBoxStateContext)
  return (
    <Group
      className="dark:bg-input/30 border-input focus-within:border-ring focus-within:ring-ring/50 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive dark:has-aria-invalid:border-destructive/50 flex min-h-8 flex-wrap items-center gap-1 rounded-lg border bg-transparent bg-clip-padding py-1 pr-1 pl-2.5 text-sm transition-colors focus-within:ring-3 has-aria-invalid:ring-3 has-data-[slot=combobox-chip]:px-1"
      data-slot="combobox-chips"
      slot="control"
    >
      <ComboBoxValue<T> className="contents">
        {({ selectedItems, state }) => (
          <TagGroup
            aria-label="Items"
            className={cn("contents", props.className)}
            data-slot="combobox-chip-list"
            onRemove={(keys) => {
              if (Array.isArray(state.value)) {
                state.setValue(state.value.filter((k) => !keys.has(k)))
              }
            }}
          >
            <TagList className="contents" items={selectedItems.filter((item) => item != null)} {...props} />
          </TagGroup>
        )}
      </ComboBoxValue>
      <Input
        className="min-w-16 flex-1 outline-none"
        data-slot="combobox-chip-input"
        onKeyDown={(e) => {
          if (
            e.key === "Backspace" &&
            e.currentTarget.value === "" &&
            Array.isArray(state?.value) &&
            state.value.length > 0
          ) {
            e.preventDefault()
            state.setValue(state.value.slice(0, -1))
          }
        }}
      />
      <Button
        className="data-pressed:bg-transparent"
        data-slot="combobox-trigger"
        isDisabled={props.isDisabled}
        size="icon-xs"
        variant="ghost"
      >
        <IconChevronDown className="text-muted-foreground pointer-events-none size-4" />
      </Button>
    </Group>
  )
}

const ComboboxChip = ({ className, ...props }: TagProps) => (
  <Tag
    className={cn(
      "bg-muted text-foreground flex h-[calc(--spacing(5.25))] w-fit items-center justify-center gap-1 rounded-sm px-1.5 text-xs font-medium whitespace-nowrap has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0",
      className
    )}
    data-slot="combobox-chip"
    {...props}
  />
)

const ComboboxContent = <T extends object>({
  className,
  offset = 6,
  placement = "bottom",
  ...props
}: ListBoxProps<T> & Pick<PopoverProps, "offset" | "placement">) => (
  <Popover
    className={cn("bg-popover text-popover-foreground data-entering:animate-in data-exiting:animate-out data-exiting:fade-out-0 data-entering:fade-in-0 data-exiting:zoom-out-95 data-entering:zoom-in-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 ring-foreground/10 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:border-input/30 relative isolate z-50 max-h-72 w-(--trigger-width) min-w-36 origin-(--trigger-anchor-point) overflow-hidden rounded-lg shadow-md ring-1 duration-100 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:shadow-none", className )}
    offset={offset}
    placement={placement}
  >
    <ListBox
      className="no-scrollbar flex max-h-[calc(var(--visual-viewport-height)-10rem)] scroll-py-1 flex-col overflow-y-auto overscroll-contain rounded-lg p-1 outline-hidden data-empty:p-0 sm:max-h-[inherit]"
      data-slot="select-content"
      layout="stack"
      orientation="vertical"
      renderEmptyState={() => <div className="text-muted-foreground w-full p-4 text-center">No results found</div>}
      {...props}
    />
  </Popover>
)

const ComboboxItem = <T extends object>({ className, children, ...props }: ListBoxItemProps<T>) => {
  const textValue = typeof children === "string" ? children : props.textValue
  return (
    <ListBoxItem
      className={cn(
        "data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-focused:bg-accent data-focused:text-accent-foreground not-data-[variant=destructive]:data-focused:**:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      data-slot="combobox-item"
      textValue={textValue}
      {...props}
    >
      {composeRenderProps(children, (children, { isSelected }) => (
        <>
          {children}
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
            {isSelected ? <IconCheck className="pointer-events-none" /> : null}
          </span>
        </>
      ))}
    </ListBoxItem>
  )
}

const ComboboxGroup = <T extends object>({ title, ...props }: ListBoxSectionProps<T> & { title?: string }) => (
  <ListBoxSection className={cn(props.className)} data-slot="combobox-group" {...props}>
    {title && (
      <Header className="text-muted-foreground px-2 py-1.5 text-xs" data-slot="combobox-label">
        {title}
      </Header>
    )}
    <Collection items={props.items}>{props.children}</Collection>
  </ListBoxSection>
)

const ComboboxEmpty = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "text-muted-foreground hidden w-full justify-center py-2 text-center text-sm group-data-empty/combobox-content:flex",
      className
    )}
    data-slot="combobox-empty"
    {...props}
  />
)

const ComboboxSeparator = ({ className, ...props }: SeparatorProps) => (
  <Separator className={cn("bg-border -mx-1 my-1 h-px", className)} data-slot="combobox-separator" {...props} />
)

Combobox.Chip = ComboboxChip
Combobox.Chips = ComboboxChips
Combobox.Content = ComboboxContent
Combobox.Empty = ComboboxEmpty
Combobox.Group = ComboboxGroup
Combobox.Input = ComboboxInput
Combobox.Item = ComboboxItem
Combobox.Separator = ComboboxSeparator

export {
  Collection as ComboboxCollection,
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxSeparator
}
