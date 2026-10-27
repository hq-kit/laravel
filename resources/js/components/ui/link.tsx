import { Link as InertiaLink, type InertiaLinkProps } from '@inertiajs/react'
import { cn } from 'cn'
import { RefObject } from 'react'
import { composeRenderProps } from 'react-aria-components/composeRenderProps'
import {
    Link as LinkPrimitive,
    type LinkProps as LinkPrimitiveProps,
} from 'react-aria-components/Link'

export interface LinkProps
    extends
        Omit<LinkPrimitiveProps, 'href' | 'size'>,
        Omit<
            InertiaLinkProps,
            keyof Omit<LinkPrimitiveProps, 'href' | 'size'> | 'size'
        > {
    ref?: RefObject<HTMLAnchorElement>
}

export function Link({ className, ref, ...props }: LinkProps) {
    return (
        <LinkPrimitive
            ref={ref}
            className={composeRenderProps(className, (className) =>
                cn(
                    'outline-0 outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring',
                    'disabled:cursor-default disabled:opacity-50',
                    'href' in props && 'cursor-pointer',
                    className,
                ),
            )}
            render={(domProps) =>
                'href' in domProps ? (
                    <InertiaLink
                        {...(props as InertiaLinkProps)}
                        {...(domProps as InertiaLinkProps)}
                    />
                ) : (
                    <span {...domProps} />
                )
            }
            {...(props as LinkPrimitiveProps)}
        />
    )
}
