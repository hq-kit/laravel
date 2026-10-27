

import type { VariantProps } from "class-variance-authority"
import { IconLoader, IconSearch, IconX } from "@tabler/icons-react"
import { cn } from "cn"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  type InputProps,
  SearchField as RACSearchField,
  type SearchFieldProps
} from "react-aria-components/SearchField"
import { fieldVariants } from "./field"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./input"

const SearchField = ({
  className,
  isPending = false,
  orientation = "vertical",
  ...props
}: SearchFieldProps & VariantProps<typeof fieldVariants> & { isPending?: boolean }) => (
  <RACSearchField
    className={composeRenderProps(className, (className) => cn(fieldVariants({ orientation }), className))}
    data-orientation={orientation}
    data-pending={isPending}
    data-slot="field"
    {...props}
  />
)

const SearchInput = (props: Omit<InputProps, "type">) => (
  <InputGroup className={`${props.className}`}>
    <InputGroupAddon>
      <IconLoader
        aria-label="Loading"
        className="pointer-events-none hidden size-4 shrink-0 animate-spin in-data-[pending=true]:block"
        data-slot="loader"
        role="status"
      />
      <IconSearch className="in-data-[pending=true]:hidden" data-slot="input-group-addon" />
    </InputGroupAddon>
    <InputGroupInput className="[&::-webkit-search-cancel-button]:hidden" {...props} />
    <InputGroupAddon align="inline-end" className="group-data-empty/field:hidden">
      <InputGroupButton>
        <IconX />
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
)

export { SearchField, SearchInput }
