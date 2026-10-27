import type { VariantProps } from "class-variance-authority"
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react"
import { cn } from "cn"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  type InputProps,
  type NumberFieldProps,
  NumberField as RACNumberField
} from "react-aria-components/NumberField"
import { fieldVariants } from "./field"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./input"

const NumberField = ({
  className,
  orientation = "vertical",
  ...props
}: NumberFieldProps & VariantProps<typeof fieldVariants>) => (
  <RACNumberField
    className={composeRenderProps(className, (className) => cn(fieldVariants({ orientation }), className))}
    data-orientation={orientation}
    data-slot="field"
    {...props}
  />
)

const NumberInput = ({ className, ...props }: Omit<InputProps, "type">) => (
  <InputGroup className="overflow-hidden">
    <InputGroupInput {...props} />
    <InputGroupAddon align="inline-end" className="-mr-0.5 flex h-[calc(100%+4px)] flex-col gap-0 -space-y-0.5 p-0">
      <InputGroupButton className="h-1/2 w-8 rounded-none" slot="increment" variant="outline">
        <IconChevronUp />
        <span className="sr-only">Increment</span>
      </InputGroupButton>
      <InputGroupButton className="h-1/2 w-8 rounded-none" slot="decrement" variant="outline">
        <IconChevronDown />
        <span className="sr-only">Decrement</span>
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
)

export { NumberField, NumberInput }
