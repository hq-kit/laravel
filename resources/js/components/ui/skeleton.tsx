import type { ComponentProps } from "react"
import { cn } from "cn"

const Skeleton = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("bg-muted animate-pulse rounded-lg", className)} data-slot="skeleton" {...props} />
)

export { Skeleton }
