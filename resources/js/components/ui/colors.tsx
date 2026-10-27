

import type { VariantProps } from "class-variance-authority"
import type { ComponentPropsWithoutRef } from "react"
import { cn } from "cn"
import {
  type Color,
  type ColorAreaProps,
  type ColorThumbProps,
  ColorArea as RACColorArea,
  ColorThumb as RACColorThumb
} from "react-aria-components/ColorArea"
import { type ColorFieldProps, ColorField as RACColorField } from "react-aria-components/ColorField"
import { ColorPicker as RACColorPicker } from "react-aria-components/ColorPicker"
import {
  type ColorSliderProps,
  ColorSlider as RACColorSlider,
  SliderOutput as RACSliderOutput,
  type SliderOutputProps
} from "react-aria-components/ColorSlider"
import { type ColorSwatchProps, ColorSwatch as RACColorSwatch } from "react-aria-components/ColorSwatch"
import {
  type ColorSwatchPickerItemProps,
  type ColorSwatchPickerProps,
  ColorSwatchPicker as RACColorSwatchPicker,
  ColorSwatchPickerItem as RACColorSwatchPickerItem
} from "react-aria-components/ColorSwatchPicker"
import { type ColorWheelProps, ColorWheelTrack, ColorWheel as RACColorWheel } from "react-aria-components/ColorWheel"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { SliderTrack } from "react-aria-components/Slider"
import { fieldVariants } from "./field"

const ColorPicker = RACColorPicker

const ColorField = ({
  className,
  orientation = "vertical",
  ...props
}: ColorFieldProps & VariantProps<typeof fieldVariants>) => (
  <RACColorField
    {...props}
    aria-label={props["aria-label"] ?? "Color field"}
    className={composeRenderProps(className, (className) => cn(fieldVariants({ orientation }), className))}
    data-orientation={orientation}
    data-slot="field"
  />
)

const ColorWheel = ({
  className,
  outerRadius = 100,
  innerRadius = 74,
  ...props
}: Omit<ColorWheelProps, "innerRadius" | "outerRadius"> & {
  innerRadius?: number
  outerRadius?: number
}) => (
  <RACColorWheel
    className={composeRenderProps(className, (className) => cn("relative", className))}
    innerRadius={innerRadius}
    outerRadius={outerRadius}
    {...props}
  >
    <ColorWheelTrack className="data-disabled:opacity-50 data-disabled:grayscale-50" />
    <ColorThumb className="rounded-full" />
  </RACColorWheel>
)

const ColorArea = ({ className, ...props }: ColorAreaProps) => (
  <RACColorArea
    className={composeRenderProps(className, (className) =>
      cn(
        "bg-muted size-48 shrink-0 rounded-md shadow-md data-disabled:opacity-50 data-disabled:grayscale-50",
        className
      )
    )}
    {...props}
  >
    <ColorThumb />
  </RACColorArea>
)

const ColorSlider = ({ className, children, ...props }: ColorSliderProps) => (
  <RACColorSlider
    className={composeRenderProps(className, (className) =>
      cn(
        "group/slider relative flex touch-none flex-wrap gap-3 select-none data-disabled:opacity-50 data-[orientation=vertical]:min-h-40",
        "data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-center",
        className
      )
    )}
    data-slot="color-slider"
    {...props}
  >
    {(values) => (
      <>
        {typeof children === "function" ? children(values) : children}
        <SliderTrack
          className="bg-muted-foreground relative block grow rounded-full select-none disabled:opacity-50 data-disabled:opacity-50 data-disabled:grayscale-50 data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1"
          data-slot="color-slider-track"
        >
          <ColorThumb data-slot="color-slider-thumb" />
        </SliderTrack>
      </>
    )}
  </RACColorSlider>
)

const ColorSliderOutput = ({ className, ...props }: SliderOutputProps) => (
  <RACSliderOutput
    className={composeRenderProps(className, (className) =>
      cn("text-muted-foreground ml-auto text-sm tabular-nums in-data-[orientation=vertical]:mx-auto", className)
    )}
    {...props}
  />
)

const ColorThumb = ({ className, ...props }: ColorThumbProps) => (
  <RACColorThumb
    className={composeRenderProps(className, (className) =>
      cn(
        "border-ring ring-ring/50 relative size-3 rounded-full border bg-white [box-shadow:0_0_0_1px_var(--background),inset_0_0_0_1px_var(--foreground)] transition-[color,box-shadow] select-none group-data-[orientation=horizontal]/slider:top-1/2 group-data-[orientation=vertical]/slider:left-1/2 after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 disabled:opacity-50",
        "data-dragging:bg-muted-foreground transition data-disabled:opacity-50 data-dragging:scale-120 data-focus-visible:scale-120",
        className
      )
    )}
    {...props}
  />
)

const ColorSwatchPicker = ({ className, ...props }: ColorSwatchPickerProps) => (
  <RACColorSwatchPicker
    className={composeRenderProps(className, (className) => cn("flex flex-wrap gap-2", className))}
    {...props}
  />
)

const ColorSwatchPickerItem = ({ className, children, ...props }: ColorSwatchPickerItemProps) => (
  <RACColorSwatchPickerItem
    className={composeRenderProps(className, (className) =>
      cn(
        "bg-muted relative rounded-md outline-hidden",
        "data-selected:ring-ring/20 data-selected:ring-3 data-selected:*:inset-ring-current/40",
        "data-focus-visible:ring-ring/20 data-focus-visible:opacity-80 data-focus-visible:*:inset-ring-current/40",
        "data-hovered:opacity-90",
        "data-disabled:opacity-50 data-disabled:grayscale-50",
        className
      )
    )}
    {...props}
  >
    {(values) => (
      <>
        {values.isSelected && (
          <span className="absolute top-0 left-0 box-border size-full rounded-[inherit] border-2 border-black outline-2 -outline-offset-4 outline-white dark:border-white dark:outline-black" />
        )}
        {values.isFocusVisible && (
          <span
            className="absolute top-1/2 left-1/2 size-1 -translate-x-1/2 -translate-y-1/2"
            style={{
              backgroundColor: isDarkColor(values.color) ? "white" : "black"
            }}
          />
        )}
        {typeof children === "function" ? children(values) : children}
      </>
    )}
  </RACColorSwatchPickerItem>
)

const ColorSwatch = ({ className, ...props }: ColorSwatchProps & ComponentPropsWithoutRef<"span">) => (
  <RACColorSwatch
    className={composeRenderProps(className, (className) =>
      cn(
        "bg-muted size-6 shrink-0 rounded-md inset-ring-1 inset-ring-current/20 in-data-[slot=button-group]:rounded-lg",
        className
      )
    )}
    data-slot="color-swatch"
    {...props}
  />
)

const isDarkColor = (color: Color): boolean => {
  const rgbColor = color.toFormat("rgb")
  const r = rgbColor.getChannelValue("red")
  const g = rgbColor.getChannelValue("green")
  const b = rgbColor.getChannelValue("blue")
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance < 0.5
}

export {
  type Color,
  ColorArea,
  ColorField,
  ColorPicker,
  ColorSlider,
  ColorSliderOutput,
  ColorSwatch,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
  ColorThumb,
  ColorWheel,
  isDarkColor
}
