

import type { RefAttributes } from "react"
import { IconLoader2 } from "@tabler/icons-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { type ButtonProps, Button as RACButton } from "react-aria-components/Button"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { Link, type LinkProps } from "./link"

const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-3 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-3 data-pressed:not-aria-[haspopup]:translate-y-px [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:self-center",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]",
        destructive:
          "bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30",
        success:
          "text-primary-foreground bg-[oklch(from_var(--primary)_l_0.18_145)] hover:bg-[oklch(from_var(--primary)_l_0.18_145)]/80",
        warning:
          "text-primary-foreground bg-[oklch(from_var(--primary)_0.769_0.188_70)] hover:bg-[oklch(from_var(--primary)_0.769_0.188_70)]/80 dark:bg-[oklch(from_var(--primary)_0.8_0.2_60)]/70 dark:hover:bg-[oklch(from_var(--primary)_0.8_0.2_60)]/80",
        info: "text-primary-foreground bg-[oklch(from_var(--primary)_0.627_0.20_304)] hover:bg-[oklch(from_var(--primary)_0.627_0.20_304)]/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        ghost:
          "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        md: "h-8 gap-1.5 px-2.5 [&_svg:not([class*='size-'])]:size-4",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 [&_svg:not([class*='size-'])]:size-4.5",
        icon: "size-8 [&_svg:not([class*='size-'])]:size-4",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-9 [&_svg:not([class*='size-'])]:size-4.5"
      },
      isPending: {
        true: "pointer-events-none opacity-50 [&_svg:not([data-slot='loader'])]:hidden"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
)

const Button = ({
  className,
  variant,
  size,
  children,
  ...props
}: ButtonProps & RefAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) => (
  <RACButton
    className={composeRenderProps(className, (className) =>
      cn(
        buttonVariants({
          variant,
          size,
          isPending: props.isPending,
          className
        })
      )
    )}
    data-size={size}
    data-slot="button"
    data-variant={variant}
    preventFocusOnPress
    {...props}
  >
    {(values) => (
      <>
        {values.isPending && <IconLoader2 className="animate-spin" data-slot="loader" />}
        {typeof children === "function" ? children(values) : children}
      </>
    )}
  </RACButton>
)

const LinkButton = ({
  className,
  variant = "primary",
  size = "md",
  ...props
}: LinkProps & VariantProps<typeof buttonVariants>) => (
  <Link
    className={composeRenderProps(className, (className) =>
      cn(
        buttonVariants({
          variant,
          size,
          isPending: props.isPending,
          className
        })
      )
    )}
    data-size={size}
    data-slot="button"
    data-variant={variant}
    {...props}
  />
)

Button.Link = LinkButton

export { Button, buttonVariants, LinkButton }
