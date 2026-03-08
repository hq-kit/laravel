import { Form, Head } from '@inertiajs/react'
import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { FieldError, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { TextField } from '@/components/ui/text-field'
import AuthLayout from '@/layouts/auth-layout'
import { login } from '@/wayfinder/routes'
import register from '@/wayfinder/routes/register'

export default function Register() {
    return (
        <>
            <Head title='Register' />
            <Form
                {...register.store()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className='flex flex-col gap-6'
                noValidate
            >
                {({ processing, errors, invalid, clearErrors }) => (
                    <>
                        <FieldSet>
                            <TextField
                                type='text'
                                autoFocus
                                autoComplete='name'
                                name='name'
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
                                isInvalid={invalid('email')}
                            >
                                <FieldLabel>Email address</FieldLabel>
                                <Input placeholder='email@example.com' />
                                <FieldError children={errors.email} />
                            </TextField>

                            <TextField
                                type='password'
                                autoComplete='new-password'
                                name='password'
                                isInvalid={invalid('password')}
                            >
                                <FieldLabel>Password</FieldLabel>
                                <Input placeholder='Password' />
                                <FieldError children={errors.password} />
                            </TextField>

                            <TextField
                                type='password'
                                autoComplete='new-password'
                                name='password_confirmation'
                                isInvalid={invalid('password_confirmation')}
                            >
                                <FieldLabel>Confirm password</FieldLabel>
                                <Input placeholder='Confirm password' />
                                <FieldError children={errors.password_confirmation} />
                            </TextField>

                            <Button
                                isPending={processing}
                                onPress={() => clearErrors()}
                                type='submit'
                                className='mt-2 w-full'
                                data-test='register-user-button'
                            >
                                {processing && <Spinner />}
                                Create account
                            </Button>
                        </FieldSet>

                        <div className='text-center text-muted-foreground text-sm'>
                            Already have an account?{' '}
                            <TextLink href={login()} tabIndex={6}>
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    )
}

Register.layout = (page: React.ReactNode) => (
    <AuthLayout
        title='Create an account'
        description='Enter your details below to create your account'
    >
        {page}
    </AuthLayout>
)
