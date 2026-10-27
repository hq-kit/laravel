import type { ComponentPropsWithRef } from "react"
import { cn } from "cn"

interface HeaderProps extends ComponentPropsWithRef<"header"> {
  title?: string
  description?: string
}

const Header = ({ title, description, className, children, ...props }: HeaderProps) => (
  <header
    className={cn(
      "group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
      className
    )}
    slot="header"
    {...props}
  >
    {title && <HeaderTitle>{title}</HeaderTitle>}
    {description && <HeaderDescription>{description}</HeaderDescription>}
    {!title && typeof children === "string" ? <HeaderTitle>{children}</HeaderTitle> : children}
  </header>
)

const HeaderTitle = ({ className, ...props }: ComponentPropsWithRef<"h3">) => (
  <h3 slot="title" {...props} className={cn("", className)} />
)

const HeaderDescription = ({ className, ...props }: ComponentPropsWithRef<"div">) => (
  <div className={cn("", className)} slot="description" {...props} />
)

const HeaderAction = ({ className, ...props }: ComponentPropsWithRef<"div">) => (
  <div
    className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
    slot="action"
    {...props}
  />
)

Header.Title = HeaderTitle
Header.Description = HeaderDescription
Header.Action = HeaderAction

export { Header, HeaderAction, HeaderDescription, HeaderTitle }
