import { IconDeviceDesktop, IconMoon, IconSun } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useAppearance } from '@/hooks/use-appearance'

export default function AppearanceSwitcher({
    variant = 'outline',
    className,
    ...props
}: React.ComponentProps<typeof Button>) {
    const { appearance, updateAppearance } = useAppearance()
    const toggleTheme = () => {
        const nextTheme =
            appearance === 'light' ? 'dark' : appearance === 'dark' ? 'system' : 'light'
        updateAppearance(nextTheme)
    }
    return (
        <Button
            variant={variant}
            className={className}
            size='icon'
            aria-label='Switch theme'
            onPress={toggleTheme}
            {...props}
        >
            {appearance === 'light' ? (
                <IconSun />
            ) : appearance === 'dark' ? (
                <IconMoon />
            ) : (
                <IconDeviceDesktop />
            )}
        </Button>
    )
}
