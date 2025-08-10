import { cn, fuzzyMatch } from "@/lib/utils"
import { IconChevronDown, IconLoader, IconSearch, IconX } from "@tabler/icons-react"
import type { ReactNode, Ref } from "react"
import type { SelectProps as RACSelectProps } from "react-aria-components"
import {
  Autocomplete,
  Button,
  Group,
  Input,
  ListBox,
  Select as RACSelect,
  SearchField,
  SelectValue,
  composeRenderProps,
} from "react-aria-components"
import { Description, FieldError, type FieldProps, Label, fieldGroupStyle } from "./form"
import { ListBoxDetails, ListBoxItem, ListBoxLabel, ListBoxSection } from "./list-box"
import { PopoverContent } from "./popover"

interface SelectProps<T extends object> extends Omit<RACSelectProps<T>, "children">, FieldProps {
  className?: string
  items?: Iterable<T>
  children: ReactNode | ((item: T) => ReactNode)
  prefix?: ReactNode
  searchable?: boolean
  isPending?: boolean
  ref?: Ref<HTMLDivElement>
}

const Select = <T extends object>({
  label,
  description,
  errorMessage,
  children,
  items,
  searchable = false,
  className,
  ref,
  ...props
}: SelectProps<T>) => {
  const renderOptions = (
    <ListBox
      renderEmptyState={() => (
        <div className="col-span-full p-4 text-center text-muted-foreground">No results found</div>
      )}
      aria-label="items"
      items={items}
      className="grid w-full grid-cols-[auto_1fr_1.5rem_0.5rem_auto] gap-y-1 overflow-y-auto rounded-md outline-hidden"
    >
      {children}
    </ListBox>
  )

  return (
    <RACSelect
      className={composeRenderProps(className, (className) =>
        cn("group/field flex flex-col gap-y-1.5", className),
      )}
      ref={ref}
      {...props}
    >
      {label && <Label>{label}</Label>}
      <Button
        className={fieldGroupStyle({
          className:
            "w-full gap-x-2 p-2 text-base outline-hidden! **:data-placeholder:text-muted-foreground sm:text-sm",
        })}
      >
        {props.prefix ? (
          <span className="ml-2 text-muted-foreground has-[button]:ml-0">{props.prefix}</span>
        ) : null}
        <SelectValue className="**:data-avatar:-mx-0.5 grid grid-cols-[auto_1fr] items-center text-base **:data-avatar:mr-2 **:data-[slot=description]:hidden **:data-avatar:size-6 sm:text-sm **:[svg]:mr-2" />
        <IconChevronDown
          data-slot="chevron"
          className="group-open/field:-rotate-180 ml-auto size-4 text-muted-foreground transition"
        />
      </Button>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <PopoverContent respectScreen={false} showArrow={false} trigger="focus" isPicker>
        {searchable ? (
          <Autocomplete filter={fuzzyMatch}>
            <SearchField autoFocus className="-mx-1 -mt-1 mb-1 border-b" aria-label="Search">
              {({ isEmpty }) => (
                <Group className="flex items-center px-2">
                  {props.isPending ? (
                    <IconLoader className="size-4 shrink-0 animate-spin text-muted-foreground" />
                  ) : (
                    <IconSearch className="size-4 shrink-0 text-muted-foreground" />
                  )}
                  <Input
                    className="w-full p-2 text-sm outline-hidden [&::-webkit-search-cancel-button]:hidden"
                    placeholder="Search..."
                  />
                  {!isEmpty && (
                    <Button
                      type="button"
                      aria-label="Clear"
                      className="mr-2 inline-flex items-center justify-center rounded-md text-muted-foreground outline-offset-4"
                    >
                      <IconX aria-hidden />
                    </Button>
                  )}
                </Group>
              )}
            </SearchField>
            {renderOptions}
          </Autocomplete>
        ) : (
          renderOptions
        )}
      </PopoverContent>
    </RACSelect>
  )
}

Select.Item = ListBoxItem
Select.Details = ListBoxDetails
Select.Section = ListBoxSection
Select.Label = ListBoxLabel

export { Select }
