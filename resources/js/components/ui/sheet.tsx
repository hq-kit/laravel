import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"
import type {
  ButtonProps,
  DialogProps,
  DialogTriggerProps,
  ModalOverlayProps,
} from "react-aria-components"
import { Button, Modal, DialogTrigger as SheetTrigger } from "react-aria-components"
import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogX,
  sheetStyle,
} from "./dialog"

const Sheet = (props: DialogTriggerProps) => {
  return <SheetTrigger {...props} />
}

interface SheetContentProps
  extends Omit<ComponentProps<typeof Modal>, "children">,
    Omit<ModalOverlayProps, "className" | "children"> {
  "aria-label"?: DialogProps["aria-label"]
  "aria-labelledby"?: DialogProps["aria-labelledby"]
  role?: DialogProps["role"]
  closeButton?: boolean
  side?: "top" | "bottom" | "left" | "right"
  children?: DialogProps["children"]
}

const SheetContent = ({
  side = "right",
  role = "dialog",
  closeButton = true,
  className,
  children,
  ...props
}: SheetContentProps) => {
  const isDismissable = role !== "alertdialog"
  return (
    <DialogOverlay isDismissable={isDismissable} {...props}>
      <Modal
        className={sheetStyle({
          side,
          className: side === "top" || side === "bottom" ? "h-fit" : "h-full",
        })}
        {...props}
      >
        <Dialog
          role={role}
          aria-label={props["aria-label"] ?? "Sheet"}
          className={cn(
            "relative flex flex-col overflow-hidden outline-hidden",
            side === "top" || side === "bottom"
              ? "max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding))]"
              : "h-full max-h-screen",
          )}
        >
          {(values) => (
            <>
              {typeof children === "function" ? children(values) : children}
              {closeButton && isDismissable && <DialogX />}
            </>
          )}
        </Dialog>
      </Modal>
    </DialogOverlay>
  )
}

Sheet.Trigger = (props: ButtonProps) => <Button {...props} />

Sheet.Content = SheetContent

Sheet.Header = DialogHeader
Sheet.Title = DialogTitle
Sheet.Description = DialogDescription
Sheet.Body = DialogBody
Sheet.Footer = DialogFooter

export { Sheet, SheetContent }
