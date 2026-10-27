import { cn } from "cn"
import { type ComponentProps, useState } from "react"

const Avatar = ({
  className,
  size = "default",
  ...props
}: ComponentProps<"div"> & {
  size?: "default" | "sm" | "lg"
}) => (
  <div
    className={cn(
      "group/avatar after:border-border relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten",
      className
    )}
    data-size={size}
    data-slot="avatar"
    {...props}
  />
)

const AvatarImage = ({ className, ...props }: ComponentProps<"img">) => {
  const [state, setState] = useState<"loading" | "loaded" | "error">(props.src ? "loading" : "error")
  return (
    <img
      alt={props.alt || ""}
      className={cn("peer aspect-square size-full rounded-full object-cover data-[state=error]:hidden", className)}
      data-slot="avatar-image"
      data-state={state}
      onError={() => setState("error")}
      onLoad={() => setState("loaded")}
      {...props}
    />
  )
}

const AvatarFallback = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "bg-muted text-muted-foreground flex size-full shrink-0 items-center justify-center rounded-full text-sm group-data-[size=sm]/avatar:text-xs peer-data-[state=error]:flex peer-[*]:hidden",
      className
    )}
    data-slot="avatar-fallback"
    {...props}
  />
)

const AvatarBadge = ({ className, ...props }: ComponentProps<"span">) => (
  <span
    className={cn(
      "bg-primary text-primary-foreground ring-background absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-blend-color ring-2 select-none",
      "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
      "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
      "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
      className
    )}
    data-slot="avatar-badge"
    {...props}
  />
)

const AvatarGroup = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "group/avatar-group *:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2",
      className
    )}
    data-slot="avatar-group"
    {...props}
  />
)

const AvatarGroupCount = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "bg-muted text-muted-foreground ring-background relative flex size-8 shrink-0 items-center justify-center rounded-full text-sm ring-2 group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
      className
    )}
    data-slot="avatar-group-count"
    {...props}
  />
)

Avatar.Image = AvatarImage
Avatar.Fallback = AvatarFallback
Avatar.Group = AvatarGroup
Avatar.GroupCount = AvatarGroupCount
Avatar.Badge = AvatarBadge

export { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage }
