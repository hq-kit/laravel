import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
import type { Ref } from 'react'
import { type CSSProperties, createContext, use } from 'react'
import { composeRenderProps } from 'react-aria-components/composeRenderProps'
import {
    ToggleButton as RACToggle,
    type ToggleButtonProps,
} from 'react-aria-components/ToggleButton'
import type { Key } from 'react-aria-components/ToggleButtonGroup'
import {
    ToggleButton,
    ToggleButtonGroup,
    type ToggleButtonGroupProps,
} from 'react-aria-components/ToggleButtonGroup'

const toggleVariants = cva(
    'group/toggle inline-flex items-center justify-center gap-1 rounded-lg text-sm font-medium whitespace-nowrap transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted dark:aria-invalid:ring-destructive/40 data-selected:bg-muted [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:self-center',
    {
        variants: {
            variant: {
                outline: 'border border-input bg-transparent hover:bg-muted',
                ghost: 'bg-transparent',
            },
            size: {
                md: "h-8 gap-1.5 px-2.5 [&_svg:not([class*='size-'])]:size-4",
                xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
                sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3.5",
                lg: "h-9 gap-1.5 px-2.5 [&_svg:not([class*='size-'])]:size-4.5",
                icon: "size-8 [&_svg:not([class*='size-'])]:size-4",
                'icon-xs':
                    "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
                'icon-sm':
                    "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3.5",
                'icon-lg': "size-9 [&_svg:not([class*='size-'])]:size-4.5",
            },
        },
        defaultVariants: {
            variant: 'outline',
            size: 'md',
        },
    },
)

const Toggle = ({
    className,
    variant = 'outline',
    size = 'md',
    ...props
}: ToggleButtonProps &
    VariantProps<typeof toggleVariants> & { ref?: Ref<HTMLButtonElement> }) => (
    <RACToggle
        className={composeRenderProps(className, (className) =>
            cn(toggleVariants({ variant, size, className })),
        )}
        data-slot="toggle"
        {...props}
    />
)

const ToggleGroupContext = createContext<
    VariantProps<typeof toggleVariants> & {
        spacing?: number
        orientation?: 'horizontal' | 'vertical'
    }
>({
    size: 'md',
    variant: 'outline',
    spacing: 0,
    orientation: 'horizontal',
})

const ToggleGroup = ({
    className,
    variant,
    size,
    spacing = 0,
    ...props
}: ToggleButtonGroupProps &
    VariantProps<typeof toggleVariants> & {
        spacing?: number
    }) => (
    <ToggleGroupContext.Provider
        value={{ variant, size, spacing, orientation: props.orientation }}
    >
        <ToggleButtonGroup
            className={composeRenderProps(className, (className) =>
                cn(
                    'group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-lg data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-[size=sm]:rounded-[min(var(--radius-md),10px)]',
                    className,
                ),
            )}
            data-size={size}
            data-slot="toggle-group"
            data-spacing={spacing}
            data-variant={variant}
            style={{ '--gap': spacing } as CSSProperties}
            {...props}
        />
    </ToggleGroupContext.Provider>
)

const ToggleGroupItem = ({
    className,
    variant = 'outline',
    size = 'md',
    ref,
    ...props
}: ToggleButtonProps &
    VariantProps<typeof toggleVariants> & { ref?: Ref<HTMLButtonElement> }) => {
    const context = use(ToggleGroupContext)

    return (
        <ToggleButton
            className={cn(
                toggleVariants({
                    variant: context.variant || variant,
                    size: context.size || size,
                    className:
                        'group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:first:rounded-l-lg group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:first:rounded-t-lg group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:last:rounded-r-lg group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:last:rounded-b-lg shrink-0 focus:z-10 focus-visible:z-10 group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l',
                }),
                className,
            )}
            data-orientation={context.orientation}
            data-size={context.size || size}
            data-slot="toggle-group-item"
            data-spacing={context.spacing}
            data-variant={context.variant || variant}
            ref={ref}
            {...props}
        />
    )
}

ToggleGroup.Item = ToggleGroupItem

export type { Key }
export { Toggle, ToggleGroup, ToggleGroupItem, toggleVariants }
