import { Pagination } from '@/components/ui/pagination'
import { Select, SelectContent } from '@/components/ui/select'
import type { Metadata, PaginationLinks } from '@/types'

interface PaginatorProps {
    meta: Metadata
    links: PaginationLinks
    onPerPageChange: (per_page: string) => void
}
export const Paginator = ({ meta, links, onPerPageChange }: PaginatorProps) => {
    const canGoPrev = meta.current_page > 1
    const canGoNext = meta.current_page < meta.last_page

    return (
        <div className='flex w-full flex-col items-center justify-between gap-2 lg:flex-row'>
            <div className='text-muted-foreground text-sm'>
                Show {meta.from} - {meta.to} of {meta.total} results
            </div>
            <div className='flex items-center gap-3'>
                <div>
                    <Select
                        aria-label='Per page'
                        defaultValue={String(meta.per_page)}
                        onChange={(e) => onPerPageChange([e].join(''))}
                    >
                        <Select.Trigger size='sm'>
                            <Select.Value />
                        </Select.Trigger>
                        <SelectContent>
                            {[10, 15, 25, 50, 100].map((value) => (
                                <Select.Item key={value} id={value.toString()}>
                                    {value.toString()}
                                </Select.Item>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <span className='whitespace-nowrap text-muted-foreground text-sm'>
                    Page {meta.current_page} of {meta.last_page}
                </span>
                <Pagination>
                    <Pagination.Content>
                        <Pagination.Item>
                            <Pagination.First
                                routerOptions={{
                                    preserveState: true,
                                    preserveScroll: true,
                                }}
                                href={canGoPrev ? links.first! : ''}
                                isDisabled={!canGoPrev}
                            />
                        </Pagination.Item>
                        <Pagination.Item>
                            <Pagination.Previous
                                routerOptions={{ preserveState: true, preserveScroll: true }}
                                href={canGoPrev ? links.prev! : ''}
                                isDisabled={!canGoPrev}
                            />
                        </Pagination.Item>
                        <Pagination.Item>
                            <Pagination.Link isActive>{meta.current_page}</Pagination.Link>
                        </Pagination.Item>
                        <Pagination.Item>
                            <Pagination.Next
                                routerOptions={{ preserveState: true, preserveScroll: true }}
                                href={canGoNext ? links.next! : ''}
                                isDisabled={!canGoNext}
                            />
                        </Pagination.Item>
                        <Pagination.Item>
                            <Pagination.Last
                                routerOptions={{ preserveState: true, preserveScroll: true }}
                                href={canGoNext ? links.last! : ''}
                                isDisabled={!canGoNext}
                            />
                        </Pagination.Item>
                    </Pagination.Content>
                </Pagination>
            </div>
        </div>
    )
}
