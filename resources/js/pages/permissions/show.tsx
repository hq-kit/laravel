import { Head, Link } from '@inertiajs/react'
import { IconArrowLeft, IconEdit, IconKey, IconUsers } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button-group'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { usePermission } from '@/hooks/use-permission'
import AppLayout from '@/layouts/app-layout'
import type { BreadcrumbItem, Model } from '@/types'
import { edit, index } from '@/wayfinder/routes/permissions'
import type { Spatie } from '@/wayfinder/types'

interface Props {
    permission: Model<Spatie.Permission.Models.Permission>
}

export default function PermissionShow({ permission }: Props) {
    const { can } = usePermission()

    return (
        <>
            <Head title={`Permission: ${permission.name}`} />
            <div className='space-y-6'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <Link
                            href={index().url}
                            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                        >
                            <IconArrowLeft />
                            Back to Permissions
                        </Link>
                    </div>
                    {can('permission.update') && permission.can.update && (
                        <Link href={edit({ permission }).url} className={buttonVariants()}>
                            <IconEdit />
                            Edit Permission
                        </Link>
                    )}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <IconKey />
                            Permission Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <Label>ID</Label>
                                <p className='font-mono text-sm'>{permission.id}</p>
                            </div>
                            <div>
                                <Label>Guard Name</Label>
                                <p className='font-mono text-sm'>{permission.guard_name}</p>
                            </div>
                        </div>
                        <Separator />
                        <div>
                            <Label>Permission Name</Label>
                            <p className='font-semibold text-lg'>{permission.name}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <IconUsers />
                            Assigned Roles ({permission.roles?.length || 0})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {permission.roles && permission.roles.length > 0 ? (
                            <div className='flex flex-wrap gap-2'>
                                {permission.roles.map((role) => (
                                    <Badge key={String(role)} variant='secondary'>
                                        {String(role)}
                                    </Badge>
                                ))}
                            </div>
                        ) : (
                            <p className='text-muted-foreground'>
                                This permission is not assigned to any roles.
                            </p>
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
                                    {new Date(permission.created_at!).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <Label>Updated At</Label>
                                <p className='font-mono'>
                                    {new Date(permission.updated_at!).toLocaleString()}
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
        title: 'Permissions',
        href: index().url,
    },
    {
        title: 'Show',
        href: '#',
    },
]

PermissionShow.layout = (page: React.ReactNode) => (
    <AppLayout children={page} breadcrumbs={breadcrumbs} />
)
