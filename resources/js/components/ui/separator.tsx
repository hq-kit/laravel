"use client"

import type { SeparatorProps } from "react-aria-components/Separator"
import { cn } from "cn"
import { Separator as RACSeparator } from "react-aria-components/Separator"

const Separator = ({ className, orientation = "horizontal", ...props }: SeparatorProps) => (
  <RACSeparator
    className={cn(
      "bg-border block shrink-0 border-0 aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=vertical]:w-px aria-[orientation=vertical]:self-stretch [:is(hr)]:h-px [:is(hr)]:w-full",
      className
    )}
    data-slot="separator"
    orientation={orientation}
    {...props}
  />
)

export { Separator }
