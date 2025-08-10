import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDots,
} from "@tabler/icons-react"
import type { ReactNode, RefObject } from "react"
import type {
  ListBoxItemProps,
  ListBoxProps,
  ListBoxSectionProps,
  TextProps,
} from "react-aria-components"
import {
  composeRenderProps,
  ListBox,
  ListBoxItem,
  ListBoxSection,
  Text,
} from "react-aria-components"
import { cn } from "@/lib/utils"

interface PaginationProps<T> extends ListBoxProps<T> {
  ref?: RefObject<HTMLDivElement>
}

const Pagination = <T extends object>({ className, ref, ...props }: PaginationProps<T>) => {
  return (
    <ListBox
      ref={ref}
      orientation="horizontal"
      aria-label={props["aria-label"] || "Pagination"}
      layout="grid"
      className={composeRenderProps(className, (className) =>
        cn("group -space-x-px flex *:first:rounded-l-lg *:last:rounded-r-lg", className),
      )}
      {...props}
    />
  )
}

interface PaginationPagesProps<T> extends ListBoxSectionProps<T> {
  ref?: RefObject<HTMLElement>
}

const PaginationPages = <T extends object>({
  className,
  ref,
  ...props
}: PaginationPagesProps<T>) => (
  <ListBoxSection
    ref={ref}
    {...props}
    className={cn("-space-x-px flex only:*:last:rounded-r-lg only:*:first:rounded-l-lg", className)}
  />
)

interface PaginationItemProps extends ListBoxItemProps {
  children?: ReactNode
  className?: string
  isCurrent?: boolean
  slot?: "ellipsis" | "page" | "last" | "first" | "previous" | "next"
}

const PaginationItem = ({
  slot = "page",
  className,
  isCurrent,
  children,
  ...props
}: PaginationItemProps) => {
  const textValue = slot === "page" ? children?.toString() : slot
  return (
    <ListBoxItem
      isDisabled={props.isDisabled || slot === "ellipsis"}
      textValue={textValue}
      className={composeRenderProps(className, (className) =>
        cn(
          "inline-flex size-9 cursor-pointer items-center justify-center gap-x-2 whitespace-nowrap border font-medium text-sm outline-hidden transition",
          "pressed:bg-accent/80 pressed:text-accent-foreground hover:bg-accent hover:text-accent-foreground",
          "focus-visible:z-10 focus-visible:border-primary/70 focus-visible:ring-4 focus-visible:ring-ring/50",
          isCurrent
            ? "pointer-events-none bg-primary text-primary-foreground"
            : "disabled:cursor-default disabled:opacity-50",
          className,
        ),
      )}
      {...props}
    >
      {slot === "ellipsis" ? (
        <IconDots />
      ) : slot === "first" ? (
        <IconChevronsLeft />
      ) : slot === "last" ? (
        <IconChevronsRight />
      ) : slot === "previous" ? (
        <IconChevronLeft />
      ) : slot === "next" ? (
        <IconChevronRight />
      ) : (
        children
      )}
    </ListBoxItem>
  )
}

interface PaginationLabelProps extends Omit<TextProps, "onClick"> {
  current: number | string
  total?: number | string
}

const PaginationLabel = ({ className, current, total, ...props }: PaginationLabelProps) => (
  <ListBoxItem
    textValue={`${String(current)}/${String(total)}`}
    isDisabled
    className={cn(
      "inline-flex h-9 select-none items-center justify-center gap-x-2 whitespace-nowrap border px-4 font-medium text-muted-foreground text-sm outline-hidden transition",
      className,
    )}
    {...props}
  >
    <Text className="text-primary">{current}</Text>
    {total && (
      <>
        <span>/</span>
        <Text>{total}</Text>
      </>
    )}
  </ListBoxItem>
)

Pagination.Item = PaginationItem
Pagination.Pages = PaginationPages
Pagination.Label = PaginationLabel

export { Pagination }
