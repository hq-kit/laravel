import { useEffect, useState } from 'react'
import type { Key } from 'react-aria-components'
import {
    Pagination,
    PaginationContent,
    PaginationFirst,
    PaginationItem,
    PaginationLast,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useDebounce } from '@/hooks/use-debounce'
import type { Metadata, PaginationLinks } from '@/types'

interface PaginatorProps {
    meta: Metadata
    links: PaginationLinks
    onPerPageChange: (per_page: string) => void
}
export const Paginator = ({ meta, links, onPerPageChange }: PaginatorProps) => {
    const canGoPrev = meta.current_page > 1
    const canGoNext = meta.current_page < meta.last_page

    const [perPage, setPerPage] = useState<Key | null>(meta.per_page)
    const debouncePerPage = useDebounce(perPage, 400)

    useEffect(() => {
        onPerPageChange(String(debouncePerPage!))
    }, [debouncePerPage])

    return (
        <div className='flex w-full flex-col items-center justify-between gap-2 lg:flex-row'>
            <div className='text-muted-foreground text-sm'>
                Show {meta.from} - {meta.to} of {meta.total} results
            </div>
            <div className='flex items-center gap-3'>
                <div>
                    <Select aria-label='Per page' value={String(perPage)} onChange={setPerPage}>
                        <SelectTrigger size='sm'>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {[10, 15, 25, 50, 100].map((value) => (
                                <SelectItem key={value} id={value.toString()}>
                                    {value.toString()}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <span className='whitespace-nowrap text-muted-foreground text-sm'>
                    Page {meta.current_page} of {meta.last_page}
                </span>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationFirst
                                routerOptions={{
                                    preserveState: true,
                                    preserveScroll: true,
                                }}
                                href={canGoPrev ? links.first! : ''}
                                isDisabled={!canGoPrev}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationPrevious
                                routerOptions={{ preserveState: true, preserveScroll: true }}
                                href={canGoPrev ? links.prev! : ''}
                                isDisabled={!canGoPrev}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink isActive>{meta.current_page}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                routerOptions={{ preserveState: true, preserveScroll: true }}
                                href={canGoNext ? links.next! : ''}
                                isDisabled={!canGoNext}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLast
                                routerOptions={{ preserveState: true, preserveScroll: true }}
                                href={canGoNext ? links.last! : ''}
                                isDisabled={!canGoNext}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}
