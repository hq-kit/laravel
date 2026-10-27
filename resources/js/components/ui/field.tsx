

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { type ComponentProps, type ReactNode, useMemo } from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { type FieldErrorProps, FieldError as RACFieldError } from "react-aria-components/FieldError"
import { type FormProps, Form as RACForm } from "react-aria-components/Form"
import { LabelContext, type LabelProps, Label as RACLabel } from "react-aria-components/Label"
import { Text, type TextProps } from "react-aria-components/Text"
import { Separator as RACSeparator } from "./separator"

const Form = (props: FormProps) => <RACForm {...props} />

const FieldSet = ({ className, ...props }: ComponentProps<"fieldset">) => (
  <fieldset
    className={cn(
      "flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
      className
    )}
    data-slot="field-set"
    {...props}
  />
)

const Legend = ({
  className,
  variant = "legend",
  ...props
}: ComponentProps<"legend"> & { variant?: "legend" | "label" }) => (
  <legend
    className={cn("mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base", className)}
    data-slot="field-legend"
    data-variant={variant}
    {...props}
  />
)

const FieldGroup = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4",
      className
    )}
    data-slot="field-group"
    {...props}
  />
)

const fieldVariants = cva(
  "hover:not-data-disabled:not-in-data-disabled:**:[[slot=control]]:border-ring! data-[invalid=true]:text-destructive gap-2 group/field flex w-full has-data-invalid:text-destructive data-invalid:text-destructive",
  {
    variants: {
      orientation: {
        vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
        horizontal:
          "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[slot=control]]:mt-px",
        responsive:
          "@md/field-group:flex-row flex-col @md/field-group:items-center *:w-full @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[slot=checkbox],[slot=radio]]:mt-px"
      }
    },
    defaultVariants: {
      orientation: "vertical"
    }
  }
)

const Field = ({
  className,
  orientation = "vertical",
  ...props
}: ComponentProps<"div"> & VariantProps<typeof fieldVariants>) => (
  <div
    className={cn(fieldVariants({ orientation }), className)}
    data-orientation={orientation}
    data-slot="field"
    {...props}
  />
)

const Label = ({ className, htmlFor, slot, ...props }: LabelProps) => {
  const label = (
    <RACLabel
      className={cn(
        "in-data-disabled:pointer-events-none flex in-data-disabled:cursor-not-allowed select-none items-center gap-2 font-medium text-sm leading-snug peer-disabled:opacity-50 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border has-group-data-selected/field:border-primary/30 has-group-data-selected/field:bg-primary/5 *:data-[slot=field]:p-2.5 group-data-[disabled=true]/field:opacity-50 group-data-[disabled=true]:opacity-50 dark:has-group-data-selected/field:border-primary/20 dark:has-group-data-selected/field:bg-primary/10",
        "group/field-label peer/field-label flex w-fit",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
        className
      )}
      data-slot="field-label"
      htmlFor={htmlFor}
      slot={slot}
      {...props}
    />
  )

  if (htmlFor && slot === undefined) {
    return <LabelContext.Provider value={null}>{label}</LabelContext.Provider>
  }

  return label
}

const Title = ({ className, ...props }: LabelProps) => (
  <RACLabel
    className={cn(
      "flex w-fit items-center gap-2 font-medium text-sm group-data-[disabled=true]/field:opacity-50",
      className
    )}
    data-slot="field-label"
    {...props}
  />
)

const Description = ({ className, ...props }: TextProps) => (
  <Text
    className={cn(
      "text-left font-normal text-muted-foreground text-sm leading-normal group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5",
      "nth-last-2:-mt-1 last:mt-0",
      "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
      className
    )}
    data-slot="field-description"
    slot="description"
    {...props}
  />
)

const Separator = ({
  children,
  className,
  ...props
}: ComponentProps<"div"> & {
  children?: ReactNode
}) => (
  <div
    className={cn("relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2", className)}
    data-content={!!children}
    data-slot="field-separator"
    {...props}
  >
    <RACSeparator className="absolute inset-0 top-1/2" />
    {children && (
      <span
        className="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
        data-slot="field-separator-content"
      >
        {children}
      </span>
    )}
  </div>
)

const FieldError = (props: FieldErrorProps) => {
  return (
    <RACFieldError
      className={composeRenderProps(props.className, (className) =>
        cn("font-normal text-destructive text-sm", className)
      )}
      data-slot="field-error"
      {...props}
    />
  )
}

const FieldErrorNative = ({
  className,
  children,
  errors,
  ...props
}: ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) => {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()]

    if (uniqueErrors?.length === 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map((error, index) => error?.message && <li key={index}>{error.message}</li>)}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      className={cn("font-normal text-destructive text-sm", className)}
      data-slot="field-error"
      role="alert"
      {...props}
    >
      {content}
    </div>
  )
}

Field.Label = Label
Field.Description = Description
Field.Error = FieldError
Field.Group = FieldGroup
Field.Legend = Legend
Field.Separator = Separator
Field.Set = FieldSet
Field.Title = Title
Field.ErrorNative = FieldErrorNative

export {
  Description,
  Field,
  FieldError,
  FieldErrorNative,
  FieldGroup,
  FieldSet,
  Form,
  fieldVariants,
  Label,
  Legend,
  Separator,
  Title
}
