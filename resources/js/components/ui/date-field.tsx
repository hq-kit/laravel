import type { VariantProps } from "class-variance-authority"
import { type CalendarDate, getLocalTimeZone, parseDate, today } from "@internationalized/date"
import { IconChevronDown } from "@tabler/icons-react"
import { cn } from "cn"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  type DateFieldProps,
  type DateInputProps,
  DateSegment,
  type DateValue,
  DateField as RACDateField,
  DateInput as RACDateInput
} from "react-aria-components/DateField"
import { type DatePickerProps, DatePicker as RACDatePicker } from "react-aria-components/DatePicker"
import { type DateRangePickerProps, DateRangePicker as RACDateRangePicker } from "react-aria-components/DateRangePicker"
import { TimeField as RACTimeField, type TimeFieldProps, type TimeValue } from "react-aria-components/TimeField"
import { fieldVariants } from "./field"
import { InputGroup } from "./input"

const DateField = <T extends DateValue>({
  className,
  orientation = "vertical",
  ...props
}: DateFieldProps<T> & VariantProps<typeof fieldVariants>) => (
  <RACDateField
    className={composeRenderProps(className, (className) => cn(fieldVariants({ orientation }), className))}
    data-orientation={orientation}
    data-slot="field"
    {...props}
  />
)

const TimeField = <T extends TimeValue>({
  className,
  orientation = "vertical",
  ...props
}: TimeFieldProps<T> & VariantProps<typeof fieldVariants>) => (
  <RACTimeField
    className={composeRenderProps(className, (className) => cn(fieldVariants({ orientation }), className))}
    data-orientation={orientation}
    data-slot="field"
    {...props}
  />
)

const DatePicker = <T extends DateValue>({
  className,
  orientation = "vertical",
  ...props
}: DatePickerProps<T> & VariantProps<typeof fieldVariants>) => (
  <RACDatePicker
    className={composeRenderProps(className, (className) => cn(fieldVariants({ orientation }), className))}
    data-orientation={orientation}
    data-slot="field"
    {...props}
  />
)

const DateRangePicker = <T extends DateValue>({
  className,
  orientation = "vertical",
  ...props
}: DateRangePickerProps<T> & VariantProps<typeof fieldVariants>) => (
  <RACDateRangePicker
    className={composeRenderProps(className, (className) => cn(fieldVariants({ orientation }), className))}
    data-orientation={orientation}
    data-slot="field"
    {...props}
  />
)

const DateInput = ({ className, ...props }: Omit<DateInputProps, "children">) => {
  return (
    <RACDateInput
      className={composeRenderProps(className, (className) =>
        cn(
          "dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 data-focus-within:border-ring data-focus-within:ring-ring/50 placeholder:text-muted-foreground flex h-8 w-full min-w-0 items-center rounded-lg border bg-transparent px-2.5 py-1 text-base transition-[color,box-shadow,border] outline-none file:h-6 file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 data-focus-within:ring-3 md:text-sm",
          className
        )
      )}
      slot="control"
      {...props}
    >
      {(segment) =>
        segment.type === "literal" ? (
          <span aria-hidden className="text-muted-foreground p-0 select-none" suppressHydrationWarning>
            {segment.text}
          </span>
        ) : (
          <DateSegment
            className="data-placeholder:text-muted-foreground data-placeholder:focus:text-primary px-1 transition hover:outline focus:underline focus:outline-hidden"
            segment={segment}
          />
        )
      }
    </RACDateInput>
  )
}

const DatePickerInput = ({ className, ...props }: Omit<DateInputProps, "children">) => {
  return (
    <InputGroup>
      <RACDateInput
        className={composeRenderProps(className, (className) =>
          cn(
            "border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 inline-flex h-8 w-full min-w-0 items-center justify-center rounded-none border-0 bg-transparent px-2.5 py-1 text-base shadow-none ring-0 transition-[color,box-shadow,border] outline-none file:h-6 file:text-sm file:font-medium focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 md:text-sm dark:bg-transparent dark:disabled:bg-transparent",
            className
          )
        )}
        data-slot="input-group-control"
        {...props}
      >
        {(segment) =>
          segment.type === "literal" ? (
            <span aria-hidden className="text-muted-foreground p-0 select-none" suppressHydrationWarning>
              {segment.text}
            </span>
          ) : (
            <DateSegment
              className="data-placeholder:text-muted-foreground data-placeholder:focus:text-primary px-1 transition hover:outline focus:underline focus:outline-hidden"
              segment={segment}
            />
          )
        }
      </RACDateInput>
      <InputGroup.Addon align="inline-end">
        <InputGroup.Button data-slot="date-picker-trigger" size="icon-xs">
          <IconChevronDown className="size-4 shrink-0" />
        </InputGroup.Button>
      </InputGroup.Addon>
    </InputGroup>
  )
}

const DateRangePickerInput = ({ className, ...props }: Omit<DateInputProps, "children">) => {
  return (
    <InputGroup>
      <RACDateInput
        className={composeRenderProps(className, (className) =>
          cn(
            "border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 inline-flex h-8 w-full min-w-0 items-center justify-center rounded-none border-0 bg-transparent px-2.5 py-1 text-base shadow-none ring-0 transition-[color,box-shadow,border] outline-none file:h-6 file:text-sm file:font-medium focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 md:text-sm dark:bg-transparent dark:disabled:bg-transparent",
            className
          )
        )}
        data-slot="input-group-control"
        slot="start"
        {...props}
      >
        {(segment) =>
          segment.type === "literal" ? (
            <span aria-hidden className="text-muted-foreground p-0 select-none" suppressHydrationWarning>
              {segment.text}
            </span>
          ) : (
            <DateSegment
              className="data-placeholder:text-muted-foreground data-placeholder:focus:text-primary px-1 transition hover:outline focus:underline focus:outline-hidden"
              segment={segment}
            />
          )
        }
      </RACDateInput>
      <span
        aria-hidden="true"
        className="bg-foreground group-disabled/date-range-picker:text-opacity-50 pointer-events-none h-px w-2 shrink-0 rounded-[inherit]"
      />
      <RACDateInput
        className={composeRenderProps(className, (className) =>
          cn(
            "border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 inline-flex h-8 w-full min-w-0 items-center justify-center rounded-none border-0 bg-transparent px-2.5 py-1 text-base shadow-none ring-0 transition-[color,box-shadow,border] outline-none file:h-6 file:text-sm file:font-medium focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 md:text-sm dark:bg-transparent dark:disabled:bg-transparent",
            className
          )
        )}
        data-slot="input-group-control"
        slot="end"
        {...props}
      >
        {(segment) =>
          segment.type === "literal" ? (
            <span aria-hidden className="text-muted-foreground p-0 select-none" suppressHydrationWarning>
              {segment.text}
            </span>
          ) : (
            <DateSegment
              className="data-placeholder:text-muted-foreground data-placeholder:focus:text-primary px-1 transition hover:outline focus:underline focus:outline-hidden"
              segment={segment}
            />
          )
        }
      </RACDateInput>
      <InputGroup.Addon align="inline-end">
        <InputGroup.Button data-slot="date-picker-trigger" size="icon-xs">
          <IconChevronDown className="size-4 shrink-0" />
        </InputGroup.Button>
      </InputGroup.Addon>
    </InputGroup>
  )
}

export type { CalendarDate, DateValue }
export {
  DateField,
  DateInput,
  DatePicker,
  DatePickerInput,
  DateRangePicker,
  DateRangePickerInput,
  getLocalTimeZone,
  parseDate,
  TimeField,
  today
}
