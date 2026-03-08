import { Form, Head } from '@inertiajs/react'
import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FieldError, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { TextField } from '@/components/ui/text-field'
import AuthLayout from '@/layouts/auth-layout'
import { register } from '@/wayfinder/routes'
import login from '@/wayfinder/routes/login'
import password from '@/wayfinder/routes/password'

type Props = {
    status?: string
    canResetPassword: boolean
    canRegister: boolean
}

export default function Login({ status, canResetPassword, canRegister }: Props) {
    return (
        <>
            <Head title='Log in' />

            <Form {...login.store()} resetOnSuccess={['password']} className='flex flex-col gap-6'>
                {({ processing, errors, invalid, clearErrors }) => (
                    <>
                        <FieldSet>
                            <TextField
                                name='email'
                                autoFocus
                                autoComplete='email'
                                isInvalid={invalid('email')}
                            >
                                <FieldLabel>Email address</FieldLabel>
                                <Input placeholder='email@example.com' />
                                <FieldError children={errors.email} />
                            </TextField>

                            <TextField
                                type='password'
                                name='password'
                                isInvalid={invalid('password')}
                                autoComplete='current-password'
                            >
                                <div className='flex items-center'>
                                    <FieldLabel>Password</FieldLabel>
                                    {canResetPassword && (
                                        <TextLink
                                            href={password.request()}
                                            className='ml-auto text-sm'
                                            tabIndex={5}
                                        >
                                            Forgot password?
                                        </TextLink>
                                    )}
                                </div>
                                <Input placeholder='Password' />
                                <FieldError children={errors.password} />
                            </TextField>

                            <Checkbox isInvalid={invalid('remember')} id='remember' name='remember'>
                                <FieldLabel>Remember me</FieldLabel>
                                <FieldError children={errors.remember} />
                            </Checkbox>

                            <Button
                                type='submit'
                                className='mt-4 w-full'
                                isPending={processing}
                                data-test='login-button'
                                onPress={() => clearErrors()}
                            >
                                {processing && <Spinner />}
                                Log in
                            </Button>
                        </FieldSet>

                        {canRegister && (
                            <div className='text-center text-muted-foreground text-sm'>
                                Don't have an account?{' '}
                                <TextLink href={register()} tabIndex={5}>
                                    Sign up
                                </TextLink>
                            </div>
                        )}
                    </>
                )}
            </Form>

            {status && (
                <div className='mb-4 text-center font-medium text-green-600 text-sm'>{status}</div>
            )}
        </>
    )
}

Login.layout = (page: React.ReactNode) => (
    <AuthLayout
        title='Log in to your account'
        description='Enter your email and password below to log in'
    >
        {page}
    </AuthLayout>
)
