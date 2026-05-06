import { Form, Link } from '@inertiajs/react'
import { IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-react'
import { useMemo } from 'react'
import Heading from '@/components/heading'
import { Button, buttonVariants } from '@/components/ui/button'
import { Checkbox, CheckboxGroup } from '@/components/ui/checkbox'
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
import { TextField } from '@/components/ui/text-field'
import { groupPermissions, usePermission } from '@/hooks/use-permission'
import AppLayout from '@/layouts/app-layout'
import type { FormPageProps } from '@/types'
import { index, store, update } from '@/wayfinder/routes/roles'
import type { Spatie } from '@/wayfinder/types'

interface Props extends FormPageProps<Spatie.Permission.Models.Role> {
    permissions: Spatie.Permission.Models.Permission['name'][]
    guard_names: Spatie.Permission.Models.Role['guard_name'][]
}
export default function RoleForm({ data, permissions, guard_names }: Props) {
    const groupedPermissions = useMemo(() => {
        return groupPermissions(permissions)
    }, [permissions])

    const { canAll } = usePermission()
    return (
        <FieldGroup>
            <Heading
                title={data?.id ? 'Update Existing Role' : 'Create New Role'}
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
                {...(data?.id ? update.form({ id: data.id }) : store.form())}
                disableWhileProcessing
            >
                {({ processing, errors, invalid, clearErrors }) => (
                    <FieldSet>
                        <TextField
                            autoFocus
                            name='name'
                            defaultValue={data?.name}
                            isInvalid={invalid('name')}
                        >
                            <FieldLabel>Name</FieldLabel>
                            <Input placeholder='Name' />
                            <FieldError children={errors.name} />
                        </TextField>

                        {guard_names.length > 0 && (
                            <Select
                                defaultValue={data?.guard_name}
                                name='guard_name'
                                placeholder='Select Guard Name'
                                isInvalid={invalid('guard_name')}
                            >
                                <FieldLabel>Guard Name</FieldLabel>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent
                                    items={guard_names.map((guard_name) => ({
                                        id: guard_name,
                                        name: guard_name,
                                    }))}
                                >
                                    {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
                                </SelectContent>
                                <FieldError children={errors.guard_name} />
                            </Select>
                        )}

                        <FieldLabel>Permissions</FieldLabel>

                        <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
                            {Object.entries(groupedPermissions).map(([model, perms]) => (
                                <CheckboxGroup
                                    isDisabled={
                                        !canAll(perms.map((permission) => `${model}.${permission}`))
                                    }
                                    key={model}
                                    name='permissions[]'
                                >
                                    <FieldLabel>{model.toUpperCase()}</FieldLabel>

                                    {perms.map((permission) => (
                                        <Checkbox
                                            key={`${model}.${permission}`}
                                            value={`${model}.${permission}`}
                                        >
                                            <FieldLabel>{permission}</FieldLabel>
                                        </Checkbox>
                                    ))}
                                </CheckboxGroup>
                            ))}
                        </div>

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
        title: 'Roles',
        href: index().url,
    },
    {
        title: 'Form',
        href: '#',
    },
]

RoleForm.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />
