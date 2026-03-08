import { Separator as RACSeparator, type SeparatorProps } from 'react-aria-components'
import { cn } from '@/lib/utils'

const Separator = ({ className, orientation = 'horizontal', ...props }: SeparatorProps) => (
    <RACSeparator
        className={cn(
            className,
            'shrink-0 bg-muted',
            orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        )}
        data-slot='separator'
        orientation={orientation}
        {...props}
    />
)

export { Separator }
