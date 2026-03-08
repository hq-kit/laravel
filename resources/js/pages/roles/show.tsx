import { Head, Link } from '@inertiajs/react'
import { IconArrowLeft, IconEdit, IconShield, IconUsers } from '@tabler/icons-react'
import { buttonVariants } from '@/components/ui/button-group'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tag, TagGroup, TagList } from '@/components/ui/tag'
import { groupPermissions, usePermission } from '@/hooks/use-permission'
import AppLayout from '@/layouts/app-layout'
import type { BreadcrumbItem, Model } from '@/types'
import { edit, index } from '@/wayfinder/routes/roles'
import type { Spatie } from '@/wayfinder/types'

interface Props {
    role: Model<Spatie.Permission.Models.Role>
}

export default function RoleShow({ role }: Props) {
    const { can } = usePermission()

    return (
        <>
            <Head title={`Role: ${role.name}`} />
            <div className='space-y-6'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <Link
                            href={index().url}
                            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                        >
                            <IconArrowLeft />
                            Back to Roles
                        </Link>
                    </div>
                    {can('role.update') && role.can.update && (
                        <Link href={edit({ role }).url} className={buttonVariants()}>
                            <IconEdit />
                            Edit Role
                        </Link>
                    )}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <IconShield />
                            Role Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <Label>ID</Label>
                                <p className='font-mono text-sm'>{role.id}</p>
                            </div>
                            <div>
                                <Label>Guard Name</Label>
                                <p className='font-mono text-sm'>{role.guard_name}</p>
                            </div>
                        </div>
                        <Separator />
                        <div>
                            <Label>Role Name</Label>
                            <p className='font-semibold text-lg'>{role.name}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <IconUsers />
                            Permissions ({role.permissions?.length || 0})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {role.permissions && role.permissions.length > 0 ? (
                            <div className='space-y-4'>
                                {Object.entries(
                                    groupPermissions(role.permissions.map((perm) => String(perm))),
                                ).map(([model, perms]) => (
                                    <div key={model}>
                                        <Label className='font-medium text-base'>{model}</Label>
                                        <TagGroup className='mt-2'>
                                            <TagList
                                                items={perms.map((perm) => ({
                                                    id: perm,
                                                    label: perm,
                                                }))}
                                            >
                                                {(item) => <Tag key={item.id}>{item.label}</Tag>}
                                            </TagList>
                                        </TagGroup>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className='text-muted-foreground'>
                                No permissions assigned to this role.
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
                                    {new Date(role.created_at!).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <Label>Updated At</Label>
                                <p className='font-mono'>
                                    {new Date(role.updated_at!).toLocaleString()}
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
        title: 'Roles',
        href: index().url,
    },
    {
        title: 'Show',
        href: '#',
    },
]

RoleShow.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />
