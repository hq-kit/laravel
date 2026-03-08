import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@/lib/utils'

const buttonVariants = tv({
    base: "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive:
                'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40',
            outline:
                'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
            link: 'text-primary underline-offset-4 hover:underline',
        },
        size: {
            default: 'h-9 px-4 py-2 has-[>svg]:px-3',
            xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
            sm: 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
            lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
            icon: 'size-9',
            'icon-xs': "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
            'icon-sm': 'size-8',
            'icon-lg': 'size-10',
        },
        isPending: {
            true: "pointer-events-none opacity-50 [&_svg:not([data-slot='loader'])]:hidden",
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
})

const buttonGroupVariants = tv({
    base: "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
    variants: {
        orientation: {
            horizontal:
                '[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none',
            vertical:
                'flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none',
        },
        separator: {
            true: 'data-[orientation=horizontal]:divide-x data-[orientation=vertical]:divide-y',
        },
    },
    defaultVariants: {
        orientation: 'horizontal',
        separator: false,
    },
})

const ButtonGroup = ({
    className,
    orientation,
    separator,
    ...props
}: ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>) => (
    <div
        className={buttonGroupVariants({ orientation, separator, className })}
        data-orientation={orientation}
        data-slot='button-group'
        role='group'
        {...props}
    />
)

const ButtonGroupText = ({ className, ...props }: ComponentProps<'div'>) => {
    return (
        <div
            className={cn(
                "flex items-center gap-2 rounded-md border bg-muted px-4 font-medium text-sm shadow-xs *:data-[slot=icon]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
                className,
            )}
            {...props}
        />
    )
}

export { ButtonGroup, ButtonGroupText, buttonVariants }
