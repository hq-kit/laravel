

import type { VariantProps } from "class-variance-authority"
import type { Ref } from "react"
import { IconCamera, IconFolder, IconPaperclip } from "@tabler/icons-react"
import {
  FileTrigger as RACFileTrigger,
  type FileTriggerProps as RACFileTriggerProps
} from "react-aria-components/FileTrigger"
import { Button, type buttonVariants } from "./button"

interface FileTriggerProps extends RACFileTriggerProps, VariantProps<typeof buttonVariants> {
  isDisabled?: boolean
  isPending?: boolean
  ref?: Ref<HTMLInputElement>
  className?: string
}

const FileTrigger = ({ variant = "outline", size = "md", ref, className, ...props }: FileTriggerProps) => (
  <RACFileTrigger ref={ref} {...props}>
    <Button
      className={className}
      isDisabled={props.isDisabled}
      isPending={props.isPending}
      size={size}
      variant={variant}
    >
      {props.defaultCamera ? <IconCamera /> : props.acceptDirectory ? <IconFolder /> : <IconPaperclip />}
      {props.children}
    </Button>
  </RACFileTrigger>
)

export { FileTrigger, type FileTriggerProps }
