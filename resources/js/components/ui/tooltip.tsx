import { cn } from "@/lib/utils"
import type { ComponentProps, ReactNode } from "react"
import {
  Button,
  OverlayArrow,
  Tooltip as RACTooltip,
  type TooltipProps as RACTooltipProps,
  TooltipTrigger as RACTooltipTrigger,
  composeRenderProps,
} from "react-aria-components"

type TooltipProps = ComponentProps<typeof RACTooltipTrigger>
const Tooltip = (props: TooltipProps) => <RACTooltipTrigger {...props} />

interface TooltipContentProps extends Omit<RACTooltipProps, "children"> {
  showArrow?: boolean
  children: ReactNode
  isInverse?: boolean
}

const TooltipContent = ({
  offset = 10,
  showArrow = true,
  isInverse = false,
  className,
  children,
  ...props
}: TooltipContentProps) => {
  return (
    <RACTooltip
      {...props}
      offset={offset}
      className={composeRenderProps(className, (className) =>
        cn(
          isInverse ? "bg-popover-foreground text-popover" : "bg-popover text-popover-foreground",
          "group rounded-lg border px-2.5 py-1.5 text-sm will-change-transform",
          "entering:fade-in entering:animate-in",
          "exiting:fade-in exiting:direction-reverse exiting:animate-in",
          "entering:placement-top:slide-in-from-bottom-1 exiting:placement-top:slide-out-to-bottom-1",
          "entering:placement-bottom:slide-in-from-top-1 exiting:placement-bottom:slide-out-to-top-1",
          "entering:placement-left:slide-in-from-right-1 exiting:placement-left:slide-out-to-right-1",
          "entering:placement-right:slide-in-from-left-1 exiting:placement-right:slide-out-to-left-1",
          className,
        ),
      )}
    >
      {showArrow && (
        <OverlayArrow className="group">
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            className={cn(
              "group-placement-left:-rotate-90 block group-placement-bottom:rotate-180 group-placement-right:rotate-90",
              isInverse ? "fill-popover-foreground" : "fill-popover stroke-border",
            )}
          >
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </RACTooltip>
  )
}

Tooltip.Trigger = Button
Tooltip.Content = TooltipContent

export { Tooltip }
