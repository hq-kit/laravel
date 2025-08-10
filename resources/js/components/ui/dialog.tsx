import { cn } from "@/lib/utils"
import { IconX } from "@tabler/icons-react"
import type { ComponentPropsWithRef } from "react"
import {
  Button,
  type ButtonProps,
  Heading,
  type ModalOverlayProps,
  Dialog as RACDialog,
  type DialogProps as RACDialogProps,
  type HeadingProps as RACHeadingProps,
  ModalOverlay as RACModalOverlay,
  type TextProps,
  composeRenderProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"

const overlayStyle = tv({
  base: [
    "fixed inset-0 isolate z-50 bg-black/50 duration-200 [--visual-viewport-vertical-padding:32px]",
    "entering:fade-in entering:animate-in entering:ease-out",
    "exiting:fade-out exiting:animate-out exiting:ease-in",
  ],
})

const sheetStyle = tv({
  base: [
    "fixed z-50 bg-background shadow-lg transition",
    "entering:animate-in entering:duration-300 entering:ease-out",
    "exiting:animate-out exiting:duration-200 exiting:ease-in",
  ],
  variants: {
    side: {
      top: "entering:slide-in-from-top exiting:slide-out-to-top inset-x-0 top-0 rounded-b-lg border-b",
      bottom:
        "entering:slide-in-from-bottom exiting:slide-out-to-bottom inset-x-0 bottom-0 rounded-t-lg border-t",
      left: "entering:slide-in-from-left exiting:slide-out-to-left inset-y-0 left-0 h-full w-3/4 rounded-r-lg border-r sm:max-w-sm",
      right:
        "entering:slide-in-from-right exiting:slide-out-to-right inset-y-0 right-0 h-full w-3/4 rounded-l-lg border-l sm:max-w-sm",
    },
  },
})

const modalStyle = tv({
  base: [
    "sm:-translate-x-1/2 sm:-translate-y-1/2 absolute bottom-0 z-50 h-fit w-full rounded-t-lg bg-background shadow-lg transition duration-200 sm:fixed sm:top-1/2 sm:left-[50vw] sm:rounded-lg sm:border",
    "entering:fade-in entering:zoom-in-95 entering:slide-in-from-bottom sm:entering:slide-in-from-bottom-0 entering:animate-in entering:ease-out",
    "exiting:fade-out exiting:zoom-out-95 exiting:slide-out-to-bottom sm:exiting:slide-out-to-bottom-0 exiting:animate-out exiting:ease-in",
    "ring-1 ring-border",
  ],
  variants: {
    size: {
      xs: "sm:max-w-xs",
      sm: "sm:max-w-sm",
      md: "sm:max-w-md",
      lg: "sm:max-w-lg",
      xl: "sm:max-w-xl",
      "2xl": "sm:max-w-2xl",
      "3xl": "sm:max-w-3xl",
      "4xl": "sm:max-w-4xl",
      "5xl": "sm:max-w-5xl",
      full: "max-w-full",
    },
  },
})

const popoverStyle = tv({
  base: [
    "group max-w-xs rounded-lg border bg-popover bg-clip-padding text-popover-foreground shadow-sm transition-transform sm:max-w-3xl sm:text-sm",
    "entering:fade-in entering:zoom-in-95 entering:animate-in entering:duration-150",
    "exiting:fade-out exiting:zoom-out-95 exiting:animate-out exiting:duration-100",
    "entering:placement-left:slide-in-from-right-2 entering:placement-right:slide-in-from-left-2 entering:placement-top:slide-in-from-bottom-2 entering:placement-bottom:slide-in-from-top-2",
    "exiting:placement-left:slide-out-to-right-2 exiting:placement-right:slide-out-to-left-2 exiting:placement-top:slide-out-to-bottom-2 exiting:placement-bottom:slide-out-to-top-2",
  ],
  variants: {
    isPicker: {
      true: "max-h-72 min-w-(--trigger-width) max-w-(--trigger-width) overflow-y-auto p-1",
    },
  },
})

const Dialog = ({ className, ...props }: RACDialogProps) => (
  <RACDialog
    slot="dialog"
    aria-label="Dialog"
    className={cn(
      "relative flex max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding))] flex-col overflow-hidden outline-hidden",
      className,
    )}
    {...props}
  />
)

const DialogOverlay = ({ className, isDismissable = true, ...props }: ModalOverlayProps) => (
  <RACModalOverlay
    isDismissable={isDismissable}
    isKeyboardDismissDisabled={!isDismissable}
    className={composeRenderProps(className, (className) => overlayStyle({ className }))}
    {...props}
  />
)

const DialogHeader = ({ className, ...props }: ComponentPropsWithRef<"div">) => {
  return (
    <div
      slot="header"
      className={cn("flex flex-col p-4 text-center sm:text-left", className)}
      {...props}
    />
  )
}

const DialogTitle = ({ className, ...props }: RACHeadingProps) => (
  <Heading slot="title" className={cn("font-semibold text-lg/8", className)} {...props} />
)

const DialogDescription = ({ className, ...props }: TextProps) => (
  <p slot="description" className={cn("text-muted-foreground text-sm", className)} {...props} />
)

const DialogBody = ({ className, ...props }: ComponentPropsWithRef<"div">) => (
  <div
    slot="body"
    className={cn(
      "isolate flex max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding))] flex-col overflow-auto px-4 py-1 will-change-scroll",
      className,
    )}
    {...props}
  />
)

const DialogFooter = ({ className, ...props }: ComponentPropsWithRef<"div">) => {
  return (
    <div
      slot="footer"
      className={cn(
        "isolate mt-auto flex flex-col-reverse justify-center gap-2 p-4 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  )
}

const DialogX = (props: ButtonProps) => (
  <Button
    slot="close"
    aria-label="Close"
    className="absolute top-2 right-2 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md bg-background pressed:bg-muted/50 text-muted-foreground outline-hidden hover:bg-muted/40 focus-visible:ring-4 focus-visible:ring-ring"
    {...props}
  >
    <IconX />
  </Button>
)

export {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogX,
  modalStyle,
  popoverStyle,
  sheetStyle,
}
