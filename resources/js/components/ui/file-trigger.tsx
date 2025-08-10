import type { ReactNode, RefObject } from "react"

import {
  FileTrigger as RACFileTrigger,
  type FileTriggerProps as RACFileTriggerProps,
} from "react-aria-components"
import type { VariantProps } from "tailwind-variants"

import { Button, type buttonStyle } from "./button"

interface FileTriggerProps extends RACFileTriggerProps, VariantProps<typeof buttonStyle> {
  isDisabled?: boolean
  ref?: RefObject<HTMLInputElement>
}

const FileTrigger = ({
  variant,
  size,
  ref,
  isDisabled,
  isPending,
  children,
  ...props
}: Omit<FileTriggerProps, "children"> & { children: ReactNode }) => {
  return (
    <RACFileTrigger ref={ref} {...props}>
      <Button isDisabled={isDisabled} isPending={isPending} size={size} variant={variant}>
        {children}
      </Button>
    </RACFileTrigger>
  )
}

export { FileTrigger }
export type { FileTriggerProps }
