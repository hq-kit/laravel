import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-muted/50 text-secondary-foreground",
        destructive:
          "bg-destructive/5 border-destructive text-destructive **:[.text-muted-foreground]:text-destructive/80",
        success:
          "border-[oklch(from_var(--primary)_l_0.18_145)] bg-[oklch(from_var(--primary)_l_0.18_145)]/5 text-[oklch(from_var(--primary)_l_0.18_145)] **:[.text-muted-foreground]:text-[oklch(from_var(--primary)_l_0.18_145)]/80",
        warning:
          "border-[oklch(from_var(--primary)_0.769_0.188_70)] bg-[oklch(from_var(--primary)_0.769_0.188_70)]/5 text-[oklch(from_var(--primary)_0.769_0.188_70)] dark:bg-[oklch(from_var(--primary)_0.8_0.2_60)]/10 **:[.text-muted-foreground]:text-[oklch(from_var(--primary)_0.769_0.188_70)]/80",
        info: "border-[oklch(from_var(--primary)_0.627_0.20_304)] bg-[oklch(from_var(--primary)_0.627_0.20_304)]/5 text-[oklch(from_var(--primary)_0.627_0.20_304)] **:[.text-muted-foreground]:text-[oklch(from_var(--primary)_0.627_0.20_304)]/80"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

const Alert = ({ className, variant, ...props }: ComponentProps<"div"> & VariantProps<typeof alertVariants>) => (
  <div className={cn(alertVariants({ variant }), className)} data-slot="alert" role="alert" {...props} />
)

const AlertTitle = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "[&_a]:hover:text-foreground font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3",
      className
    )}
    data-slot="alert-title"
    {...props}
  />
)

const AlertDescription = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "text-muted-foreground [&_a]:hover:text-foreground text-sm text-balance md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4",
      className
    )}
    data-slot="alert-description"
    {...props}
  />
)

const AlertAction = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("absolute top-2 right-2", className)} data-slot="alert-action" {...props} />
)
Alert.Title = AlertTitle
Alert.Description = AlertDescription
Alert.Action = AlertAction

export { Alert, AlertAction, AlertDescription, AlertTitle }
