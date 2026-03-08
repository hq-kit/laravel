import type { TablerIcon } from '@tabler/icons-react'
import type { Selection } from 'react-aria-components'

export type * from './auth'
export type * from './navigation'
export type * from './ui'

export type Model<T> = T & {
    can: Record<string, boolean>
}
export interface Resource<T> {
    data: T[]
    links: PaginationLinks
    meta: Metadata
}
export interface PaginationLinks {
    first: string | null
    last: string | null
    prev: string | null
    next: string | null
}

export interface Metadata {
    current_page: number
    from: number
    last_page: number
    links: { url: string | null; label: string; page: number; active: boolean }[]
    path: string
    per_page: number
    to: number
    total: number
}

export interface BulkAction {
    isDestructive?: boolean
    icon?: TablerIcon
    label: string
    confirm?: {
        title: string
        description: string
    }
    onAction: (selection: Selection) => void
}

export interface FormPageProps<T> {
    data: T
    method: 'put' | 'post'
}

export interface BaseFilters {
    search?: string
    sort?: string
    direction?: 'asc' | 'desc'
    per_page?: string
}

export type Filters<T extends Record<string, string> = Record<string, string>> = BaseFilters & T
