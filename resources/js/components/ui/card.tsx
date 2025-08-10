import { cn } from "@/lib/utils"
import type { ComponentPropsWithRef } from "react"

const Card = ({ className, ...props }: ComponentPropsWithRef<"div">) => {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm has-[table]:overflow-hidden not-has-[[slot=footer]]:**:[[slot=content]]:pb-6 **:[[slot=table]]:rounded-b-none **:[[slot=table]]:border-x-0",
        className,
      )}
      {...props}
    />
  )
}

interface HeaderProps extends ComponentPropsWithRef<"div"> {
  title?: string
  description?: string
}

const CardHeader = ({ className, title, description, children, ...props }: HeaderProps) => (
  <div
    slot="header"
    className={cn(
      "grid items-start gap-1.5 p-6 md:auto-rows-min md:grid-rows-[auto_auto] md:has-[[slot=action]]:grid-cols-[1fr_auto]",
      className,
    )}
    {...props}
  >
    {title && <CardTitle>{title}</CardTitle>}
    {description && <CardDescription>{description}</CardDescription>}
    {!title && typeof children === "string" ? <CardTitle>{children}</CardTitle> : children}
  </div>
)

const CardTitle = ({ className, ...props }: ComponentPropsWithRef<"div">) => {
  return (
    <div
      slot="title"
      className={cn("font-semibold text-lg leading-none tracking-tight", className)}
      {...props}
    />
  )
}

const CardDescription = ({ className, ...props }: ComponentPropsWithRef<"div">) => {
  return (
    <div
      slot="description"
      className={cn("text-muted-foreground text-sm md:row-start-2", className)}
      {...props}
    />
  )
}

const CardAction = ({ className, ...props }: ComponentPropsWithRef<"div">) => {
  return (
    <div
      slot="action"
      className={cn(
        "flex items-center gap-2 self-start justify-self-end md:col-start-2 md:row-span-2 md:row-start-1",
        className,
      )}
      {...props}
    />
  )
}

const CardContent = ({ className, ...props }: ComponentPropsWithRef<"div">) => {
  return <div slot="content" className={cn("px-6 has-[table]:p-0", className)} {...props} />
}

const CardFooter = ({ className, ...props }: ComponentPropsWithRef<"div">) => {
  return <div slot="footer" className={cn("flex items-center p-6", className)} {...props} />
}

Card.Content = CardContent
Card.Description = CardDescription
Card.Footer = CardFooter
Card.Header = CardHeader
Card.Title = CardTitle
Card.Action = CardAction

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
