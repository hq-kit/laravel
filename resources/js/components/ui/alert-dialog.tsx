

import type { ComponentProps, ReactNode } from "react"
import { cn } from "cn"
import {
  Dialog,
  DialogTrigger,
  type DialogTriggerProps,
  Heading,
  Modal,
  ModalOverlay,
  type ModalOverlayProps
} from "react-aria-components/Modal"
import { Button } from "./button"

const AlertDialog = ({ ...props }: DialogTriggerProps) => <DialogTrigger data-slot="alert-dialog-trigger" {...props} />

const AlertDialogOverlay = ({
  className,
  children,
  ...props
}: Omit<ModalOverlayProps, "className" | "children"> & {
  className?: string
  children: ReactNode
}) => (
  <ModalOverlay
    className={cn(
      "data-entering:animate-in data-exiting:animate-out data-exiting:fade-out-0 data-entering:fade-in-0 fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs",
      className
    )}
    data-slot="alert-dialog-overlay"
    {...props}
  >
    {children}
  </ModalOverlay>
)

const AlertDialogContent = ({
  className,
  size = "default",
  children,
  ...props
}: Omit<ModalOverlayProps, "className" | "children"> &
  Pick<ComponentProps<typeof Modal>, "isDismissable"> & {
    className?: string
    size?: "default" | "sm"
    children: ReactNode
  }) => (
  <AlertDialogOverlay {...props}>
    <Modal
      className={cn(
        "data-entering:animate-in data-exiting:animate-out data-exiting:fade-out-0 data-entering:fade-in-0 data-exiting:zoom-out-95 data-entering:zoom-in-95 bg-popover text-popover-foreground ring-foreground/10 group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl p-4 ring-1 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm",
        className
      )}
      data-size={size}
      data-slot="alert-dialog-content"
    >
      <Dialog className="[display:inherit] gap-[inherit] outline-none" data-slot="alert-dialog" role="alertdialog">
        {children}
      </Dialog>
    </Modal>
  </AlertDialogOverlay>
)

const AlertDialogHeader = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
      className
    )}
    data-slot="alert-dialog-header"
    {...props}
  />
)

const AlertDialogFooter = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "bg-muted/50 -mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t p-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
      className
    )}
    data-slot="alert-dialog-footer"
    {...props}
  />
)

const AlertDialogMedia = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "bg-muted mb-2 inline-flex size-10 items-center justify-center rounded-md sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6",
      className
    )}
    data-slot="alert-dialog-media"
    {...props}
  />
)

const AlertDialogTitle = ({ className, ...props }: Omit<ComponentProps<typeof Heading>, "slot">) => (
  <Heading
    className={cn(
      "text-base font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
      className
    )}
    data-slot="alert-dialog-title"
    slot="title"
    {...props}
  />
)

const AlertDialogDescription = ({ className, ...props }: Omit<ComponentProps<"div">, "slot">) => (
  <div
    className={cn(
      "text-muted-foreground *:[a]:hover:text-foreground text-sm text-balance md:text-pretty *:[a]:underline *:[a]:underline-offset-3",
      className
    )}
    data-slot="alert-dialog-description"
    {...props}
  />
)

const AlertDialogAction = ({ className, ...props }: ComponentProps<typeof Button>) => (
  <Button className={cn(className)} data-slot="alert-dialog-action" slot="close" {...props} />
)

const AlertDialogCancel = ({
  className,
  variant = "outline",
  size = "md",
  ...props
}: ComponentProps<typeof Button>) => (
  <Button
    className={cn(className)}
    data-slot="alert-dialog-cancel"
    size={size}
    slot="close"
    variant={variant}
    {...props}
  />
)

AlertDialog.Action = AlertDialogAction
AlertDialog.Cancel = AlertDialogCancel
AlertDialog.Description = AlertDialogDescription
AlertDialog.Footer = AlertDialogFooter
AlertDialog.Header = AlertDialogHeader
AlertDialog.Media = AlertDialogMedia
AlertDialog.Overlay = AlertDialogOverlay
AlertDialog.Title = AlertDialogTitle
AlertDialog.Content = AlertDialogContent

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogTitle
}
