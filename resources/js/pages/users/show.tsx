import { Head, Link } from '@inertiajs/react'
import {
    IconArrowLeft,
    IconEdit,
    IconMail,
    IconShield,
    IconUser,
    IconUsers,
} from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button-group'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { usePermission } from '@/hooks/use-permission'
import AppLayout from '@/layouts/app-layout'
import { initials, titleCase } from '@/lib/utils'
import type { BreadcrumbItem, Model } from '@/types'
import { edit, index } from '@/wayfinder/routes/users'
import type { App } from '@/wayfinder/types'

interface Props {
    data: Model<App.Models.User>
}

export default function UserShow({ data }: Props) {
    const { can } = usePermission()

    return (
        <>
            <Head title={`User: ${data.name}`} />
            <div className='space-y-6'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <Link
                            href={index().url}
                            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                        >
                            <IconArrowLeft />
                            Back to Users
                        </Link>
                    </div>
                    {can('user.update') && data.can.update && (
                        <Link href={edit({ user: data }).url} className={buttonVariants()}>
                            <IconEdit />
                            Edit User
                        </Link>
                    )}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-3'>
                            <div className='flex items-center gap-3'>
                                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                                    {data.avatar ? (
                                        <img
                                            src={data.avatar}
                                            alt={data.name}
                                            className='h-12 w-12 rounded-full object-cover'
                                        />
                                    ) : (
                                        <span className='font-medium text-lg'>
                                            {initials(data.name)}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <h2 className='font-semibold text-xl'>{data.name}</h2>
                                    <p className='text-muted-foreground text-sm'>{data.email}</p>
                                </div>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <Label>ID</Label>
                                <p className='font-mono text-sm'>{data.id}</p>
                            </div>
                            <div>
                                <Label>Email Verification</Label>
                                <div className='mt-1'>
                                    {data.email_verified_at ? (
                                        <Badge
                                            variant='default'
                                            className='bg-green-100 text-green-800'
                                        >
                                            Verified
                                        </Badge>
                                    ) : (
                                        <Badge variant='secondary'>Not Verified</Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                        <Separator />
                        <div>
                            <Label>Email Address</Label>
                            <div className='flex items-center gap-2'>
                                <IconMail className='h-4 w-4 text-muted-foreground' />
                                <p>{data.email}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <IconShield />
                            Roles ({data.roles?.length || 0})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {data.roles && data.roles.length > 0 ? (
                            <div className='flex flex-wrap gap-2'>
                                {data.roles.map((role) => (
                                    <Badge key={String(role)} variant='secondary'>
                                        <IconUsers className='mr-1 h-3 w-3' />
                                        {titleCase(String(role))}
                                    </Badge>
                                ))}
                            </div>
                        ) : (
                            <p className='text-muted-foreground'>No roles assigned to this user.</p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <IconUser />
                            Statistics
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <Label>Permissions Count</Label>
                                <p className='font-semibold text-2xl'>
                                    {data.permissions?.length || 0}
                                </p>
                            </div>
                            <div>
                                <Label>Total Notifications</Label>
                                <p className='font-semibold text-2xl'>
                                    {data.notifications?.length || 0}
                                </p>
                            </div>
                        </div>
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
                                    {new Date(data.created_at!).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <Label>Updated At</Label>
                                <p className='font-mono'>
                                    {new Date(data.updated_at!).toLocaleString()}
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
        title: 'Users',
        href: index().url,
    },
    {
        title: 'Show',
        href: '#',
    },
]

UserShow.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />
