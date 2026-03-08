import { IconDeviceDesktop, IconMoon, IconSun, type TablerIcon } from '@tabler/icons-react'
import type { HTMLAttributes } from 'react'
import { SelectionIndicator, ToggleButton, ToggleButtonGroup } from 'react-aria-components'
import type { Appearance } from '@/hooks/use-appearance'
import { useAppearance } from '@/hooks/use-appearance'
import { cn } from '@/lib/utils'

export default function AppearanceToggleTab({
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance()

    const tabs: { value: Appearance; icon: TablerIcon; label: string }[] = [
        { value: 'light', icon: IconSun, label: 'Light' },
        { value: 'dark', icon: IconMoon, label: 'Dark' },
        { value: 'system', icon: IconDeviceDesktop, label: 'System' },
    ]

    return (
        <ToggleButtonGroup
            className={cn(
                'inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800',
                className,
            )}
            selectionMode='single'
            selectedKeys={[appearance]}
            onSelectionChange={(e) => updateAppearance(String(...e) as Appearance)}
            {...props}
        >
            {tabs.map(({ value, icon: Icon, label }) => (
                <ToggleButton
                    id={value}
                    key={value}
                    className={cn(
                        'relative flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                        'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                    )}
                >
                    {() => (
                        <>
                            <Icon className='z-1 -ml-1 h-4 w-4' />
                            <span className='z-1 ml-1.5 text-sm'>{label}</span>
                            <SelectionIndicator
                                data-selected
                                className='absolute top-0 left-0 size-full rounded-lg bg-white shadow-xs transition dark:bg-neutral-700 dark:text-neutral-100'
                            />
                        </>
                    )}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    )
}
