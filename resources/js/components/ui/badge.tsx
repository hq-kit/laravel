import type { ComponentPropsWithoutRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Link, type LinkProps } from "./link"

const badgeVariants = cva(
  "group/badge focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:ring-[3px] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive dark:bg-destructive/20",
        success:
          "text-primary-foreground bg-[oklch(from_var(--primary)_l_0.18_145)] hover:bg-[oklch(from_var(--primary)_l_0.18_145)]/80",
        warning:
          "text-primary-foreground bg-[oklch(from_var(--primary)_0.769_0.188_70)] hover:bg-[oklch(from_var(--primary)_0.769_0.188_70)]/80 dark:bg-[oklch(from_var(--primary)_0.8_0.2_60)]/70 dark:hover:bg-[oklch(from_var(--primary)_0.8_0.2_60)]/80",
        info: "text-primary-foreground bg-[oklch(from_var(--primary)_0.627_0.20_304)] hover:bg-[oklch(from_var(--primary)_0.627_0.20_304)]/80",
        outline: "border-border text-foreground hover:bg-muted hover:text-muted-foreground",
        ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
)

export interface BadgeProps extends React.ComponentProps<"span">, VariantProps<typeof badgeVariants> {}

const Badge = ({
  className,
  variant,
  ...props
}: Omit<LinkProps, "className" | "slot"> & ComponentPropsWithoutRef<"span"> & VariantProps<typeof badgeVariants>) => {
  const Comp = "href" in props ? Link : "span"

  return <Comp className={cn(badgeVariants({ variant }), className)} data-slot="badge" {...props} />
}

export { Badge, badgeVariants }
