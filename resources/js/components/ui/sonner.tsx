import {
    IconAlertTriangle,
    IconCircleCheck,
    IconCircleX,
    IconInfoCircle,
    IconLoader2,
} from '@tabler/icons-react'
import type { CSSProperties } from 'react'
import { Toaster as Sonner, type ToasterProps } from 'sonner'
import { useAppearance } from '@/hooks/use-appearance'

const Toaster = ({ ...props }: ToasterProps) => {
    const { appearance: theme = 'system' } = useAppearance()

    return (
        <Sonner
            className='toaster group'
            icons={{
                success: <IconCircleCheck className='size-4' />,
                info: <IconInfoCircle className='size-4' />,
                warning: <IconAlertTriangle className='size-4' />,
                error: <IconCircleX className='size-4' />,
                loading: <IconLoader2 className='size-4 animate-spin' />,
            }}
            style={
                {
                    '--normal-bg': 'var(--popover)',
                    '--normal-text': 'var(--popover-foreground)',
                    '--normal-border': 'var(--border)',
                    '--border-radius': 'var(--radius)',
                } as CSSProperties
            }
            theme={theme as ToasterProps['theme']}
            {...props}
        />
    )
}

export { Toaster }
