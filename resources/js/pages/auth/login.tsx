import { Form, Head } from '@inertiajs/react'
import { IconLogin } from '@tabler/icons-react'
import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { PasswordInput, TextField } from '@/components/ui/text-field'
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

            <Form
                {...login.store.form()}
                resetOnSuccess={['password']}
                className='flex flex-col gap-6'
            >
                {({ processing, errors, invalid, clearErrors }) => (
                    <>
                        <Field.Set>
                            <TextField
                                name='email'
                                autoFocus
                                autoComplete='email'
                                isInvalid={invalid('email')}
                            >
                                <Field.Label>Email address</Field.Label>
                                <Input placeholder='email@example.com' />
                                <Field.Error children={errors.email} />
                            </TextField>

                            <TextField
                                type='password'
                                name='password'
                                isInvalid={invalid('password')}
                                autoComplete='current-password'
                            >
                                <div className='flex items-center'>
                                    <Field.Label>Password</Field.Label>
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
                                <PasswordInput placeholder='Password' />
                                <Field.Error children={errors.password} />
                            </TextField>

                            <Checkbox value={'1'} name='remember'>
                                <Field.Label>Remember me</Field.Label>
                            </Checkbox>

                            <Button
                                type='submit'
                                className='mt-4 w-full'
                                isPending={processing}
                                data-test='login-button'
                                onPress={() => clearErrors()}
                            >
                                <IconLogin />
                                Log in
                            </Button>
                        </Field.Set>

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

Login.layout = {
    title: 'Log in to your account',
    description: 'Enter your email and password below to log in',
}
