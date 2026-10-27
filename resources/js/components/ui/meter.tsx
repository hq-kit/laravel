import { cn } from "cn"
import { type ComponentProps, createContext, use } from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { Label, type LabelProps } from "react-aria-components/Label"
import { type MeterProps, type MeterRenderProps, Meter as RACMeter } from "react-aria-components/Meter"

const MeterContext = createContext<MeterRenderProps | null>(null)

const Meter = ({ className, children, ...props }: MeterProps) => (
  <RACMeter
    className={composeRenderProps(className, (className) => cn("flex flex-wrap gap-3", className))}
    data-slot="meter"
    {...props}
  >
    {(values) => (
      <MeterContext value={{ ...values }}>
        {typeof children === "function" ? children(values) : children}
        <Meter.Track>
          <Meter.Indicator />
        </Meter.Track>
      </MeterContext>
    )}
  </RACMeter>
)

const MeterValue = ({ className, ...props }: Omit<ComponentProps<"span">, "children">) => {
  const ctx = use(MeterContext)
  return (
    <span
      className={cn("text-muted-foreground ml-auto text-sm tabular-nums", className)}
      data-slot="meter-value"
      {...props}
    >
      {ctx?.valueText}
    </span>
  )
}

const MeterLabel = ({ className, ...props }: LabelProps) => (
  <Label className={cn("text-sm font-medium", className)} data-slot="progress-label" {...props} />
)

const MeterTrack = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn("bg-muted relative flex h-1 w-full items-center overflow-x-hidden rounded-full", className)}
    data-slot="progress-track"
    {...props}
  />
)

const MeterIndicator = ({ className, ...props }: ComponentProps<"div">) => {
  const ctx = use(MeterContext)
  return (
    <div
      className={cn("h-full transition-all", className)}
      data-slot="progress-indicator"
      style={{
        width: `${ctx?.percentage}%`,
        backgroundColor: getMeterColor(Number(ctx?.percentage))
      }}
      {...props}
    />
  )
}

const getMeterColor = (value: number): string => {
  if (value < 50) return "var(--color-green-600)"
  if (value < 80) return "var(--color-orange-500)"
  return "var(--destructive)"
}

Meter.Track = MeterTrack
Meter.Value = MeterValue
Meter.Label = MeterLabel
Meter.Indicator = MeterIndicator

export { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue }
