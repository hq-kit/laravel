import { useIsMobile } from "@/lib/hooks"
import type { CSSProperties, ReactNode, Ref } from "react"
import type {
  ButtonProps,
  DialogTriggerProps,
  ModalOverlayProps,
  PopoverProps,
} from "react-aria-components"
import {
  Button,
  DialogTrigger,
  Modal,
  OverlayArrow,
  Popover as RACPopover,
  composeRenderProps,
} from "react-aria-components"
import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  popoverStyle,
  sheetStyle,
} from "./dialog"

const Popover = (props: DialogTriggerProps) => <DialogTrigger {...props} />

interface PopoverContentProps
  extends Omit<ModalOverlayProps, "children" | "className">,
    Omit<PopoverProps, "children" | "className"> {
  style?: CSSProperties
  showArrow?: boolean
  respectScreen?: boolean
  isPicker?: boolean
  children: ReactNode
  className?: string | ((values: { defaultClassName?: string }) => string)
  ref?: Ref<HTMLDivElement>
}

const PopoverContent = ({
  showArrow = true,
  className,
  respectScreen = true,
  isPicker = false,
  children,
  ...props
}: PopoverContentProps) => {
  const isMobile = useIsMobile()
  return isMobile && respectScreen ? (
    <DialogOverlay isDismissable {...props}>
      <Modal
        className={composeRenderProps(className, (className, renderProps) =>
          sheetStyle({ ...renderProps, side: "bottom", className }),
        )}
        {...props}
      >
        <Dialog role="dialog" aria-label={props["aria-label"] ?? "Popover"}>
          {children}
        </Dialog>
      </Modal>
    </DialogOverlay>
  ) : (
    <RACPopover
      className={composeRenderProps(className, (className) =>
        popoverStyle({ isPicker, className }),
      )}
      {...props}
    >
      {showArrow && (
        <OverlayArrow className="group">
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            className="group-placement-left:-rotate-90 block fill-popover stroke-border group-placement-bottom:rotate-180 group-placement-right:rotate-90"
          >
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </RACPopover>
  )
}

Popover.Trigger = (props: ButtonProps) => <Button {...props} />

Popover.Content = PopoverContent

Popover.Header = DialogHeader
Popover.Title = DialogTitle
Popover.Description = DialogDescription
Popover.Body = DialogBody
Popover.Footer = DialogFooter

export { Popover, PopoverContent }
