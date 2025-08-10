import { cn } from "@/lib/utils"

import { IconLoader, IconSearch, IconX } from "@tabler/icons-react"
import type { Ref } from "react"
import {
  Button,
  Input,
  SearchField as RACSearchField,
  type SearchFieldProps as RACSearchFieldProps,
  composeRenderProps,
} from "react-aria-components"
import { Description, FieldError, FieldGroup, type FieldProps, Label } from "./form"

interface SearchFieldProps extends RACSearchFieldProps, FieldProps {
  isPending?: boolean
  placeholder?: string
  ref?: Ref<HTMLDivElement>
}

const SearchField = ({
  className,
  placeholder,
  label,
  description,
  errorMessage,
  isPending,
  ref,
  ...props
}: SearchFieldProps) => {
  return (
    <RACSearchField
      aria-label={placeholder ?? props["aria-label"] ?? "Search..."}
      className={composeRenderProps(className, (className) =>
        cn("group/field flex flex-col gap-y-1.5", className),
      )}
      ref={ref}
      {...props}
    >
      {({ isEmpty }) => (
        <>
          {label && <Label>{label}</Label>}
          <FieldGroup isInvalid={props.isInvalid || !!errorMessage} isDisabled={props.isDisabled}>
            {isPending ? (
              <IconLoader className="ml-2 size-4 shrink-0 animate-spin text-muted-foreground" />
            ) : (
              <IconSearch className="ml-2 size-4 shrink-0 text-muted-foreground" />
            )}
            <Input
              placeholder={placeholder ?? "Search..."}
              className="[&::-webkit-search-cancel-button]:hidden"
            />
            {!isEmpty && (
              <Button
                type="button"
                aria-label="Clear"
                className="mr-2 inline-flex cursor-pointer items-center justify-center rounded-md text-muted-foreground outline-offset-4"
              >
                <IconX aria-hidden />
              </Button>
            )}
          </FieldGroup>
          {description && <Description>{description}</Description>}
          <FieldError>{errorMessage}</FieldError>
        </>
      )}
    </RACSearchField>
  )
}

export { SearchField }
