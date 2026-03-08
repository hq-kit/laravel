import { Form, Head } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { FieldError, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { TextField } from '@/components/ui/text-field'
import AuthLayout from '@/layouts/auth-layout'
import password from '@/wayfinder/routes/password'

type Props = {
    token: string
    email: string
}

export default function ResetPassword({ token, email }: Props) {
    return (
        <>
            <Head title='Reset password' />

            <Form
                {...password.update.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
            >
                {({ processing, errors, invalid, clearErrors }) => (
                    <FieldSet>
                        <TextField
                            id='email'
                            type='email'
                            name='email'
                            value={email}
                            autoComplete='email'
                            isInvalid={invalid('email')}
                            isReadOnly
                        >
                            <FieldLabel>Email</FieldLabel>
                            <Input />
                            <FieldError children={errors.email} />
                        </TextField>

                        <TextField
                            id='password'
                            type='password'
                            name='password'
                            autoComplete='new-password'
                            autoFocus
                        >
                            <FieldLabel>Password</FieldLabel>
                            <Input placeholder='Password' />
                            <FieldError children={errors.password} />
                        </TextField>

                        <TextField
                            id='password_confirmation'
                            type='password'
                            name='password_confirmation'
                            autoComplete='new-password'
                        >
                            <FieldLabel>Confirm password</FieldLabel>
                            <Input placeholder='Confirm password' />
                            <FieldError children={errors.password_confirmation} />
                        </TextField>

                        <Button
                            type='submit'
                            className='mt-4 w-full'
                            isPending={processing}
                            onPress={() => clearErrors()}
                            data-test='reset-password-button'
                        >
                            {processing && <Spinner />}
                            Reset password
                        </Button>
                    </FieldSet>
                )}
            </Form>
        </>
    )
}

ResetPassword.layout = (page: React.ReactNode) => (
    <AuthLayout title='Reset password' description='Please enter your new password below'>
        {page}
    </AuthLayout>
)
