

import type { ComponentProps, ReactNode } from "react"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { cva } from "class-variance-authority"
import { cn } from "cn"
import {
  CalendarCell,
  type CalendarCellRenderProps,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarHeading,
  CalendarMonthPicker,
  type CalendarProps,
  CalendarYearPicker,
  type DateValue,
  Calendar as RACCalendar
} from "react-aria-components/Calendar"
import { RangeCalendar as RACRangeCalendar, type RangeCalendarProps } from "react-aria-components/RangeCalendar"
import { Button, buttonVariants } from "./button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select"

const cellVariants = cva(
  "group/day relative mt-2 aspect-square h-full w-full cursor-default rounded-(--cell-radius) p-0 text-center select-none [&:is(:last-child>[data-selected=true])>div]:rounded-r-(--cell-radius)",
  {
    variants: {
      showWeekNumber: {
        false: "[&:is(:first-child>[data-selected=true])>div]:rounded-l-(--cell-radius)",
        true: "[&:is(:nth-child(2)>[data-selected=true])>div]:rounded-l-(--cell-radius)"
      },
      isToday: {
        true: "bg-muted text-foreground rounded-(--cell-radius) data-[selected=true]:rounded-none"
      },
      isSelectionStart: {
        true: "bg-muted after:bg-muted relative isolate z-0 rounded-l-(--cell-radius) after:absolute after:inset-y-0 after:right-0 after:w-4"
      },
      isSelectionEnd: {
        true: "bg-muted after:bg-muted relative isolate z-0 rounded-r-(--cell-radius) after:absolute after:inset-y-0 after:left-0 after:w-4"
      },
      isUnavailable: {
        true: "text-muted-foreground opacity-50 [&>div]:line-through"
      },
      isDisabled: {
        true: "text-muted-foreground opacity-50"
      },
      isOutsideMonth: {
        true: "text-muted-foreground aria-selected:text-muted-foreground"
      }
    }
  }
)

const Calendar = <T extends DateValue, M extends "single" | "multiple" = "single">(
  props: Omit<CalendarProps<T, M>, "visibleDuration"> & {
    buttonVariant?: ComponentProps<typeof Button>["variant"]
    captionLayout?: "label" | "dropdown"
    numberOfMonths?: number
    showWeekNumber?: boolean
    headerFormat?: Intl.DateTimeFormatOptions
    renderCell?: (
      renderProps: CalendarCellRenderProps & {
        defaultChildren: ReactNode
      }
    ) => ReactNode
  }
) => (
  <RACCalendar
    {...props}
    className={cn(
      "group/calendar bg-background w-fit p-2 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(7)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
      props.className
    )}
    data-slot="calendar"
    visibleDuration={{ months: props.numberOfMonths || 1 }}
  >
    <CalendarInner {...props} />
  </RACCalendar>
)

const RangeCalendar = <T extends DateValue>(
  props: RangeCalendarProps<T> & {
    buttonVariant?: ComponentProps<typeof Button>["variant"]
    captionLayout?: "label" | "dropdown"
    headerFormat?: Intl.DateTimeFormatOptions
    numberOfMonths?: number
    showWeekNumber?: boolean
    renderCell?: (
      renderProps: CalendarCellRenderProps & {
        defaultChildren: ReactNode
      }
    ) => ReactNode
  }
) => (
  <RACRangeCalendar
    {...props}
    className={cn(
      "group/calendar bg-background w-fit p-2 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(7)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
      props.className
    )}
    data-slot="calendar"
    visibleDuration={{ months: props.numberOfMonths || 1 }}
  >
    <CalendarInner {...props} isRange />
  </RACRangeCalendar>
)

const CalendarInner = ({
  captionLayout = "label",
  buttonVariant = "ghost",
  numberOfMonths = 1,
  showWeekNumber = false,
  headerFormat,
  renderCell,
  isRange
}: {
  buttonVariant?: ComponentProps<typeof Button>["variant"]
  captionLayout?: "label" | "dropdown"
  numberOfMonths?: number
  showWeekNumber?: boolean
  headerFormat?: Intl.DateTimeFormatOptions
  renderCell?: (renderProps: CalendarCellRenderProps & { defaultChildren: ReactNode }) => ReactNode
  isRange?: boolean
}) => (
  <div className="relative flex flex-col gap-4 md:flex-row">
    <header className="absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1">
      <Button
        className="size-(--cell-size) p-0 select-none aria-disabled:opacity-50"
        slot="previous"
        variant={buttonVariant}
      >
        <IconChevronLeft className="size-4" />
      </Button>
      <Button
        className="size-(--cell-size) p-0 select-none aria-disabled:opacity-50"
        slot="next"
        variant={buttonVariant}
      >
        <IconChevronRight className="size-4" />
      </Button>
    </header>
    {Array.from({ length: numberOfMonths }, (_, i) => (
      <div className="flex w-full flex-col gap-4" key={i}>
        <div className="flex h-(--cell-size) w-full items-center justify-center gap-1 px-(--cell-size)">
          {captionLayout === "dropdown" ? (
            <>
              <MonthDropdown format={headerFormat} />
              <YearDropdown format={headerFormat} />
            </>
          ) : (
            <CalendarHeading className="text-sm font-medium select-none" format={headerFormat} offset={{ months: i }} />
          )}
        </div>
        <CalendarGrid className="w-full border-collapse" offset={{ months: i }}>
          <CalendarGridHeader>
            {(day) => (
              <CalendarHeaderCell className="text-muted-foreground rounded-(--cell-radius) text-[0.8rem] font-normal select-none">
                {day}
              </CalendarHeaderCell>
            )}
          </CalendarGridHeader>
          <CalendarGridBody>
            {(date) => (
              <CalendarCell className={(renderProps) => cellVariants({ ...renderProps, showWeekNumber })} date={date}>
                {(renderProps) => (
                  <div
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "data-[range-end=true]:bg-primary data-[range-middle=true]:bg-muted data-[range-start=true]:bg-primary data-[selected-single=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:text-foreground data-[range-start=true]:text-primary-foreground data-[selected-single=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-foreground relative isolate z-10 flex aspect-square h-full w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-r-(--cell-radius) data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-l-(--cell-radius) [&>span]:text-xs [&>span]:opacity-70"
                    )}
                    data-range-end={renderProps.isSelectionEnd && isRange}
                    data-range-middle={
                      renderProps.isSelected && !renderProps.isSelectionStart && !renderProps.isSelectionEnd && isRange
                    }
                    data-range-start={renderProps.isSelectionStart && isRange}
                    data-selected-single={renderProps.isSelected && !isRange}
                  >
                    {renderCell ? renderCell(renderProps) : renderProps.defaultChildren}
                  </div>
                )}
              </CalendarCell>
            )}
          </CalendarGridBody>
        </CalendarGrid>
      </div>
    ))}
  </div>
)

const MonthDropdown = ({ format }: { format?: Intl.DateTimeFormatOptions }) => (
  <CalendarMonthPicker format={format?.month}>
    {(props) => (
      <Select {...props} className="relative">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="min-w-0">
          <SelectGroup>
            {props.items.map((item) => (
              <SelectItem id={item.id} key={item.id}>
                {item.formatted}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )}
  </CalendarMonthPicker>
)

const YearDropdown = ({ format }: { format?: Intl.DateTimeFormatOptions }) => (
  <CalendarYearPicker format={format}>
    {(props) => (
      <Select {...props} className="relative">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="min-w-0">
          {props.items.map((item) => (
            <SelectItem id={item.id} key={item.id}>
              {item.formatted}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )}
  </CalendarYearPicker>
)

export { Calendar, RangeCalendar }
