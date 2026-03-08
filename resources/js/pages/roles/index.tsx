import { Head, Link, router } from '@inertiajs/react'
import { IconDotsVertical, IconEdit, IconEye, IconPlus, IconTrash } from '@tabler/icons-react'
import { toast } from 'sonner'
import { Paginator } from '@/components/collections/paginator'
import { Search } from '@/components/collections/search'
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button-group'
import { Card, CardContent } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Tag, TagGroup, TagList } from '@/components/ui/tag'
import { groupPermissions, usePermission } from '@/hooks/use-permission'
import { useTableParams } from '@/hooks/use-table-params'
import AppLayout from '@/layouts/app-layout'
import type { BaseFilters, BreadcrumbItem, Model, Resource } from '@/types'
import { create, destroy, edit, index, show } from '@/wayfinder/routes/roles'
import type { Spatie } from '@/wayfinder/types'

interface Props {
    roles: Resource<Model<Spatie.Permission.Models.Role>>
    filters: BaseFilters
}
export default function RoleIndex({ roles, filters }: Props) {
    const { can, canAny } = usePermission()
    const { params, updateParams, onSortChange, sortDescriptor } = useTableParams(roles.meta.path, {
        per_page: roles.meta.per_page.toString(),
        search: filters.search || '',
        sort: filters.sort || '',
        direction: filters.direction! || '',
    })

    return (
        <>
            <Head title='Roles Management' />
            <Heading title='Roles Management' description='Manage roles in your system'>
                {can('role.create') && (
                    <Link className={buttonVariants()} href={create().url}>
                        <IconPlus />
                        Add Role
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
                        sortDescriptor={sortDescriptor}
                        onSortChange={onSortChange}
                    >
                        <TableHeader>
                            <TableColumn id='id' allowsSorting isRowHeader className='w-0'>
                                #
                            </TableColumn>
                            <TableColumn allowsSorting id='name'>
                                Name
                            </TableColumn>
                            <TableColumn id='guard-name'>Guard Name</TableColumn>
                            <TableColumn id='permissions'>Permissions</TableColumn>
                            <TableColumn className='w-0' />
                        </TableHeader>
                        <TableBody items={roles.data}>
                            {(role: Model<Spatie.Permission.Models.Role>) => (
                                <TableRow>
                                    <TableCell>{role.id}</TableCell>
                                    <TableCell>{role.name}</TableCell>
                                    <TableCell>{role.guard_name}</TableCell>
                                    <TableCell className='space-y-2'>
                                        {Object.entries(
                                            groupPermissions(
                                                role.permissions!.map((perm) => String(perm)),
                                            ),
                                        ).map(([model, perms]) => (
                                            <TagGroup key={model}>
                                                <Label>{model}</Label>
                                                <TagList
                                                    items={perms.map((perm) => ({
                                                        id: perm,
                                                        label: perm,
                                                    }))}
                                                >
                                                    {(item) => <Tag id={item.id}>{item.label}</Tag>}
                                                </TagList>
                                            </TagGroup>
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        {canAny(['role.view', 'role.update', 'role.delete']) && (
                                            <DropdownMenu>
                                                <Button variant='ghost' size='icon-xs'>
                                                    <IconDotsVertical />
                                                </Button>
                                                <DropdownMenuContent placement='left top'>
                                                    {can('role.view') && role.can.view && (
                                                        <DropdownMenuItem href={show({ role }).url}>
                                                            <IconEye />
                                                            View
                                                        </DropdownMenuItem>
                                                    )}
                                                    {can('role.update') && role.can.update && (
                                                        <DropdownMenuItem href={edit({ role }).url}>
                                                            <IconEdit />
                                                            Edit
                                                        </DropdownMenuItem>
                                                    )}
                                                    {can('role.delete') && role.can.delete && (
                                                        <DropdownMenuItem
                                                            variant='destructive'
                                                            onAction={() =>
                                                                toast.error(
                                                                    "Are you sure wan't to delete this role?",
                                                                    {
                                                                        action: {
                                                                            label: 'Delete',
                                                                            onClick: () =>
                                                                                router.delete(
                                                                                    destroy({
                                                                                        role,
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
                meta={roles.meta}
                links={roles.links}
                onPerPageChange={(e) => updateParams({ per_page: e })}
            />
        </>
    )
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: index().url,
    },
]

RoleIndex.layout = (page: React.ReactNode) => (
    <AppLayout children={page} breadcrumbs={breadcrumbs} />
)
