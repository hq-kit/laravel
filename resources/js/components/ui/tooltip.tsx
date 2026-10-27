"use client"

import { cn } from "cn"
import { Children, type ComponentProps, type ReactNode } from "react"
import { OverlayArrow, Tooltip as RACTooltip, TooltipTrigger as RACTooltipTrigger } from "react-aria-components"

function Tooltip({ delay = 0, children, ...props }: ComponentProps<typeof RACTooltipTrigger>) {
  const [trigger, tooltip] = Children.toArray(children)

  return (
    <RACTooltipTrigger data-slot="tooltip-trigger" delay={delay} {...props}>
      {trigger}
      {tooltip}
    </RACTooltipTrigger>
  )
}

function TooltipContent({
  className,
  placement = "top",
  offset = 4,
  showArrow = true,
  crossOffset = 0,
  children,
  ...props
}: Omit<ComponentProps<typeof RACTooltip>, "children" | "className"> & {
  className?: string
  children?: ReactNode
  showArrow?: boolean
}) {
  return (
    <RACTooltip
      className={cn(
        "data-entering:fade-in-0 data-entering:zoom-in-95 data-exiting:fade-out-0 data-exiting:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 bg-foreground text-background data-entering:animate-in data-exiting:animate-out z-50 inline-flex w-fit max-w-xs origin-(--trigger-anchor-point) items-center gap-1.5 rounded-md px-3 py-1.5 text-xs has-data-[slot=kbd]:pr-1.5 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm",
        className
      )}
      crossOffset={crossOffset}
      data-slot="tooltip-content"
      offset={offset}
      placement={placement}
      {...props}
    >
      {children}
      {showArrow && (
        <OverlayArrow
          className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-xs"
          style={({ placement, defaultStyle }) => ({
            ...defaultStyle,
            rotate: "0deg",
            translate: "0 0",
            transform:
              placement === "bottom"
                ? "translate(-50%, calc(50% + 2px)) rotate(45deg)"
                : placement === "top"
                  ? "translate(-50%, calc(-50% - 2px)) rotate(45deg)"
                  : placement === "left"
                    ? "translate(calc(-50% - 2px), -50%) rotate(45deg)"
                    : "translate(calc(50% + 2px), -50%) rotate(45deg)"
          })}
        />
      )}
    </RACTooltip>
  )
}

Tooltip.Content = TooltipContent

export { Tooltip, TooltipContent }
