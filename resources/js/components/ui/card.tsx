import type { ComponentProps } from "react"
import { cn } from "cn"

const Card = ({ className, size = "default", ...props }: ComponentProps<"div"> & { size?: "default" | "sm" }) => (
  <div
    className={cn(
      "ring-foreground/10 bg-card text-card-foreground group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl py-(--card-spacing) text-sm ring-1 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
      className
    )}
    data-size={size}
    data-slot="card"
    {...props}
  />
)

const CardHeader = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
      className
    )}
    data-slot="card-header"
    {...props}
  />
)

const CardTitle = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn("text-base leading-snug font-medium group-data-[size=sm]/card:text-sm", className)}
    data-slot="card-title"
    {...props}
  />
)

const CardDescription = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("text-muted-foreground text-sm", className)} data-slot="card-description" {...props} />
)

const CardAction = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
    data-slot="card-action"
    {...props}
  />
)

const CardContent = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("px-(--card-spacing)", className)} data-slot="card-content" {...props} />
)

const CardFooter = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn("bg-muted/50 flex items-center rounded-b-xl border-t p-(--card-spacing)", className)}
    data-slot="card-footer"
    {...props}
  />
)

Card.Header = CardHeader
Card.Footer = CardFooter
Card.Title = CardTitle
Card.Action = CardAction
Card.Description = CardDescription
Card.Content = CardContent

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
