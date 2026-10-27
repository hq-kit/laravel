import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { type ButtonProps, Button as RACButton } from "react-aria-components/Button"
import { Button } from "./button"
import { Link, type LinkProps } from "./link"

const attachmentVariants = cva(
  "focus-within:ring-ring/50 group/attachment bg-card text-card-foreground has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 relative flex w-fit max-w-full min-w-0 shrink-0 flex-wrap rounded-xl border transition-colors focus-within:ring-1 data-[state=idle]:border-dashed",
  {
    variants: {
      size: {
        default:
          "gap-2 text-sm has-data-[slot=attachment-content]:px-2.5 has-data-[slot=attachment-content]:py-2 has-data-[slot=attachment-media]:p-2",
        sm: "gap-2.5 text-xs has-data-[slot=attachment-content]:px-2 has-data-[slot=attachment-content]:py-1.5 has-data-[slot=attachment-media]:p-1.5",
        xs: "gap-1.5 rounded-lg text-xs has-data-[slot=attachment-content]:px-1.5 has-data-[slot=attachment-content]:py-1 has-data-[slot=attachment-media]:p-1"
      },
      orientation: {
        horizontal: "min-w-40 items-center",
        vertical: "w-24 flex-col has-data-[slot=attachment-content]:w-30"
      }
    }
  }
)

const Attachment = ({
  className,
  state = "done",
  size = "default",
  orientation = "horizontal",
  ...props
}: ComponentProps<"div"> &
  VariantProps<typeof attachmentVariants> & {
    state?: "idle" | "uploading" | "processing" | "error" | "done"
  }) => {
  const resolvedOrientation = orientation ?? "horizontal"

  return (
    <div
      className={cn(attachmentVariants({ size, orientation }), className)}
      data-orientation={resolvedOrientation}
      data-size={size}
      data-slot="attachment"
      data-state={state}
      {...props}
    />
  )
}

const attachmentMediaVariants = cva(
  "bg-muted text-foreground group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive relative flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg group-data-[orientation=vertical]/attachment:w-full group-data-[size=sm]/attachment:w-8 group-data-[size=xs]/attachment:w-7 group-data-[size=xs]/attachment:rounded-md group-data-[orientation=vertical]/attachment:*:data-[slot=spinner]:size-6! [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 group-data-[orientation=vertical]/attachment:[&_svg:not([class*='size-'])]:size-6 group-data-[size=xs]/attachment:[&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        icon: "",
        image:
          "opacity-60 group-data-[state=done]/attachment:opacity-100 group-data-[state=idle]/attachment:opacity-100 *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover"
      }
    },
    defaultVariants: {
      variant: "icon"
    }
  }
)

const AttachmentMedia = ({
  className,
  variant = "icon",
  ...props
}: ComponentProps<"div"> & VariantProps<typeof attachmentMediaVariants>) => (
  <div
    className={cn(attachmentMediaVariants({ variant }), className)}
    data-slot="attachment-media"
    data-variant={variant}
    {...props}
  />
)

const AttachmentContent = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "max-w-full min-w-0 flex-1 leading-tight group-data-[orientation=vertical]/attachment:px-1",
      className
    )}
    data-slot="attachment-content"
    {...props}
  />
)

const AttachmentTitle = ({ className, ...props }: ComponentProps<"span">) => (
  <span
    className={cn(
      "group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer block max-w-full min-w-0 truncate font-medium",
      className
    )}
    data-slot="attachment-title"
    {...props}
  />
)

const AttachmentDescription = ({ className, ...props }: ComponentProps<"span">) => (
  <span
    className={cn(
      "text-muted-foreground group-data-[state=error]/attachment:text-destructive/80 mt-0.5 block min-w-0 truncate text-xs",
      "max-w-full",
      className
    )}
    data-slot="attachment-description"
    {...props}
  />
)

const AttachmentActions = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "relative z-20 flex shrink-0 items-center group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:top-3 group-data-[orientation=vertical]/attachment:right-3 group-data-[orientation=vertical]/attachment:gap-1",
      className
    )}
    data-slot="attachment-actions"
    {...props}
  />
)

const AttachmentAction = ({ className, variant, size = "icon-xs", ...props }: ComponentProps<typeof Button>) => (
  <Button className={cn(className)} data-slot="attachment-action" size={size} variant={variant ?? "ghost"} {...props} />
)

const AttachmentTrigger = ({
  className,
  type,
  ...props
}: Omit<LinkProps, "slot" | "className" | "ref"> & ButtonProps) => {
  const Comp = "href" in props ? Link : RACButton

  return (
    <Comp
      className={cn("absolute inset-0 z-10 outline-none", className)}
      data-slot="attachment-trigger"
      type={"href" in props ? undefined : (type ?? "button")}
      {...props}
    />
  )
}

const AttachmentGroup = ({
  className,
  orientation,
  layout,
  ...props
}: ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical"
  layout?: "grid" | "stack"
}) => (
  <div
    className={cn(
      "relative min-w-0 snap-x snap-mandatory scroll-px-1 scrollbar-none gap-3 overflow-auto overscroll-x-contain py-1 empty:flex empty:items-center empty:justify-center empty:text-sm empty:italic *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start",
      "data-[orientation=horizontal]:flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-nowrap data-[orientation=horizontal]:overflow-x-auto",
      "data-[orientation=vertical]:grid data-[orientation=vertical]:px-1",
      "data-[layout=grid]:grid data-[layout=grid]:not-data-[orientation=vertical]:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]",
      className
    )}
    data-layout={layout ?? "stack"}
    data-orientation={orientation ?? "horizontal"}
    data-slot="attachment-group"
    {...props}
  />
)
Attachment.Action = AttachmentAction
Attachment.Actions = AttachmentActions
Attachment.Content = AttachmentContent
Attachment.Description = AttachmentDescription
Attachment.Group = AttachmentGroup
Attachment.Media = AttachmentMedia
Attachment.Title = AttachmentTitle
Attachment.Trigger = AttachmentTrigger

export {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
  attachmentMediaVariants,
  attachmentVariants
}
