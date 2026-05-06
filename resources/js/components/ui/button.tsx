import type { Ref } from 'react'
import {
    composeRenderProps,
    Button as RACButton,
    type ButtonProps as RACButtonProps,
} from 'react-aria-components'
import type { VariantProps } from 'tailwind-variants'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import { buttonVariants } from './button-group'

interface ButtonProps extends RACButtonProps, VariantProps<typeof buttonVariants> {
    ref?: Ref<HTMLButtonElement>
}

const Button = ({ className, variant, size, children, ...props }: ButtonProps) => (
    <RACButton
        className={composeRenderProps(className, (className) =>
            cn(buttonVariants({ variant, size, isPending: props.isPending, className })),
        )}
        data-slot='button'
        {...props}
    >
        {(values) => (
            <>
                {values.isPending && <Spinner data-slot='loader' />}
                {typeof children === 'function' ? children(values) : children}
            </>
        )}
    </RACButton>
)

export type { ButtonProps }
export { Button, buttonVariants }
