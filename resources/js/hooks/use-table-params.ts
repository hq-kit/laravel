import { router } from '@inertiajs/react'
import { useState } from 'react'
import type { SortDescriptor } from 'react-aria-components'
import type { Filters } from '@/types'

export function useTableParams(basePath: string, initial: Filters & Record<string, string>) {
    const [params, setParams] = useState(initial)

    const updateParams = (newParams: Record<string, string>) => {
        const updated = { ...params, ...newParams }
        Object.keys(updated).forEach((key) => {
            if (updated[key] === '') delete updated[key]
        })
        setParams(updated)
        if (params !== initial) {
            router.get(basePath, updated, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            })
        }
    }

    const onSortChange = ({ column, direction }: SortDescriptor) =>
        updateParams({
            sort: column.toString(),
            direction: direction === 'ascending' ? 'asc' : 'desc',
        })

    const sortDescriptor: SortDescriptor = {
        column: params.sort!,
        direction: params.direction === 'asc' ? 'ascending' : 'descending',
    }

    return { params, updateParams, onSortChange, sortDescriptor }
}
