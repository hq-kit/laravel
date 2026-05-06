import { type InertiaLinkProps, router } from '@inertiajs/react'
import { useState } from 'react'
import type { SortDescriptor } from 'react-aria-components'
import { toUrl } from '@/lib/utils'
import type { Filters } from '@/types'

export function useDataParams(
    basePath: NonNullable<InertiaLinkProps['href']>,
    initial: Filters & Record<string, any>,
    only?: string[],
) {
    const [params, setParams] = useState(initial)

    const updateParams = (newParams: Record<string, string>) => {
        const updated = { ...params, ...newParams }
        Object.keys(updated).forEach((key) => {
            if (updated[key] === '') delete updated[key]
        })
        setParams(updated)
        if (params !== initial) {
            router.get(toUrl(basePath), updated, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                only,
            })
        }
    }

    const onSortChange = ({ column, direction }: SortDescriptor) =>
        updateParams({
            order: column.toString(),
            dir: direction === 'ascending' ? 'asc' : 'desc',
        })

    const sortDescriptor: SortDescriptor = {
        column: params.order!,
        direction: params.dir === 'asc' ? 'ascending' : 'descending',
    }

    return { params, updateParams, onSortChange, sortDescriptor }
}
