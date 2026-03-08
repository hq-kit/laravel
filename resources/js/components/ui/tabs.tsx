import {
    composeRenderProps,
    Tab as RACTab,
    TabList as RACTabList,
    TabPanel as RACTabPanel,
    Tabs as RACTabs,
    SelectionIndicator,
    type TabListProps,
    type TabPanelProps,
    type TabProps,
    type TabsProps,
} from 'react-aria-components'
import { cn } from '@/lib/utils'

const Tabs = ({ className, ...props }: TabsProps) => (
    <RACTabs
        className={composeRenderProps(className, (className) =>
            cn('flex flex-col gap-2', className),
        )}
        data-slot='tabs'
        {...props}
    />
)

const TabsList = <T extends object>({ className, ...props }: TabListProps<T>) => {
    return (
        <RACTabList
            className={composeRenderProps(className, (className) =>
                cn(
                    'inline-flex h-9 w-fit items-center justify-center rounded-lg bg-muted p-0.75 text-muted-foreground',
                    className,
                ),
            )}
            data-slot='tabs-list'
            {...props}
        />
    )
}

const TabsTrigger = ({ className, ...props }: TabProps) => {
    return (
        <RACTab
            className={composeRenderProps(className, (className) =>
                cn(
                    "group/tab relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1 font-medium text-foreground text-sm outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:text-muted-foreground dark:data-[selected=true]:text-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
                    'href' in props ? 'cursor-pointer' : 'cursor-default',
                    className,
                ),
            )}
            data-slot='tabs-trigger'
            {...props}
        >
            {(values) => (
                <>
                    <SelectionIndicator
                        className={cn(
                            'transition-[color,box-shadow] group-focus-visible/tab:border-ring group-focus-visible/tab:outline-1 group-focus-visible/tab:outline-ring group-focus-visible/tab:ring-[3px] group-focus-visible/tab:ring-ring/50',
                            'absolute bottom-0 size-full rounded-md bg-background shadow-sm transition-[translate,width,height] duration-200 dark:border-input dark:bg-input/30',
                        )}
                        data-slot='selected-indicator'
                    />
                    <span className='z-1 flex flex-row items-center gap-1.5'>
                        {typeof props.children === 'function'
                            ? props.children(values)
                            : props.children}
                    </span>
                </>
            )}
        </RACTab>
    )
}

const TabsContent = ({ className, ...props }: TabPanelProps) => {
    return (
        <RACTabPanel
            className={composeRenderProps(className, (className) =>
                cn('flex-1 outline-none', className),
            )}
            data-slot='tabs-content'
            {...props}
        />
    )
}

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent

export { Tabs, TabsList, TabsTrigger, TabsContent }
