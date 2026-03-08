import { Head, Link, router } from '@inertiajs/react'
import { IconDotsVertical, IconEdit, IconEye, IconPlus, IconTrash } from '@tabler/icons-react'
import { toast } from 'sonner'
import { Paginator } from '@/components/collections/paginator'
import { Search } from '@/components/collections/search'
import Heading from '@/components/heading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button-group'
import { Card, CardContent } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { usePermission } from '@/hooks/use-permission'
import { useTableParams } from '@/hooks/use-table-params'
import AppLayout from '@/layouts/app-layout'
import type { BaseFilters, BreadcrumbItem, Model, Resource } from '@/types'
import { create, destroy, edit, index, show } from '@/wayfinder/routes/permissions'
import type { Spatie } from '@/wayfinder/types'

interface Props {
    permissions: Resource<Model<Spatie.Permission.Models.Permission>>
    filters: BaseFilters
}
export default function PermissionIndex({ permissions, filters }: Props) {
    const { can, canAny } = usePermission()
    const { params, updateParams, onSortChange, sortDescriptor } = useTableParams(
        permissions.meta.path,
        {
            per_page: permissions.meta.per_page.toString(),
            search: filters.search || '',
            sort: filters.sort || '',
            direction: filters.direction! || '',
        },
    )
    return (
        <>
            <Head title='Permissions Management' />
            <Heading title='Permissions Management' description='Manage permissions in your system'>
                {can('permission.create') && (
                    <Link className={buttonVariants()} href={create().url}>
                        <IconPlus />
                        Add Permission
                    </Link>
                )}
            </Heading>
            <div className='flex items-center justify-between gap-2'>
                <div className='flex items-center gap-2'>
                    <div>
                        <Search
                            search={params.search!}
                            onSearchChange={(e) => updateParams({ search: e })}
                        />
                    </div>
                </div>
            </div>
            <Card className='p-0'>
                <CardContent>
                    <Table
                        aria-label='Roles'
                        bleed
                        onSortChange={onSortChange}
                        sortDescriptor={sortDescriptor}
                    >
                        <TableHeader>
                            <TableColumn id='id' allowsSorting isRowHeader className='w-0'>
                                #
                            </TableColumn>
                            <TableColumn allowsSorting id='name'>
                                Name
                            </TableColumn>
                            <TableColumn allowsSorting id='guard-name'>
                                Guard Name
                            </TableColumn>
                            <TableColumn allowsSorting id='permissions'>
                                Roles
                            </TableColumn>
                            <TableColumn className='w-0' />
                        </TableHeader>
                        <TableBody items={permissions.data}>
                            {(permission: Model<Spatie.Permission.Models.Permission>) => (
                                <TableRow>
                                    <TableCell>{permission.id}</TableCell>
                                    <TableCell>{permission.name}</TableCell>
                                    <TableCell>{permission.guard_name}</TableCell>
                                    <TableCell className='space-x-1'>
                                        {permission.roles?.map((role) => (
                                            <Badge key={String(role)}>{String(role)}</Badge>
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        {canAny([
                                            'permission.view',
                                            'permission.update',
                                            'permission.delete',
                                        ]) && (
                                            <DropdownMenu>
                                                <Button variant='ghost' size='icon-xs'>
                                                    <IconDotsVertical />
                                                </Button>
                                                <DropdownMenuContent placement='left top'>
                                                    {can('permission.view') &&
                                                        permission.can.view && (
                                                            <DropdownMenuItem
                                                                href={show({ permission }).url}
                                                            >
                                                                <IconEye />
                                                                View
                                                            </DropdownMenuItem>
                                                        )}
                                                    {can('permission.update') &&
                                                        permission.can.update && (
                                                            <DropdownMenuItem
                                                                href={edit({ permission }).url}
                                                            >
                                                                <IconEdit />
                                                                Edit
                                                            </DropdownMenuItem>
                                                        )}
                                                    {can('permission.delete') &&
                                                        permission.can.delete && (
                                                            <DropdownMenuItem
                                                                variant='destructive'
                                                                onAction={() =>
                                                                    toast.error(
                                                                        "Are you sure wan't to delete this permission?",
                                                                        {
                                                                            action: {
                                                                                label: 'Delete',
                                                                                onClick: () =>
                                                                                    router.delete(
                                                                                        destroy({
                                                                                            permission,
                                                                                        }),
                                                                                    ),
                                                                            },
                                                                            cancel: {
                                                                                label: 'Cancel',
                                                                                onClick: () => {},
                                                                            },
                                                                            duration: Infinity,
                                                                        },
                                                                    )
                                                                }
                                                            >
                                                                <IconTrash />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Paginator
                meta={permissions.meta}
                links={permissions.links}
                onPerPageChange={(e) => updateParams({ per_page: e })}
            />
        </>
    )
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Permissions',
        href: index().url,
    },
]

PermissionIndex.layout = (page: React.ReactNode) => (
    <AppLayout children={page} breadcrumbs={breadcrumbs} />
)
