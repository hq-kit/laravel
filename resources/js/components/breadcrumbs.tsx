import { Fragment } from 'react'
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/breadcrumb'
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types'

export function Breadcrumbs({ breadcrumbs }: { breadcrumbs: BreadcrumbItemType[] }) {
    return (
        <>
            {breadcrumbs.length > 0 && (
                <Breadcrumb>
                    {breadcrumbs.map((item, index) => {
                        const isLast = index === breadcrumbs.length - 1
                        return (
                            <Fragment key={index}>
                                <BreadcrumbItem href={!isLast ? (item.href as string) : '#'}>
                                    {item.title}
                                </BreadcrumbItem>
                            </Fragment>
                        )
                    })}
                </Breadcrumb>
            )}
        </>
    )
}
