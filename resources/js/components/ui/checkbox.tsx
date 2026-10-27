import type { VariantProps } from "class-variance-authority"
import { IconCheck, IconMinus } from "@tabler/icons-react"
import { cn } from "cn"
import { CheckboxButton, CheckboxField, type CheckboxFieldProps } from "react-aria-components/Checkbox"
import { type CheckboxGroupProps, CheckboxGroup as RACCheckboxGroup } from "react-aria-components/CheckboxGroup"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { fieldVariants, Label } from "./field"

const CheckboxGroup = ({
  className,
  orientation = "vertical",
  ...props
}: CheckboxGroupProps & VariantProps<typeof fieldVariants>) => {
  return (
    <RACCheckboxGroup
      {...props}
      className={composeRenderProps(className, (className) =>
        cn(
          "grid w-full gap-2",
          "has-data-invalid:text-destructive data-invalid:text-destructive",
          "data-[orientation=horizontal]:flex data-[orientation=horizontal]:flex-wrap data-[orientation=horizontal]:**:data-[slot=field-description]:w-full data-[orientation=horizontal]:**:data-[slot=field-label]:w-full",
          className
        )
      )}
      data-orientation={orientation}
      data-slot="field"
    />
  )
}

const Checkbox = ({ className, children, ...props }: CheckboxFieldProps) => {
  return (
    <CheckboxField
      className={composeRenderProps(className, (className) => cn("group/field", className))}
      data-slot="checkbox"
      {...props}
    >
      <CheckboxButton data-slot="checkbox">
        {composeRenderProps(children, (children) => (
          <div
            className={cn(
              fieldVariants({
                orientation: "horizontal",
                className: "in-data-invalid:text-destructive"
              })
            )}
          >
            <span
              className="border-input dark:bg-input/30 aria-invalid:aria-checked:border-primary aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 group-has-data-selected/field:bg-primary group-has-data-selected/field:text-primary-foreground dark:group-has-data-selected/field:bg-primary group-has-data-selected/field:border-primary group-has-data-focus-visible/field:border-ring group-has-data-focus-visible/field:ring-ring/50 group-has-data-invalid/field:group-has-data-selected/field:border-primary group-has-data-invalid/field:border-destructive dark:group-has-data-invalid/field:border-destructive/50 group-has-data-invalid/field:ring-destructive/20 dark:group-has-data-invalid/field:ring-destructive/40 peer relative flex size-4 shrink-0 items-center justify-center rounded border transition-colors outline-none group-disabled/field:cursor-not-allowed group-disabled/field:opacity-50 group-has-disabled/field:opacity-50 group-has-data-focus-visible/field:ring-3 group-has-data-invalid/field:ring-3 focus-visible:ring-3 aria-invalid:ring-3 [&>svg]:size-3.5"
              data-slot="checkbox-indicator"
              slot="control"
            >
              <IconMinus className="absolute scale-0 transition-transform in-data-indeterminate:scale-100 in-data-selected:scale-0" />
              <IconCheck className="absolute scale-0 transition-transform in-data-indeterminate:scale-0 in-data-selected:scale-100" />
            </span>
            {typeof children === "string" ? (
              <Label elementType="span">{children}</Label>
            ) : children ? (
              <div
                className="group/field-content flex flex-1 flex-col gap-0.5 leading-snug *:data-[slot=field-label]:leading-snug"
                data-slot="field-content"
              >
                {children}
              </div>
            ) : null}
          </div>
        ))}
      </CheckboxButton>
    </CheckboxField>
  )
}

export { Checkbox, CheckboxGroup }
