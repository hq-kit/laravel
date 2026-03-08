import { Head, Link, router } from '@inertiajs/react'
import { IconArrowLeft, IconCheck, IconEdit, IconX } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button-group'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { usePermission } from '@/hooks/use-permission'
import AppLayout from '@/layouts/app-layout'
import type { BreadcrumbItem } from '@/types'
import { edit, index, update } from '@/wayfinder/routes/tasks'
import type { App } from '@/wayfinder/types'

interface Props {
    task: App.Models.Task
}

export default function TaskShow({ task }: Props) {
    const { can } = usePermission()

    return (
        <>
            <Head title={`Task: ${task.title}`} />
            <div className='space-y-6'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <Link
                            href={index().url}
                            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                        >
                            <IconArrowLeft />
                            Back to Tasks
                        </Link>
                    </div>
                    {can('task.update') && (
                        <Link href={edit({ task }).url} className={buttonVariants()}>
                            <IconEdit />
                            Edit Task
                        </Link>
                    )}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center justify-between'>
                            <span>Task Details</span>
                            {can('task.update') && (
                                <div className='flex items-center gap-2'>
                                    <Label htmlFor='completed'>Completed</Label>
                                    <Switch
                                        id='completed'
                                        isSelected={task.completed}
                                        onChange={(completed) =>
                                            router.patch(update({ task }), {
                                                title: task.title,
                                                description: task.description,
                                                completed: completed,
                                            })
                                        }
                                    />
                                </div>
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <Label>ID</Label>
                                <p className='font-mono text-sm'>{task.id}</p>
                            </div>
                            <div>
                                <Label>Status</Label>
                                <div className='mt-1'>
                                    {task.completed ? (
                                        <Badge
                                            variant='default'
                                            className='bg-green-100 text-green-800'
                                        >
                                            <IconCheck className='mr-1 h-3 w-3' />
                                            Completed
                                        </Badge>
                                    ) : (
                                        <Badge variant='secondary'>
                                            <IconX className='mr-1 h-3 w-3' />
                                            Pending
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                        <Separator />
                        <div>
                            <Label>Title</Label>
                            <p className='font-semibold text-lg'>{task.title}</p>
                        </div>
                        {task.description && (
                            <>
                                <Separator />
                                <div>
                                    <Label>Description</Label>
                                    <p className='text-sm leading-relaxed'>{task.description}</p>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Meta Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='grid grid-cols-2 gap-4 text-sm'>
                            <div>
                                <Label>Created At</Label>
                                <p className='font-mono'>
                                    {new Date(task.created_at!).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <Label>Updated At</Label>
                                <p className='font-mono'>
                                    {new Date(task.updated_at!).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: index().url,
    },
    {
        title: 'Show',
        href: '#',
    },
]

TaskShow.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />
