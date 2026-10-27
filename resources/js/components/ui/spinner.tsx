import type { ComponentProps } from "react"
import { IconLoader2 } from "@tabler/icons-react"
import { cn } from "cn"

const Spinner = ({ className, ...props }: ComponentProps<"svg">) => (
  <IconLoader2 aria-label="Loading" className={cn("size-4 animate-spin", className)} role="status" {...props} />
)

export { Spinner }
