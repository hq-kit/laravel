import { Breadcrumb, BreadcrumbItem } from '@/components/ui/breadcrumb'
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types'

export function Breadcrumbs({
    breadcrumbs,
}: {
    breadcrumbs: BreadcrumbItemType[]
}) {
    return (
        <>
            {breadcrumbs.length > 0 && (
                <Breadcrumb
                    items={breadcrumbs.map((b, i) => ({ id: i, ...b }))}
                >
                    {(item) => (
                        <BreadcrumbItem href={item.href}>
                            {item.title}
                        </BreadcrumbItem>
                    )}
                </Breadcrumb>
            )}
        </>
    )
}
