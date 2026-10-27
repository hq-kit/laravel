import { cn } from "cn"
import { type ComponentProps, type CSSProperties, createContext, use, useContext } from "react"
import { ToggleButtonGroupContext } from "react-aria-components"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { useSlottedContext } from "react-aria-components/slots"
import { Toolbar as RACToolbar, type ToolbarProps } from "react-aria-components/Toolbar"
import { Separator } from "./separator"
import { ToggleGroup, ToggleGroupItem } from "./toggle"

const ToolbarContext = createContext<ToolbarProps>({
  orientation: "horizontal"
})

const Toolbar = ({
  orientation = "horizontal",
  spacing = 2,
  className,
  ...props
}: ToolbarProps & {
  spacing?: number
}) => (
  <ToolbarContext.Provider value={{ orientation }}>
    <RACToolbar
      orientation={orientation}
      style={{ "--gap": spacing } as CSSProperties}
      {...props}
      className={composeRenderProps(className, (className) =>
        cn(
          "group/toolbar flex gap-[--spacing(var(--gap))] rounded-lg data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-[size=sm]:rounded-[min(var(--radius-md),10px)]",
          className
        )
      )}
    />
  </ToolbarContext.Provider>
)

const ToolbarGroup = ({ className, ...props }: Omit<ComponentProps<typeof ToggleGroup>, "orientation">) => {
  const { orientation } = use(ToolbarContext)
  return (
    <ToggleButtonGroupContext.Provider value={{ isDisabled: props.isDisabled }}>
      <ToggleGroup data-orientation={orientation} orientation={orientation} spacing={0} {...props} />
    </ToggleButtonGroupContext.Provider>
  )
}

const ToolbarItem = ({
  size = "sm",
  variant = "outline",
  ref,
  className,
  ...props
}: ComponentProps<typeof ToggleGroupItem>) => {
  const groupContext = useSlottedContext(ToggleButtonGroupContext)
  const isDisabled = groupContext?.isDisabled || props.isDisabled
  return (
    <ToggleGroupItem
      data-slot="toolbar-item"
      isDisabled={isDisabled}
      ref={ref}
      size={size}
      variant={variant}
      {...props}
    />
  )
}

const ToolbarSeparator = ({ className, ...props }: ComponentProps<typeof Separator>) => {
  const { orientation } = useContext(ToolbarContext)
  const reverseOrientation = orientation === "vertical" ? "horizontal" : "vertical"
  return <Separator orientation={reverseOrientation} {...props} />
}

export type { ToolbarProps }
export { Toolbar, ToolbarGroup, ToolbarItem, ToolbarSeparator }
