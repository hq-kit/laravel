

import { cn } from "cn"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  Collection,
  Header,
  type ListBoxItemProps,
  type ListBoxProps,
  type ListBoxSectionProps,
  ListBox as RACListBox,
  ListBoxItem as RACListBoxItem,
  ListBoxSection as RACListBoxSection,
  type Selection,
  Text,
  type TextProps
} from "react-aria-components/ListBox"
import { Separator, type SeparatorProps } from "react-aria-components/Separator"

const ListBox = <T extends object>({ className, ...props }: ListBoxProps<T>) => (
  <RACListBox
    {...props}
    className={composeRenderProps(className, (className) =>
      cn(
        "bg-background text-foreground group/list-box flex size-full min-w-max flex-col gap-1 overflow-hidden rounded-xl! border p-2",
        className
      )
    )}
    renderEmptyState={() => <div className="text-muted-foreground w-full p-4 text-center">No results found</div>}
  />
)

const ListBoxItem = ({ className, ...props }: ListBoxItemProps) => {
  const textValue = typeof props.children === "string" ? props.children : undefined

  return (
    <RACListBoxItem
      className={composeRenderProps(className, (className) =>
        cn(
          "group/list-box-item relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-lg data-disabled:pointer-events-none data-disabled:opacity-50",
          "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          "data-selected:bg-accent data-selected:**:text-accent-foreground data-selected:text-accent-foreground",
          "data-dragging:outline-accent data-dragging:cursor-grabbing data-dragging:outline",
          className
        )
      )}
      data-slot="select-item"
      textValue={textValue}
      {...props}
    />
  )
}

const ListBoxSection = <T extends object>({ title, ...props }: ListBoxSectionProps<T> & { title?: string }) => (
  <RACListBoxSection
    className={cn("text-foreground overflow-hidden", props.className)}
    data-slot="list-box-section"
    {...props}
  >
    {title && (
      <Header className="text-muted-foreground pointer-events-none px-2 py-1.5 text-xs font-medium" data-slot="title">
        {title}
      </Header>
    )}
    <Collection items={props.items}>{props.children}</Collection>
  </RACListBoxSection>
)

interface ListBoxDetailsProps extends TextProps {
  description?: TextProps["children"]
}

const ListBoxDetails = ({ title, description, ...props }: ListBoxDetailsProps) => {
  const { children, ...restProps } = props

  return (
    <div className="col-start-2 flex flex-col gap-y-1" data-slot="item-details" {...restProps}>
      {title && (
        <Text className="font-medium sm:text-sm" slot="label">
          {title}
        </Text>
      )}
      {description && (
        <Text className="text-muted-foreground text-xs" slot="description" {...restProps}>
          {description}
        </Text>
      )}
      {!title && children}
    </div>
  )
}

const ListBoxSeparator = ({ className, ...props }: SeparatorProps) => (
  <Separator className={cn("bg-muted col-span-full -mx-1 my-1 h-px", className)} orientation="horizontal" {...props} />
)

ListBox.Section = ListBoxSection
ListBox.Details = ListBoxDetails
ListBox.Item = ListBoxItem
ListBox.Separator = ListBoxSeparator

export type { Selection }
export { ListBox, ListBoxDetails, ListBoxItem, ListBoxSection, ListBoxSeparator }
