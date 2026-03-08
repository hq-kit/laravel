import { BulkToolbar } from '@/components/collections/bulk-toolbar'
import { FiltersToolbar } from '@/components/collections/filters-toolbar'
import { Paginator } from '@/components/collections/paginator'
import { Search } from '@/components/collections/search'
import Heading from '@/components/heading'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Toggle } from '@/components/ui/toggle'
import { usePermission } from '@/hooks/use-permission'
import { useTableParams } from '@/hooks/use-table-params'
import AppLayout from '@/layouts/app-layout'
import { initials, titleCase } from '@/lib/utils'
import type { BulkAction, Filters, Model, Resource } from '@/types'
import {
    bulk,
    create,
    destroy,
    edit,
    index,
    show,
    role as updateRole,
} from '@/wayfinder/routes/users'
import type { App } from '@/wayfinder/types'
import { Head, Link, router, usePage } from '@inertiajs/react'
import {
    IconBriefcase,
    IconCheckbox,
    IconDotsVertical,
    IconEdit,
    IconEye,
    IconPlus,
    IconTrash,
} from '@tabler/icons-react'
import { useMemo, useState } from 'react'
import type { Selection } from 'react-aria-components'
import { toast } from 'sonner'

interface Props {
    users: Resource<Model<App.Models.User>>
    filters: Filters<{ role?: string }>
    roles: string[]
}
export default function Index({ users, filters, roles }: Props) {
    const { auth } = usePage().props
    const { can } = usePermission()

    const [selectedData, setSelectedData] = useState<Selection>(new Set())

    const [isBulk, setIsBulk] = useState<boolean>(false)
    const onBulkChange = (value: boolean) => {
        if (!value) {
            setSelectedData(new Set())
        }
        setIsBulk(value)
    }

    const { params, updateParams, onSortChange, sortDescriptor } = useTableParams(users.meta.path, {
        per_page: users.meta.per_page.toString(),
        search: filters.search || '',
        sort: filters.sort || '',
        direction: filters.direction! || '',
        role: filters.role || '',
    })

    const filterOptions = [
        {
            id: 'role',
            label: 'Role',
            icon: IconBriefcase,
            options: roles.map((role) => ({
                id: role,
                label: titleCase(role),
            })),
            defaultValue: filters.role!,
        },
    ]

    const bulkActions = useMemo(
        () =>
            createBulkActions({
                can,
                currentUserId: auth.user.id,
                allIds: users.data.map((u) => u.id),
            }),
        [can, auth.user.id, users.data],
    )
    return (
        <>
            <Head title='Users Management' />
            <Heading title='Users Management' description='Manage users on database'>
                {can('user.create') && (
                    <Link className={buttonVariants()} href={create().url}>
                        <IconPlus />
                        Add User
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
                    <FiltersToolbar
                        filters={filterOptions}
                        onFilterChange={(filters) => updateParams(filters)}
                    />
                </div>
                <Toggle
                    isDisabled={!can('user.delete')}
                    variant='outline'
                    isSelected={isBulk}
                    onChange={onBulkChange}
                >
                    <IconCheckbox />
                </Toggle>
            </div>
            <Card className='p-0'>
                <CardContent>
                    <Table
                        disabledKeys={new Set([auth.user.id])}
                        onSortChange={onSortChange}
                        sortDescriptor={sortDescriptor}
                        selectedKeys={selectedData}
                        onSelectionChange={setSelectedData}
                        aria-label='Users'
                        bleed
                        selectionMode={isBulk ? 'multiple' : 'none'}
                    >
                        <TableHeader>
                            <TableColumn id='id' allowsSorting isRowHeader className='w-0'>
                                #
                            </TableColumn>
                            <TableColumn allowsSorting id='name'>
                                Name
                            </TableColumn>
                            <TableColumn allowsSorting id='role'>
                                Roles
                            </TableColumn>
                            <TableColumn className='w-0' />
                        </TableHeader>
                        <TableBody items={users.data}>
                            {(user: Model<App.Models.User>) => (
                                <TableRow>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>
                                        <div className='users-center flex gap-2'>
                                            <Avatar
                                                className='size-8'
                                                src={user.avatar}
                                                fallback={initials(user.name)}
                                                alt={user.name}
                                            />
                                            <div className='flex flex-col'>
                                                <div className='font-medium text-sm'>
                                                    {user.name}
                                                </div>
                                                <span className='text-muted-foreground text-xs'>
                                                    {user.email}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className='space-x-1'>
                                        {user.roles?.map((role) => (
                                            <Badge key={String(role)}>{String(role)}</Badge>
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <Button variant='ghost' size='icon-xs'>
                                                <IconDotsVertical />
                                            </Button>
                                            <DropdownMenuContent placement='left top'>
                                                {can('user.view') && user.can.view && (
                                                    <DropdownMenuItem href={show(user).url}>
                                                        <IconEye />
                                                        View
                                                    </DropdownMenuItem>
                                                )}
                                                {can('user.update') && user.can.update && (
                                                    <DropdownMenuItem href={edit(user).url}>
                                                        <IconEdit />
                                                        Edit
                                                    </DropdownMenuItem>
                                                )}
                                                {can('user.assign-role') &&
                                                    user.can['assign-role'] && (
                                                        <>
                                                            <DropdownMenuSeparator />

                                                            <DropdownMenuSub>
                                                                <DropdownMenuSubTrigger>
                                                                    <IconBriefcase />
                                                                    Assign Role
                                                                </DropdownMenuSubTrigger>
                                                                <DropdownMenuSubContent
                                                                    placement='right'
                                                                    items={roles
                                                                        .filter(
                                                                            (role) =>
                                                                                !user?.roles
                                                                                    ?.map(
                                                                                        (
                                                                                            existingRole,
                                                                                        ) =>
                                                                                            existingRole.name,
                                                                                    )
                                                                                    .includes(role),
                                                                        )
                                                                        .map((role) => ({
                                                                            id: role,
                                                                            label: titleCase(role),
                                                                        }))}
                                                                >
                                                                    {(role) => (
                                                                        <DropdownMenuItem
                                                                            id={role.id}
                                                                            onAction={() =>
                                                                                router.post(
                                                                                    updateRole()
                                                                                        .url,
                                                                                    {
                                                                                        id: user.id,
                                                                                        role: role.id,
                                                                                    },
                                                                                )
                                                                            }
                                                                        >
                                                                            {role.label}
                                                                        </DropdownMenuItem>
                                                                    )}
                                                                </DropdownMenuSubContent>
                                                            </DropdownMenuSub>
                                                        </>
                                                    )}
                                                {can('user.remove-role') &&
                                                    user.can['remove-role'] &&
                                                    user?.roles &&
                                                    user?.roles?.length > 0 && (
                                                        <>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuSub>
                                                                <DropdownMenuSubTrigger>
                                                                    <IconBriefcase />
                                                                    Remove Role
                                                                </DropdownMenuSubTrigger>
                                                                <DropdownMenuSubContent
                                                                    placement='right'
                                                                    items={user.roles}
                                                                >
                                                                    {(role) => (
                                                                        <DropdownMenuItem
                                                                            id={role.name}
                                                                            onAction={() =>
                                                                                router.post(
                                                                                    updateRole()
                                                                                        .url,
                                                                                    {
                                                                                        id: user.id,
                                                                                        role: role.name,
                                                                                    },
                                                                                )
                                                                            }
                                                                        >
                                                                            {titleCase(role.name)}
                                                                        </DropdownMenuItem>
                                                                    )}
                                                                </DropdownMenuSubContent>
                                                            </DropdownMenuSub>
                                                        </>
                                                    )}
                                                {can('user.delete') && user.can.delete && (
                                                    <>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            variant='destructive'
                                                            onAction={() =>
                                                                toast.error(
                                                                    "Are you sure wan't to delete this user?",
                                                                    {
                                                                        action: {
                                                                            label: 'Delete',
                                                                            onClick: () =>
                                                                                router.delete(
                                                                                    destroy(user),
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
                                                    </>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Paginator
                meta={users.meta}
                links={users.links}
                onPerPageChange={(e) => updateParams({ per_page: e })}
            />
            <BulkToolbar
                onClearSelection={() => {
                    setSelectedData(new Set())
                }}
                actions={bulkActions}
                selectedIds={selectedData}
            />
        </>
    )
}
const createBulkActions = ({
    can,
    currentUserId,
    allIds,
}: {
    can: (p: string) => boolean
    currentUserId: number
    allIds: number[]
}): BulkAction[] => {
    const actions: BulkAction[] = []

    if (can('user.delete')) {
        actions.push({
            isDestructive: true,
            icon: IconTrash,
            label: 'Delete',
            confirm: {
                title: 'Selected users will be deleted',
                description: 'This action cannot be undone',
            },
            onAction: (selection: Selection) => {
                const ids = (selection === 'all' ? allIds : Array.from(selection))
                    .map(Number)
                    .filter((id) => id !== currentUserId)

                if (ids.length === 0) {
                    toast.warning('No users to delete.')
                    return
                }

                router.post(bulk(), { action: 'delete', ids })
            },
        })
    }

    return actions
}
const breadcrumbs = [
    {
        title: 'Users',
        href: index().url,
    },
]

Index.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />
