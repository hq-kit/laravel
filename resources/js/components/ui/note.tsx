import { cn } from "@/lib/utils"
import type { ComponentPropsWithRef } from "react"

interface NoteProps extends ComponentPropsWithRef<"div"> {
  variant?: "default" | "destructive"
}

const Note = ({ variant = "default", className, children, ...props }: NoteProps) => (
  <div
    role="alert"
    data-slot="alert"
    className={cn(
      "relative grid w-full items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-child-items:grid-cols-[0_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
      variant === "default" && "bg-card text-card-foreground",
      variant === "destructive" &&
        "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 [&>svg]:text-current",
      className,
    )}
    {...props}
  >
    {children}
  </div>
)

const NoteTitle = ({ className, ...props }: ComponentPropsWithRef<"h5">) => (
  <h5
    data-slot="alert-title"
    className={cn("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", className)}
    {...props}
  />
)

const NoteDescription = ({ className, ...props }: ComponentPropsWithRef<"div">) => (
  <div
    data-slot="alert-description"
    className={cn(
      "col-start-2 grid justify-items-start gap-1 text-muted-foreground text-sm [&_p]:leading-relaxed",
      className,
    )}
    {...props}
  />
)

Note.Title = NoteTitle
Note.Description = NoteDescription

export { Note }
