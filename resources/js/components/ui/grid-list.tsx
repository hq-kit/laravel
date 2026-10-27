

import { cn } from "cn"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  Button,
  Collection,
  type GridListHeaderProps,
  type GridListItemProps,
  type GridListProps,
  type GridListSectionProps,
  GridList as RACGridList,
  GridListHeader as RACGridListHeader,
  GridListItem as RACGridListItem,
  GridListSection as RACGridListSection
} from "react-aria-components/GridList"
import { Checkbox } from "./checkbox"

function GridList<T>({
  className,
  layout = "stack",
  title,
  ...props
}: Omit<GridListProps<T>, "orientation"> & { title?: string }) {
  return (
    <RACGridList
      {...props}
      className={composeRenderProps(className, (className) =>
        cn(
          "bg-background text-foreground data-drop-target:bg-accent/20 relative min-h-(--item-width) rounded-xl border p-2 [--item-width:8rem]",
          {
            "flex max-h-full flex-col overflow-y-auto data-empty:items-center data-empty:justify-center":
              layout === "stack",
            "grid grid-cols-[repeat(auto-fit,minmax(var(--item-width),1fr))] gap-2 overflow-auto data-empty:place-items-center":
              layout === "grid"
          },
          className
        )
      )}
      layout={layout}
    >
      {title && <GridListHeader data-slot="title">{title}</GridListHeader>}
      <Collection items={props.items}>{props.children}</Collection>
    </RACGridList>
  )
}

function GridListItem({ checkbox = true, ...props }: GridListItemProps & { checkbox?: boolean }) {
  const textValue = typeof props.children === "string" ? props.children : undefined
  return (
    <RACGridListItem
      textValue={textValue}
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn(
          "group relative min-w-min px-3 py-2.5 outline-hidden transition has-data-[slot=item]:p-0!",
          "flex cursor-default items-center gap-2 sm:gap-2.5",
          "data-dragging:cursor-grab data-dragging:opacity-70",
          "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='size-'])]:shrink-0 [&_svg:not([class*='size-'])]:self-center",
          "hover:bg-accent/10 data-selected:bg-accent/20 data-selected:text-accent hover:data-selected:bg-accent/15",
          "focus-visible:ring-ring data-focused:ring-ring focus-visible:ring-2 data-focused:ring-2",
          "data-disabled:opacity-50",
          "href" in props && "cursor-pointer",
          className
        )
      )}
    >
      {(values) => (
        <>
          {checkbox && values.selectionMode !== "none" && <Checkbox slot="selection" />}
          {values.allowsDragging && <Button className="sr-only" slot="drag" />}
          {props.children}
        </>
      )}
    </RACGridListItem>
  )
}

function GridListSection<T>({ title, ...props }: GridListSectionProps<T> & { title?: string }) {
  return (
    <RACGridListSection data-slot="grid-list-section" {...props}>
      {title && <GridListHeader data-slot="title">{title}</GridListHeader>}
      <Collection {...props} />
    </RACGridListSection>
  )
}

function GridListHeader({ children, ...props }: GridListHeaderProps) {
  return (
    <RACGridListHeader
      {...props}
      className={cn(
        "bg-background/10 text-foreground z-10 -mx-2 -mt-2 mb-2 border-b px-4 py-1 text-sm font-semibold backdrop-blur-md",
        props.className
      )}
    >
      {children}
    </RACGridListHeader>
  )
}

GridList.Item = GridListItem
GridList.Section = GridListSection
GridList.Header = GridListHeader

export { GridList, GridListHeader, GridListItem, GridListSection }
