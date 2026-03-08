import { Form, Head } from '@inertiajs/react'
import { useRef } from 'react'
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { TextField } from '@/components/ui/text-field'
import AppLayout from '@/layouts/app-layout'
import SettingsLayout from '@/layouts/settings/layout'
import type { BreadcrumbItem } from '@/types'
import userPassword from '@/wayfinder/routes/user-password'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Password settings',
        href: userPassword.edit(),
    },
]

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null)
    const currentPasswordInput = useRef<HTMLInputElement>(null)

    return (
        <>
            <Head title='Password settings' />

            <h1 className='sr-only'>Password settings</h1>

            <SettingsLayout>
                <div className='space-y-6'>
                    <Heading
                        variant='small'
                        title='Update password'
                        description='Ensure your account is using a long, random password to stay secure'
                    />

                    <Form
                        {...userPassword.update.form()}
                        options={{
                            preserveScroll: true,
                        }}
                        resetOnError={['password', 'password_confirmation', 'current_password']}
                        resetOnSuccess
                        onError={(errors) => {
                            if (errors.password) {
                                passwordInput.current?.focus()
                            }

                            if (errors.current_password) {
                                currentPasswordInput.current?.focus()
                            }
                        }}
                        className='space-y-6'
                    >
                        {({ errors, processing, invalid, clearErrors }) => (
                            <>
                                <TextField
                                    name='current_password'
                                    type='password'
                                    autoComplete='current-password'
                                    isInvalid={invalid('current_password')}
                                >
                                    <FieldLabel>Current password</FieldLabel>
                                    <Input
                                        ref={currentPasswordInput}
                                        placeholder='Current password'
                                    />
                                    <FieldError children={errors.current_password} />
                                </TextField>

                                <TextField
                                    name='password'
                                    type='password'
                                    autoComplete='new-password'
                                    isInvalid={invalid('password')}
                                >
                                    <FieldLabel>New password</FieldLabel>
                                    <Input ref={passwordInput} placeholder='New password' />
                                    <FieldError children={errors.password} />
                                </TextField>

                                <TextField
                                    name='password_confirmation'
                                    type='password'
                                    autoComplete='new-password'
                                    isInvalid={invalid('password_confirmation')}
                                >
                                    <FieldLabel>Confirm password</FieldLabel>
                                    <Input placeholder='Confirm password' />
                                    <FieldError children={errors.password_confirmation} />
                                </TextField>

                                <Button
                                    type='submit'
                                    onPress={() => clearErrors()}
                                    isPending={processing}
                                    data-test='update-password-button'
                                >
                                    Save password
                                </Button>
                            </>
                        )}
                    </Form>
                </div>
            </SettingsLayout>
        </>
    )
}

Password.layout = (page: React.ReactNode) => <AppLayout breadcrumbs={breadcrumbs} children={page} />
