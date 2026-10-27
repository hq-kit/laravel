import type { ComponentProps } from "react"
import type { DialogProps } from "react-aria-components/Dialog"
import { cn } from "cn"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { Heading, type HeadingProps } from "react-aria-components/Heading"
import {
  SheetBackdrop,
  SheetContent as SheetContentPrimitive,
  SheetOverlay,
  type SheetOverlayProps,
  Sheet as SheetPrimitive,
  type SheetProps as SheetPrimitiveProps,
  SheetTrigger as SheetTriggerPrimitive,
  type SheetTriggerProps
} from "react-aria-components/Sheet"

const Sheet = (props: SheetTriggerProps) => <SheetTriggerPrimitive {...props} />

export interface SheetProps
  extends Omit<SheetOverlayProps, "children">,
    Pick<SheetPrimitiveProps, "swipeAnimation" | "swipeAnimationRange"> {
  children?: DialogProps["children"]
  overlayClassName?: SheetOverlayProps["className"]
  overscrollPadding?: boolean
}

function SheetContent({
  className,
  position = "bottom",
  overlayClassName,
  children,
  snapPoints,
  preventDismissal,
  ...props
}: SheetProps) {
  return (
    <SheetOverlay
      {...props}
      className={composeRenderProps(overlayClassName, (overlayClassName) =>
        cn(
          "fixed inset-0 isolate z-50 data-[stack-index='0']:bg-black/10 supports-backdrop-filter:data-[stack-index='0']:backdrop-blur-xs motion-reduce:backdrop-blur-none",
          "data-entering:fade-in data-entering:animate-in data-entering:ease-out data-exiting:duration-300",
          "data-exiting:fade-out data-exiting:animate-out data-exiting:ease-in",
          overlayClassName
        )
      )}
      position={position}
      preventDismissal={preventDismissal}
      snapPoints={snapPoints}
    >
      <SheetBackdrop
        className="data-entering:fade-in data-exiting:fade-out data-entering:animate-in data-exiting:animate-out bg-black/10 data-entering:duration-300 data-exiting:duration-300"
        swipeAnimationRange={snapPoints ? { start: snapPoints.length - 1 } : undefined}
      />
      <SheetPrimitive
        className={composeRenderProps(className, (className) =>
          cn(
            "bg-popover text-popover-foreground box-content flex origin-top transform-[perspective(1000px)] flex-col gap-4 bg-clip-padding text-sm shadow-lg transition-transform will-change-transform data-has-descendants:scale-95",
            "data-[position=right]:h-dvh data-[position=right]:w-3/4 data-[position=right]:border-l data-[position=right]:data-has-descendants:-translate-x-4 data-[position=right]:data-has-descendants:rounded-l-lg data-[position=right]:sm:max-w-md",
            "data-[position=left]:h-dvh data-[position=left]:w-3/4 data-[position=left]:border-l data-[position=left]:data-has-descendants:translate-x-4 data-[position=left]:data-has-descendants:rounded-r-lg data-[position=left]:sm:max-w-md",
            "data-[position=bottom]:h-auto data-[position=bottom]:w-full data-[position=bottom]:rounded-t-lg",
            "data-[position=top]:h-auto data-[position=top]:w-full data-[position=top]:rounded-b-lg",
            className
          )
        )}
        data-slot="sheet"
        overscrollPadding={props.overscrollPadding ?? true}
        // stackAnimation="sheet-scale-back"
      >
        {!preventDismissal && position === "bottom" && (
          <div
            aria-hidden="true"
            className="bg-foreground/30 pointer-events-none absolute top-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full md:hidden"
          />
        )}
        <SheetContentPrimitive
          className="relative flex max-h-full flex-col overflow-hidden outline-hidden [--gutter:--spacing(6)]"
          data-slot="sheet-content"
        >
          {children}
        </SheetContentPrimitive>
      </SheetPrimitive>
    </SheetOverlay>
  )
}

interface SheetHeaderProps extends Omit<ComponentProps<"div">, "title"> {
  title?: string
  description?: string
}

function SheetHeader({ className, ...props }: SheetHeaderProps) {
  return (
    <div className={cn("relative space-y-1 p-4", className)} data-slot="dialog-header">
      {props.title && <SheetTitle>{props.title}</SheetTitle>}
      {props.description && <SheetDescription>{props.description}</SheetDescription>}
      {!props.title && typeof props.children === "string" ? <SheetTitle>{props.children}</SheetTitle> : props.children}
    </div>
  )
}

function SheetTitle({ className, ...props }: HeadingProps) {
  return (
    <Heading className={cn("text-foreground text-lg font-semibold text-balance", className)} slot="title" {...props} />
  )
}

function SheetDescription({ className, ...props }: ComponentProps<"div">) {
  return (
    <p
      className={cn("text-muted-foreground text-pretty group-disabled:opacity-50", className)}
      data-slot="description"
      {...props}
    />
  )
}

function SheetBody({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "isolate flex min-h-0 flex-1 flex-col overflow-auto px-4 py-1",
        "**:data-[slot=dialog-footer]:px-0 **:data-[slot=dialog-footer]:pt-0",
        className
      )}
      data-slot="dialog-body"
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "isolate mt-auto flex flex-col-reverse justify-end gap-2 p-4 group-not-has-data-[slot=dialog-body]/dialog:pt-0 group-not-has-data-[slot=dialog-body]/popover:pt-0 sm:flex-row",
        className
      )}
      data-slot="dialog-footer"
      {...props}
    />
  )
}

Sheet.Body = SheetBody
Sheet.Content = SheetContent
Sheet.Description = SheetDescription
Sheet.Footer = SheetFooter
Sheet.Header = SheetHeader
Sheet.Title = SheetTitle

export { Sheet, SheetBody, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle }
