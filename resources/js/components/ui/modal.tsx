import type { ComponentProps } from "react"

import type {
  ButtonProps,
  DialogProps,
  DialogTriggerProps,
  ModalOverlayProps,
} from "react-aria-components"
import { Button, DialogTrigger, Modal as RACModal } from "react-aria-components"

import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogX,
  modalStyle,
} from "./dialog"

const Modal = (props: DialogTriggerProps) => <DialogTrigger {...props} />

interface ModalContentProps
  extends Omit<ComponentProps<typeof RACModal>, "children">,
    Omit<ModalOverlayProps, "className" | "children"> {
  "aria-label"?: DialogProps["aria-label"]
  "aria-labelledby"?: DialogProps["aria-labelledby"]
  role?: DialogProps["role"]
  closeButton?: boolean
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full"
  children?: DialogProps["children"]
  className?: DialogProps["className"]
}

const ModalContent = ({
  size = "lg",
  role = "dialog",
  closeButton = true,
  className,
  children,
  ...props
}: ModalContentProps) => {
  const isDismissable = role !== "alertdialog"
  return (
    <DialogOverlay isDismissable={isDismissable} {...props}>
      <RACModal
        isDismissable={isDismissable}
        className={modalStyle({
          size,
        })}
        {...props}
      >
        <Dialog role={role} aria-label={props["aria-label"] ?? "Modal"} className={className}>
          {(values) => (
            <>
              {typeof children === "function" ? children(values) : children}
              {closeButton && isDismissable && <DialogX />}
            </>
          )}
        </Dialog>
      </RACModal>
    </DialogOverlay>
  )
}

const ModalTrigger = (props: ButtonProps) => <Button {...props} />
Modal.Trigger = ModalTrigger

Modal.Content = ModalContent

Modal.Header = DialogHeader
Modal.Title = DialogTitle
Modal.Description = DialogDescription
Modal.Footer = DialogFooter
Modal.Body = DialogBody

export { Modal, ModalContent }
export type { ModalContentProps }
