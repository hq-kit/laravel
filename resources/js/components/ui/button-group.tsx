import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Separator } from "./separator"

const buttonGroupVariants = cva(
  "group/button-group flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
)

const ButtonGroup = ({
  className,
  orientation,
  ...props
}: ComponentProps<"fieldset"> & VariantProps<typeof buttonGroupVariants>) => (
  <fieldset
    className={cn(buttonGroupVariants({ orientation }), className)}
    data-orientation={orientation}
    data-slot="button-group"
    {...props}
  />
)

const ButtonGroupText = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("flex items-center [&_svg]:pointer-events-none", className)} {...props} />
)

const ButtonGroupSeparator = ({ className, orientation = "vertical", ...props }: ComponentProps<typeof Separator>) => (
  <Separator
    className={cn(
      "relative self-stretch data-horizontal:mx-px data-vertical:my-px data-vertical:h-auto data-horizontal:w-auto",
      className
    )}
    data-slot="button-group-separator"
    orientation={orientation}
    {...props}
  />
)

ButtonGroup.Text = ButtonGroupText
ButtonGroup.Separator = ButtonGroupSeparator

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText }
