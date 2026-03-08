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
import { TextField } from '@/components/ui/text-field'
import AppLayout from '@/layouts/app-layout'
import type { FormPageProps } from '@/types'
import { index, store, update } from '@/wayfinder/routes/permissions'
import type { Spatie } from '@/wayfinder/types'

export default function PermissionForm({
    data,
    guard_names,
}: FormPageProps<Spatie.Permission.Models.Permission> & {
    guard_names: Spatie.Permission.Models.Role['guard_name'][]
}) {
    return (
        <FieldGroup>
            <Heading
                title={data?.id ? 'Update Existing Permission' : 'Create New Permission'}
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
        title: 'Permissions',
        href: index().url,
    },
    {
        title: 'Form',
        href: '#',
    },
]

PermissionForm.layout = (page: React.ReactNode) => (
    <AppLayout children={page} breadcrumbs={breadcrumbs} />
)
