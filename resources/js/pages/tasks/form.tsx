import { Form, Link } from '@inertiajs/react'
import { IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-react'
import Heading from '@/components/heading'
import { Button, buttonVariants } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input, Textarea } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { TextField } from '@/components/ui/text-field'
import AppLayout from '@/layouts/app-layout'
import type { FormPageProps } from '@/types'
import { index, store, update } from '@/wayfinder/routes/tasks'
import type { App } from '@/wayfinder/types'

export default function TodoForm({ data }: FormPageProps<App.Models.Task>) {
    return (
        <FieldGroup>
            <Heading
                title={data?.id ? 'Update Existing Task' : 'Create New Task'}
                description='Please fill the form below'
            >
                <Link href={index()} className={buttonVariants({ variant: 'outline', size: 'sm' })}>
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
                            name='title'
                            defaultValue={data?.title}
                            isInvalid={invalid('title')}
                        >
                            <FieldLabel>Title</FieldLabel>
                            <Input placeholder='Title' />
                            <FieldError children={errors.title} />
                        </TextField>

                        <TextField
                            name='description'
                            defaultValue={data?.description ?? ''}
                            isInvalid={invalid('description')}
                        >
                            <FieldLabel>Description</FieldLabel>
                            <Textarea placeholder='Description' />
                            <FieldError children={errors.description} />
                        </TextField>

                        <Checkbox
                            value={'1'}
                            defaultSelected={data?.completed}
                            name='completed'
                            isInvalid={invalid('completed')}
                        >
                            <FieldLabel>Completed</FieldLabel>
                            <FieldError children={errors.completed} />
                        </Checkbox>

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
        title: 'Todos',
        href: index().url,
    },
    {
        title: 'Form',
        href: '#',
    },
]

TodoForm.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />
