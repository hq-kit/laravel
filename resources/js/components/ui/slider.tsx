import type { ComponentProps } from "react"
import { cn } from "cn"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  Slider as RACSlider,
  SliderOutput as RACSliderOutput,
  SliderFill,
  type SliderProps,
  SliderThumb,
  SliderTrack
} from "react-aria-components/Slider"

const SliderGroup = ({ className, ...props }: ComponentProps<"div">) => (
  <div className="flex w-full items-center justify-between gap-x-3 *:data-[slot=icon]:size-5" {...props} />
)

const Slider = ({ className, children, ...props }: SliderProps) => (
  <RACSlider
    className={composeRenderProps(className, (className) =>
      cn(
        "group/slider relative flex touch-none flex-wrap gap-3 select-none data-disabled:opacity-50 data-[orientation=vertical]:min-h-40",
        "data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-center",
        className
      )
    )}
    data-slot="slider"
    {...props}
  >
    {({ state }) => (
      <>
        {children}
        <SliderTrack
          className="bg-muted relative block grow rounded-full select-none data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1"
          data-slot="slider-track"
        >
          <SliderFill className="bg-primary rounded-[inherit] select-none" data-slot="slider-range" />
          {state.values.map((_key, i) => (
            <SliderThumb
              className="border-ring ring-ring/50 relative size-3 rounded-full border bg-white transition-[color,box-shadow] select-none group-data-[orientation=horizontal]/slider:top-1/2 group-data-[orientation=vertical]/slider:left-1/2 after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 disabled:pointer-events-none disabled:opacity-50"
              data-slot="slider-thumb"
              index={i}
              key={i}
            />
          ))}
        </SliderTrack>
      </>
    )}
  </RACSlider>
)

const SliderOutput = ({ className, ...props }: ComponentProps<typeof RACSliderOutput>) => (
  <RACSliderOutput
    className={composeRenderProps(className, (className) =>
      cn(
        "text-muted-foreground ml-auto text-sm tabular-nums group-data-[orientation=vertical]/slider:mx-auto",
        className
      )
    )}
    {...props}
  />
)

Slider.Group = SliderGroup
Slider.Output = SliderOutput

export { Slider, SliderGroup, SliderOutput }
