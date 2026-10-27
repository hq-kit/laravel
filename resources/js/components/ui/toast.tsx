import {
    IconAlertCircle,
    IconAlertTriangle,
    IconCircleCheck,
    IconInfoCircle,
    IconLoader2,
} from '@tabler/icons-react'
import { Toaster as Sonner, type ToasterProps, toast } from 'sonner'

import { useAppearance } from '@/hooks/use-appearance'
import { useFlashToast } from '@/hooks/use-flash-toast'

const Toaster = ({ ...props }: ToasterProps) => {
    const { appearance: theme } = useAppearance()

    useFlashToast()

    return (
        <Sonner
            className="toaster group"
            icons={{
                success: <IconCircleCheck className="size-4" />,
                info: <IconInfoCircle className="size-4" />,
                warning: <IconAlertTriangle className="size-4" />,
                error: <IconAlertCircle className="size-4" />,
                loading: (
                    <IconLoader2 className="size-4 animate-spin self-center" />
                ),
            }}
            richColors
            style={
                {
                    '--normal-bg': 'var(--popover)',
                    '--normal-text': 'var(--popover-foreground)',
                    '--normal-border': 'var(--border)',
                    '--border-radius': 'var(--radius)',
                } as React.CSSProperties
            }
            theme={theme}
            toastOptions={{
                className:
                    '*:data-action:bg-primary! *:data-action:text-primary-foreground! ',
            }}
            {...props}
        />
    )
}

export { Toaster, toast }
