import { cn } from "@/lib/utils"
import { type LinkProps, Link as RACLink, composeRenderProps } from "react-aria-components"

const Link = ({ className, ...props }: LinkProps) => {
  return (
    <RACLink
      {...props}
      className={composeRenderProps(className, (className) =>
        cn(
          "relative cursor-pointer rounded-lg text-sm outline-hidden transition",
          "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "disabled:cursor-default disabled:opacity-50",
          className,
        ),
      )}
    />
  )
}

export { Link }
