import type { ComponentProps, CSSProperties, ReactNode } from "react"
import {
  IconChevronLeft,
  IconChevronLeftPipe,
  IconChevronRight,
  IconChevronRightPipe,
  IconDots
} from "@tabler/icons-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Button } from "react-aria-components"
import { Link } from "./link"

const paginationVariants = cva(
  "group/pagination **:data-[slot=link]:data-active:bg-accent **:data-[slot=link]:data-active:border-ring **:data-[slot=link]:data-active:text-accent-foreground **:data-[slot=link]:hover:bg-muted mx-auto flex inline-flex w-full items-center justify-center gap-[--spacing(var(--gap))] **:data-[slot=link]:inline-flex **:data-[slot=link]:items-center **:data-[slot=link]:justify-center **:data-[slot=link]:border **:data-[slot=link]:bg-transparent **:data-[slot=link]:active:translate-y-px [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:self-center",
  {
    variants: {
      variant: {
        outline: "**:data-[slot=link]:border-input",
        ghost: "**:data-[slot=link]:border-transparent"
      },
      size: {
        md: "**:data-[slot=link]:h-8 **:data-[slot=link]:min-w-8 **:data-[slot=link]:gap-1.5 [&_svg:not([class*='size-'])]:size-4",
        xs: "**:text-xs **:data-[slot=link]:h-6 **:data-[slot=link]:min-w-6 **:data-[slot=link]:gap-1 [&_svg:not([class*='size-'])]:size-3",
        sm: "**:text-[0.8rem] **:data-[slot=link]:h-7 **:data-[slot=link]:min-w-7 **:data-[slot=link]:gap-1 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "**:data-[slot=link]:h-9 **:data-[slot=link]:min-w-9 **:data-[slot=link]:gap-1.5 [&_svg:not([class*='size-'])]:size-4.5"
      }
    },
    defaultVariants: {
      variant: "outline",
      size: "md"
    }
  }
)

const Pagination = ({
  className,
  spacing = 0,
  variant = "outline",
  size = "md",
  ...props
}: ComponentProps<"ul"> & VariantProps<typeof paginationVariants> & { spacing?: number }) => (
  <nav aria-label="pagination" data-slot="pagination">
    <ul
      className={cn(paginationVariants({ variant, size }), className)}
      data-size={size}
      data-slot="pagination-content"
      data-spacing={spacing}
      data-variant={variant}
      style={{ "--gap": spacing } as CSSProperties}
      {...props}
    />
  </nav>
)

const PaginationItem = ({
  isActive,
  ...props
}: Omit<ComponentProps<typeof Button>, "variant" | "size"> & {
  isActive?: boolean
} & Omit<ComponentProps<typeof Link>, "variant" | "size">) => {
  return (
    <li
      className="group/pagination-item *:rounded-lg *:px-2 group-data-[spacing=0]/pagination:*:rounded-none group-data-[spacing=0]/pagination:first:*:rounded-s-lg group-data-[spacing=0]/pagination:last:*:rounded-e-lg"
      data-slot="pagination-item"
    >
      {"href" in props ? (
        <Link
          aria-current={isActive ? "page" : undefined}
          className={cn(props.isDisabled ? "disabled" : "", props.className)}
          data-active={isActive}
          data-slot="link"
          {...props}
        />
      ) : (
        <Button
          aria-current={isActive ? "page" : undefined}
          className={cn(props.className)}
          data-active={isActive}
          data-slot="link"
          isDisabled={props.isDisabled}
          {...props}
        />
      )}
    </li>
  )
}

const PaginationFirst = ({ children, ...props }: ComponentProps<typeof PaginationItem>) => {
  return (
    <PaginationItem aria-label="Go to previous page" {...props}>
      <IconChevronLeftPipe />
      {children as ReactNode}
    </PaginationItem>
  )
}
const PaginationPrevious = ({ children, ...props }: ComponentProps<typeof PaginationItem>) => {
  return (
    <PaginationItem aria-label="Go to previous page" {...props}>
      <IconChevronLeft />
      {children as ReactNode}
    </PaginationItem>
  )
}

const PaginationNext = ({ children, ...props }: ComponentProps<typeof PaginationItem>) => (
  <PaginationItem aria-label="Go to next page" {...props}>
    {children as ReactNode}
    <IconChevronRight />
  </PaginationItem>
)

const PaginationLast = ({ children, ...props }: ComponentProps<typeof PaginationItem>) => (
  <PaginationItem aria-label="Go to last page" {...props}>
    {children as ReactNode}
    <IconChevronRightPipe />
  </PaginationItem>
)

const PaginationEllipsis = (props: Omit<ComponentProps<typeof PaginationItem>, "href" | "isActive">) => (
  <PaginationItem aria-hidden data-slot="link" {...props}>
    <IconDots />
    <span className="sr-only">More pages</span>
  </PaginationItem>
)

Pagination.Item = PaginationItem
Pagination.First = PaginationFirst
Pagination.Previous = PaginationPrevious
Pagination.Next = PaginationNext
Pagination.Last = PaginationLast
Pagination.Ellipsis = PaginationEllipsis

export {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious
}
