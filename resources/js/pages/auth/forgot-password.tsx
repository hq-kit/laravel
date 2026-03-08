// Components
import { Form, Head } from '@inertiajs/react'
import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { FieldError, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { TextField } from '@/components/ui/text-field'
import AuthLayout from '@/layouts/auth-layout'
import { login } from '@/wayfinder/routes'
import password from '@/wayfinder/routes/password'

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title='Forgot password' />

            {status && (
                <div className='mb-4 text-center font-medium text-green-600 text-sm'>{status}</div>
            )}

            <div>
                <Form {...password.email.form()}>
                    {({ processing, errors, invalid, clearErrors }) => (
                        <FieldSet>
                            <TextField
                                id='email'
                                name='email'
                                autoComplete='off'
                                isInvalid={invalid('email')}
                                autoFocus
                            >
                                <FieldLabel>Email address</FieldLabel>
                                <Input placeholder='email@example.com' />
                                <FieldError children={errors.email} />
                            </TextField>

                            <Button
                                className='w-full'
                                type='submit'
                                isPending={processing}
                                onPress={() => clearErrors()}
                                data-test='email-password-reset-link-button'
                            >
                                {processing && <Spinner />}
                                Email password reset link
                            </Button>
                        </FieldSet>
                    )}
                </Form>
                <div className='mt-6 space-x-1 text-center text-muted-foreground text-sm'>
                    <span>Or, return to</span>
                    <TextLink href={login()}>log in</TextLink>
                </div>
            </div>
        </>
    )
}

ForgotPassword.layout = (page: React.ReactNode) => (
    <AuthLayout
        title='Forgot password'
        description='Enter your email to receive a password reset link'
    >
        {page}
    </AuthLayout>
)
