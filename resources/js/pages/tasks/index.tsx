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
import { Switch } from '@/components/ui/switch'
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
import type { BaseFilters, BreadcrumbItem, Resource } from '@/types'
import { create, destroy, edit, index, show, update } from '@/wayfinder/routes/tasks'
import type { App } from '@/wayfinder/types'

interface Props {
    tasks: Resource<App.Models.Task>
    filters: BaseFilters
}
export default function PermissionIndex({ tasks, filters }: Props) {
    const { params, updateParams, onSortChange, sortDescriptor } = useTableParams(tasks.meta.path, {
        per_page: tasks.meta.per_page.toString(),
        search: filters.search || '',
        sort: filters.sort || '',
        direction: filters.direction! || '',
    })

    const { can } = usePermission()
    return (
        <>
            <Head title='Tasks' />
            <Heading title='Tasks' description='Manage your task data'>
                {can('task.create') && (
                    <Link className={buttonVariants()} href={create().url}>
                        <IconPlus />
                        Add Todo
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
                            <TableColumn allowsSorting id='completed'>
                                Completed
                            </TableColumn>
                            <TableColumn className='w-0' />
                        </TableHeader>
                        <TableBody items={tasks.data}>
                            {(task: App.Models.Task) => (
                                <TableRow>
                                    <TableCell>{task.id}</TableCell>
                                    <TableCell>{task.title}</TableCell>
                                    <TableCell>
                                        <Switch
                                            isSelected={task.completed}
                                            onChange={(completed) =>
                                                router.patch(update({ task }), {
                                                    title: task?.title,
                                                    completed: completed,
                                                })
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <Button variant='ghost' size='icon-xs'>
                                                <IconDotsVertical />
                                            </Button>
                                            <DropdownMenuContent placement='left top'>
                                                {can('task.view') && (
                                                    <DropdownMenuItem href={show({ task }).url}>
                                                        <IconEye />
                                                        View
                                                    </DropdownMenuItem>
                                                )}
                                                {can('task.update') && (
                                                    <DropdownMenuItem href={edit({ task }).url}>
                                                        <IconEdit />
                                                        Edit
                                                    </DropdownMenuItem>
                                                )}
                                                {can('task.delete') && (
                                                    <DropdownMenuItem
                                                        variant='destructive'
                                                        onAction={() =>
                                                            toast.error(
                                                                "Are you sure wan't to delete this task?",
                                                                {
                                                                    action: {
                                                                        label: 'Delete',
                                                                        onClick: () =>
                                                                            router.delete(
                                                                                destroy({
                                                                                    task,
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
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Paginator
                meta={tasks.meta}
                links={tasks.links}
                onPerPageChange={(e) => updateParams({ per_page: e })}
            />
        </>
    )
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: index().url,
    },
]

PermissionIndex.layout = (page: React.ReactNode) => (
    <AppLayout children={page} breadcrumbs={breadcrumbs} />
)
