

import type { ComponentProps } from "react"
import { cn } from "cn"
import { Heading } from "react-aria-components/Dialog"
import {
  DialogTrigger,
  type DialogTriggerProps,
  Popover as RACPopover,
  type PopoverProps as RACPopoverProps
} from "react-aria-components/Popover"

const Popover = (props: DialogTriggerProps) => <DialogTrigger data-slot="popover-trigger" {...props} />

const PopoverContent = ({
  className,
  placement = "bottom",
  offset = 4,
  crossOffset = 0,
  ...props
}: Omit<RACPopoverProps, "className"> & {
  className?: string
}) => (
  <RACPopover
    className={cn(
      "bg-popover text-popover-foreground data-entering:animate-in data-exiting:animate-out data-exiting:fade-out-0 data-entering:fade-in-0 data-exiting:zoom-out-95 data-entering:zoom-in-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 ring-foreground/10 z-50 flex w-72 origin-(--trigger-anchor-point) flex-col gap-2.5 rounded-lg p-2.5 text-sm shadow-md ring-1 outline-hidden duration-100",
      className
    )}
    crossOffset={crossOffset}
    data-slot="popover-content"
    offset={offset}
    placement={placement}
    {...props}
  />
)

const PopoverHeader = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("flex flex-col gap-0.5 text-sm", className)} data-slot="popover-header" {...props} />
)

const PopoverTitle = ({ className, ...props }: ComponentProps<typeof Heading>) => (
  <Heading className={cn("font-medium", className)} data-slot="popover-title" {...props} />
)

const PopoverDescription = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("text-muted-foreground", className)} data-slot="popover-description" {...props} />
)

Popover.Description = PopoverDescription
Popover.Header = PopoverHeader
Popover.Title = PopoverTitle
Popover.Content = PopoverContent

export { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle }
