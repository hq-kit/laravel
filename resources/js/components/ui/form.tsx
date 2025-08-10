import type { ReactNode, Ref } from "react"

import type {
  FieldErrorProps,
  FormProps,
  GroupProps,
  InputProps,
  LabelProps,
  TextProps,
  ValidationResult,
} from "react-aria-components"
import {
  Group,
  FieldError as RACFieldError,
  Form as RACForm,
  Input as RACInput,
  Label as RACLabel,
  Text,
  composeRenderProps,
} from "react-aria-components"

import { tv } from "tailwind-variants"

const fieldGroupStyle = tv({
  base: [
    "flex h-9 items-center rounded-md border border-input bg-transparent shadow-xs transition dark:bg-input/30",
    "hover:border-ring group-invalid/field:hover:border-destructive/70!",
    "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",
    "group-open/field:border-ring group-open/field:ring-[3px] group-open/field:ring-ring/50",
    "group-has-focus-visible/field:border-ring group-has-focus-visible/field:ring-[3px] group-has-focus-visible/field:ring-ring/50",
    "group-has-focus-within/field:border-ring group-has-focus-within/field:ring-[3px] group-has-focus-within/field:ring-ring/50",
    "group-has-focus/field:border-ring group-has-focus/field:ring-[3px] group-has-focus/field:ring-ring/50",
    "group-invalid/field:group-open/field:ring-destructive/20 group-invalid/field:group-has-focus-visible/field:ring-destructive/20 group-invalid/field:group-has-focus-within/field:ring-destructive/20 group-invalid/field:group-has-focus/field:ring-destructive/20",
    "group-invalid/field:group-open/field:border-destructive/70 group-invalid/field:group-has-focus-visible/field:border-destructive/70 group-invalid/field:group-has-focus-within/field:border-destructive/70 group-invalid/field:group-has-focus/field:border-destructive/70",
    "**:[input]:w-full **:[input]:p-2 **:[input]:text-base **:[input]:outline-hidden sm:**:[input]:text-sm",
    "disabled:pointer-events-none",
  ],
})

const labelStyle = tv({
  base: [
    "w-fit cursor-default font-medium text-foreground text-sm leading-none transition-colors focus:text-primary",
    "group-open/field:text-primary group-has-focus-visible/field:text-primary group-has-focus-within/field:text-primary group-has-focus/field:text-primary group-has-pressed/field:text-primary",
    "group-invalid/field:text-destructive! group-disabled/field:text-muted-foreground! group-has-invalid/field:text-destructive!",
    "group-disabled/field:text-muted-foreground group-has-disabled/field:text-muted-foreground",
  ],
})

const descriptionStyle = tv({
  base: "text-pretty text-muted-foreground text-sm",
})

const errorStyle = tv({
  base: "text-destructive text-sm/5",
})

const Form = (props: FormProps) => <RACForm {...props} />

interface FieldProps {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string) | ReactNode
}

const Label = ({ className, ...props }: LabelProps) => (
  <RACLabel slot="label" {...props} className={labelStyle({ className })} />
)

const Description = ({ className, ...props }: TextProps) => (
  <Text {...props} slot="description" className={descriptionStyle({ className })} />
)

const FieldError = ({ className, ...props }: FieldErrorProps) => {
  return Array.isArray(props.children) ? (
    <RACFieldError
      {...props}
      className={composeRenderProps(className, (className) => errorStyle({ className }))}
    >
      <ul className="list-inside list-disc">
        {props.children.map((child, index) => (
          <li key={index}>{child}</li>
        ))}
      </ul>
    </RACFieldError>
  ) : (
    <RACFieldError
      {...props}
      className={composeRenderProps(className, (className) => errorStyle({ className }))}
    />
  )
}

const FieldGroup = ({ className, ref, ...props }: GroupProps & { ref?: Ref<HTMLDivElement> }) => {
  return (
    <Group
      ref={ref}
      className={composeRenderProps(className, (className) => fieldGroupStyle({ className }))}
      {...props}
    />
  )
}

const Input = ({ className, ref, ...props }: InputProps & { ref?: Ref<HTMLInputElement> }) => (
  <RACInput ref={ref} {...props} />
)

export {
  Description,
  FieldError,
  FieldGroup,
  Input,
  Label,
  descriptionStyle,
  errorStyle,
  fieldGroupStyle,
  labelStyle,
  type FieldProps,
}

export { Form }
