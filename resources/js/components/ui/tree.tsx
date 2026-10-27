import type { ReactNode } from "react"
import { IconChevronRight, IconFile } from "@tabler/icons-react"
import { cn } from "cn"
import { Button } from "react-aria-components/Button"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  Tree as RACTree,
  TreeItem as RACTreeItem,
  type Selection,
  TreeItemContent,
  type TreeItemContentProps,
  type TreeItemProps,
  type TreeProps
} from "react-aria-components/Tree"
import { Checkbox } from "./checkbox"

const Tree = <T extends object>({ className, ...props }: TreeProps<T>) => (
  <RACTree
    className={composeRenderProps(className, (className) =>
      cn(
        "flex flex-col gap-0.5 text-sm outline-hidden",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )
    )}
    data-slot="tree"
    {...props}
  />
)

const TreeItem = <T extends object>({ className, ...props }: TreeItemProps<T>) => (
  <RACTreeItem
    className={composeRenderProps(className, (className) =>
      cn(
        "focus:bg-accent/10 relative flex cursor-default items-center gap-1 rounded-md border border-transparent px-1.5 py-1 pr-2 text-sm outline-hidden transition data-disabled:opacity-50 data-inset:pl-7 [&_svg:not([class*='size-'])]:size-4",
        "data-drop-target:border-primary",
        "focus-visible:border-border focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "hover:bg-accent/10 hover:data-selected:bg-accent/30",
        "data-selected:bg-accent/20",
        "data-disabled:opacity-50",
        className
      )
    )}
    data-slot="tree-item"
    {...props}
  />
)

interface TreeItemLabelProps extends TreeItemContentProps {
  icon?: ReactNode | boolean
  iconExpanded?: ReactNode
}

const TreeItemLabel = ({ children, icon, iconExpanded, ...props }: TreeItemLabelProps) => (
  <TreeItemContent {...props}>
    {(values) => (
      <>
        <div className="relative w-[calc(calc(var(--tree-item-level)-1)*(--spacing(5.5)))] shrink-0" />
        {values.selectionMode === "multiple" && values.selectionBehavior === "toggle" && (
          <Checkbox className="mr-0.5 w-min" slot="selection" />
        )}
        {values.allowsDragging && <Button className="sr-only" slot="drag" />}
        {values.hasChildItems ? (
          <span className="inline-flex w-full items-center justify-start gap-1 outline-hidden" data-slot="tree-item">
            <Button
              className="inline-flex grow items-center justify-start gap-1 outline-hidden"
              data-slot="tree-item"
              slot="chevron"
            >
              <IconChevronRight
                className={cn("transition-transform", values.isExpanded && "rotate-90")}
                data-slot="indicator"
              />
              {!values.isExpanded && (typeof icon === "boolean" ? <IconFile /> : icon)}
              {values.hasChildItems && values.isExpanded && (iconExpanded ?? icon)}
              {typeof children === "function" ? children(values) : children}
            </Button>
          </span>
        ) : (
          <span
            className="inline-flex w-full items-center justify-start gap-1 whitespace-nowrap outline-hidden"
            data-slot="tree-item"
          >
            {typeof icon === "boolean" ? <IconFile /> : icon}
            {typeof children === "function" ? children(values) : children}
          </span>
        )}
      </>
    )}
  </TreeItemContent>
)

Tree.Item = TreeItem
Tree.ItemLabel = TreeItemLabel

export type { Selection, TreeItemProps, TreeProps }
export { Tree, TreeItem, TreeItemLabel }
