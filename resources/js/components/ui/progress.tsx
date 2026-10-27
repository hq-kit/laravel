import { cn } from "cn"
import { type ComponentProps, createContext, use } from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { Label, type LabelProps } from "react-aria-components/Label"
import { ProgressBar, type ProgressBarProps, type ProgressBarRenderProps } from "react-aria-components/ProgressBar"

const ProgressContext = createContext<ProgressBarRenderProps | null>(null)

const Progress = ({ className, children, ...props }: ProgressBarProps) => (
  <ProgressBar
    className={composeRenderProps(className, (className) => cn("flex flex-wrap gap-3", className))}
    data-slot="progress"
    {...props}
  >
    {(values) => (
      <ProgressContext.Provider value={{ ...values }}>
        {typeof children === "function" ? children(values) : children}

        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </ProgressContext.Provider>
    )}
  </ProgressBar>
)

const ProgressValue = ({ className, ...props }: Omit<ComponentProps<"span">, "children">) => {
  const ctx = use(ProgressContext)

  return (
    <span
      className={cn("text-muted-foreground ml-auto text-sm tabular-nums", className)}
      data-slot="progress-value"
      {...props}
    >
      {ctx?.valueText}
    </span>
  )
}

const ProgressLabel = ({ className, ...props }: LabelProps) => (
  <Label className={cn("text-sm font-medium", className)} data-slot="progress-label" {...props} />
)

const ProgressTrack = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn("bg-muted relative flex h-1 w-full items-center overflow-x-hidden rounded-full", className)}
    data-slot="progress-track"
    {...props}
  />
)

const ProgressIndicator = ({ className, ...props }: ComponentProps<"div">) => {
  const ctx = use(ProgressContext)

  return (
    <>
      <style>{`
        @keyframes progress-slide {
          0% { inset-inline-start: 0% }
          50% { inset-inline-start: 100% }
          100% { inset-inline-start: 0% }
        }
      `}</style>

      <div
        className={cn(
          "bg-primary absolute h-full transition-all",
          ctx?.isIndeterminate && "animate-[progress-slide_2000ms_ease-in-out_infinite]",
          className
        )}
        data-slot="progress-indicator"
        style={{ width: `${ctx?.isIndeterminate ? 40 : ctx?.percentage}%` }}
        {...props}
      />
    </>
  )
}

Progress.Label = ProgressLabel
Progress.Value = ProgressValue
Progress.Track = ProgressTrack
Progress.Indicator = ProgressIndicator

export { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue }
