import { cn } from "@/lib/utils"
import type { DropZoneProps } from "react-aria-components"
import { DropZone as RACDropZone, composeRenderProps } from "react-aria-components"

const DropZone = ({ className, ...props }: DropZoneProps) => (
  <RACDropZone
    className={composeRenderProps(className, (className) =>
      cn(
        "group flex max-h-[200px] max-w-xl flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-sm outline-hidden transition duration-200 has-[[slot=description]]:text-center",
        "drop-target:border-primary drop-target:border-solid drop-target:bg-primary/10 drop-target:ring-4 drop-target:ring-ring/50 drop-target:[&_.text-muted-foreground]:text-primary",
        "focus:border-primary/70 focus:outline-hidden focus:ring-4 focus:ring-ring/50 focus:invalid:border-destructive/70 focus:invalid:ring-destructive/50",
        "focus-visible:ring-4 focus-visible:ring-ring/50",
        className,
      ),
    )}
    {...props}
  />
)
export { DropZone }
