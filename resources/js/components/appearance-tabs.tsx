import {
    IconDeviceDesktop,
    IconMoon,
    IconSun,
    TablerIcon,
} from '@tabler/icons-react'
import { Key } from 'react-aria-components/ToggleButtonGroup'

import { ToggleGroup } from '@/components/ui/toggle'
import type { Appearance } from '@/hooks/use-appearance'
import { useAppearance } from '@/hooks/use-appearance'

export default function AppearanceToggleTab() {
    const { appearance, updateAppearance } = useAppearance()

    const tabs: { value: Appearance; icon: TablerIcon; label: string }[] = [
        { value: 'light', icon: IconSun, label: 'Light' },
        { value: 'dark', icon: IconMoon, label: 'Dark' },
        { value: 'system', icon: IconDeviceDesktop, label: 'System' },
    ]

    return (
        <ToggleGroup
            selectionMode="single"
            selectedKeys={new Set<Key>([appearance])}
            onSelectionChange={(v) =>
                updateAppearance([...v].join('') as Appearance)
            }
        >
            {tabs.map(({ value, icon: Icon, label }) => (
                <ToggleGroup.Item id={value} key={value}>
                    <Icon />
                    {label}
                </ToggleGroup.Item>
            ))}
        </ToggleGroup>
    )
}
