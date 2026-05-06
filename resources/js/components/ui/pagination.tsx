import {
    IconChevronLeft,
    IconChevronLeftPipe,
    IconChevronRight,
    IconChevronRightPipe,
    IconDots,
} from '@tabler/icons-react'
import type { ComponentProps } from 'react'
import { Link, type LinkProps, Button as RACButton } from 'react-aria-components'
import { cn } from '@/lib/utils'
import { type ButtonProps, buttonVariants } from './button'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
    <nav
        aria-label='pagination'
        className={cn('mx-auto flex w-full justify-center', className)}
        data-slot='pagination'
        {...props}
    />
)

const PaginationContent = ({ className, ...props }: ComponentProps<'ul'>) => (
    <ul
        className={cn('flex flex-row items-center gap-1', className)}
        data-slot='pagination-content'
        {...props}
    />
)

const PaginationItem = ({ ...props }: ComponentProps<'li'>) => (
    <li data-slot='pagination-item' {...props} />
)

const PaginationLink = ({
    className,
    isActive,
    size = 'icon',
    ...props
}: Omit<LinkProps, 'className' | 'slot'> &
    Omit<ButtonProps, 'ref'> & {
        isActive?: boolean
    }) => {
    const Comp = 'href' in props ? Link : RACButton

    return (
        <Comp
            aria-current={isActive ? 'page' : undefined}
            className={cn(
                buttonVariants({
                    variant: isActive ? 'outline' : 'ghost',
                    size,
                }),
                className,
            )}
            data-active={isActive}
            data-slot='pagination-link'
            {...props}
        />
    )
}

const PaginationPrevious = ({ className, ...props }: ComponentProps<typeof PaginationLink>) => {
    return (
        <PaginationLink
            aria-label='Go to previous page'
            className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
            size='default'
            {...props}
        >
            <IconChevronLeft />
            <span className='hidden sm:block'>Previous</span>
        </PaginationLink>
    )
}

const PaginationNext = ({ className, ...props }: ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label='Go to next page'
        className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
        size='default'
        {...props}
    >
        <span className='hidden sm:block'>Next</span>
        <IconChevronRight />
    </PaginationLink>
)

const PaginationFirst = ({ className, ...props }: ComponentProps<typeof PaginationLink>) => {
    return (
        <PaginationLink
            aria-label='Go to previous page'
            className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
            size='default'
            {...props}
        >
            <IconChevronLeftPipe />
            <span className='hidden sm:block'>First</span>
        </PaginationLink>
    )
}

const PaginationLast = ({ className, ...props }: ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label='Go to next page'
        className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
        size='default'
        {...props}
    >
        <span className='hidden sm:block'>Last</span>
        <IconChevronRightPipe />
    </PaginationLink>
)

const PaginationEllipsis = ({ className, ...props }: ComponentProps<'span'>) => (
    <span
        aria-hidden
        className={cn('flex size-9 items-center justify-center', className)}
        data-slot='pagination-ellipsis'
        {...props}
    >
        <IconDots className='size-4' />
        <span className='sr-only'>More pages</span>
    </span>
)

Pagination.Content = PaginationContent
Pagination.Link = PaginationLink
Pagination.Item = PaginationItem
Pagination.Previous = PaginationPrevious
Pagination.Next = PaginationNext
Pagination.First = PaginationFirst
Pagination.Last = PaginationLast
Pagination.Ellipsis = PaginationEllipsis

export {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationFirst,
    PaginationItem,
    PaginationLast,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
}
