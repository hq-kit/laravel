import { Form, Link } from '@inertiajs/react'
import { IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-react'
import Heading from '@/components/heading'
import { Button, buttonVariants } from '@/components/ui/button'
import { FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { Tag, TagGroup, TagList } from '@/components/ui/tag'
import { TextField } from '@/components/ui/text-field'
import { usePermission } from '@/hooks/use-permission'
import AppLayout from '@/layouts/app-layout'
import type { FormPageProps, Permission } from '@/types'
import users, { index } from '@/wayfinder/routes/users'
import type { App, Spatie } from '@/wayfinder/types'

export default function UserForm({
    data,
    method,
    roles,
}: FormPageProps<App.Models.User> & { roles: Spatie.Permission.Models.Role['name'][] }) {
    const { canAll, can } = usePermission()
    if (!can('user.create')) {
        return null
    }
    return (
        <FieldGroup>
            <Heading
                title={method === 'post' ? 'Create New User' : 'Update Existing User'}
                description='Please fill the form below'
            >
                <Link
                    href={index().url}
                    className={buttonVariants({ variant: 'outline', size: 'sm' })}
                >
                    <IconArrowLeft />
                    Back
                </Link>
            </Heading>
            <Form
                {...(method === 'post' ? users.store.form() : users.update.form({ id: data.id }))}
                disableWhileProcessing
            >
                {({ processing, errors, invalid, clearErrors }) => (
                    <FieldSet>
                        <TextField
                            type='text'
                            autoFocus
                            autoComplete='name'
                            name='name'
                            defaultValue={data?.name}
                            isInvalid={invalid('name')}
                        >
                            <FieldLabel>Name</FieldLabel>
                            <Input placeholder='Full name' />
                            <FieldError children={errors.name} />
                        </TextField>

                        <TextField
                            type='email'
                            autoComplete='email'
                            name='email'
                            defaultValue={data?.email}
                            isInvalid={invalid('email')}
                        >
                            <FieldLabel>Email address</FieldLabel>
                            <Input placeholder='email@example.com' />
                            <FieldError children={errors.email} />
                        </TextField>

                        {canAll(['user.assign-role', 'user.remove-role']) && roles.length > 0 && (
                            <Select
                                defaultValue={data.roles?.map((role) => role.name)}
                                name='roles[]'
                                placeholder='Select Roles'
                                selectionMode='multiple'
                                isInvalid={invalid('roles')}
                            >
                                <FieldLabel>Roles</FieldLabel>
                                <SelectTrigger>
                                    <SelectValue<Permission>>
                                        {({ selectedItems, state }) => (
                                            <TagGroup
                                                aria-label='Selected states'
                                                onRemove={(keys) => {
                                                    if (Array.isArray(state.value)) {
                                                        state.setValue(
                                                            state.value.filter((k) => !keys.has(k)),
                                                        )
                                                    }
                                                }}
                                            >
                                                <TagList
                                                    items={selectedItems.filter(
                                                        (item) => item != null,
                                                    )}
                                                    renderEmptyState={() => 'No selected items'}
                                                >
                                                    {(item) => <Tag>{item.name}</Tag>}
                                                </TagList>
                                            </TagGroup>
                                        )}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent
                                    items={roles.map((role) => ({
                                        id: role,
                                        name: role,
                                    }))}
                                >
                                    {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
                                </SelectContent>
                                <FieldError children={errors.roles} />
                            </Select>
                        )}

                        <Button isPending={processing} onPress={() => clearErrors()} type='submit'>
                            {processing ? <Spinner /> : <IconDeviceFloppy />}
                            Save
                        </Button>
                    </FieldSet>
                )}
            </Form>
        </FieldGroup>
    )
}

const breadcrumbs = [
    {
        title: 'Users',
        href: index().url,
    },
    {
        title: 'Form',
        href: '#',
    },
]

UserForm.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />
