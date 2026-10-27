import type { InertiaLinkProps } from '@inertiajs/react'
import { TablerIcon } from '@tabler/icons-react'

export type BreadcrumbItem = {
    title: string
    href: NonNullable<InertiaLinkProps['href']>
}

export type NavItem = {
    title: string
    href: NonNullable<InertiaLinkProps['href']>
    icon?: TablerIcon | null
    isActive?: boolean
    items?: NavItem[]
    show?: boolean
}
export interface Navigations {
    title: string
    items: NavItem[]
}
