import { IconLoader3 } from "@tabler/icons-react"
import type { Ref } from "react"
import type { ButtonProps as RACButtonProps } from "react-aria-components"
import { Button as RACButton, composeRenderProps } from "react-aria-components"
import { type VariantProps, tv } from "tailwind-variants"

const buttonStyle = tv({
  base: [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm outline-hidden transition-all",
    "**:[svg]:pointer-events-none **:[svg]:shrink-0",
    "shadow-xs focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
    "cursor-pointer disabled:pointer-events-none disabled:opacity-50",
  ],
  variants: {
    variant: {
      default:
        "bg-primary pressed:bg-primary/80 text-primary-foreground shadow-xs hover:bg-primary/90",
      destructive:
        "bg-destructive pressed:bg-destructive/80 text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
      outline:
        "border bg-background pressed:bg-accent/80 text-foreground shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
      secondary:
        "bg-secondary pressed:bg-secondary/80 text-secondary-foreground shadow-xs hover:bg-secondary/80",
      ghost:
        "pressed:bg-accent/80 shadow-none hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
    },
    size: {
      xs: "gap-x-1.5 px-2 text-xs [--height:theme(spacing.6)] [--width:auto] [&_svg:not([class*='size-'])]:size-3.5",
      sm: "gap-x-1.5 px-3 text-sm [--height:theme(spacing.8)] [--width:auto] [&_svg:not([class*='size-'])]:size-4",
      md: "gap-x-2 px-4 text-sm [--height:theme(spacing.9)] [--width:auto] [&_svg:not([class*='size-'])]:size-4",
      lg: "gap-x-2.5 px-5 text-base [--height:theme(spacing.10)] [--width:auto] [&_svg:not([class*='size-'])]:size-5",
    },
    icon: {
      true: "h-(--height) w-(--height) shrink-0 px-0",
      false: "h-(--height) w-(--width)",
    },
    isPending: {
      true: "pointer-events-none cursor-default opacity-50 [&_svg:not([data-slot='loader'])]:hidden",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
})

interface ButtonProps extends RACButtonProps, VariantProps<typeof buttonStyle> {
  ref?: Ref<HTMLButtonElement>
  isPending?: boolean
}

const Button = ({ className, children, variant, size, icon, isPending, ...props }: ButtonProps) => (
  <RACButton
    className={composeRenderProps(className, (className) =>
      buttonStyle({ variant, size, icon, isPending, className }),
    )}
    {...props}
  >
    {(values) => (
      <>
        {isPending && <IconLoader3 data-slot="loader" className="animate-spin" />}
        {typeof children === "function" ? children(values) : children}
      </>
    )}
  </RACButton>
)

export { Button, buttonStyle }
