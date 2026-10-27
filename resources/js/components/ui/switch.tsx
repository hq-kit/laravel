

import { cn } from "cn"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { SwitchButton, SwitchField, type SwitchFieldProps } from "react-aria-components/Switch"
import { fieldVariants, Label } from "./field"

const Switch = ({
  children,
  size = "default",
  className,
  ...props
}: SwitchFieldProps & {
  size?: "sm" | "default"
}) => {
  return (
    <SwitchField
      className={composeRenderProps(className, (className) => cn(fieldVariants({ className })))}
      data-slot="switch-field"
      {...props}
    >
      <SwitchButton className={cn(fieldVariants({ orientation: "horizontal" }))} data-slot="switch">
        {composeRenderProps(children, (children) => (
          <>
            <div
              className={cn(
                "group-data-selected/field:bg-primary not-group-data-selected/field:bg-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 dark:not-group-data-selected/field:bg-input/80 peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none group-data-disabled/field:cursor-not-allowed group-data-disabled/field:opacity-50 after:absolute focus-visible:ring-3 aria-invalid:ring-3 data-[size=default]:h-[18.4px] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6",
                className
              )}
              data-size={size}
              data-slot="switch"
              slot="control"
            >
              <span
                className="bg-background dark:not-group-data-selected/field:bg-foreground dark:group-data-selected/field:bg-primary-foreground group-data-[size=default]/switch:not-group-data-selected/field:translate-x-0 group-data-[size=sm]/switch:not-group-data-selected/field:translate-x-0 pointer-events-none block rounded-full ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=default]/switch:group-data-selected/field:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:size-3 group-data-[size=sm]/switch:group-data-selected/field:translate-x-[calc(100%-2px)]"
                data-slot="switch-thumb"
              />
            </div>
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
          </>
        ))}
      </SwitchButton>
    </SwitchField>
  )
}

export { Switch }
