import { Form, Head, setLayoutProps } from '@inertiajs/react'
import { IconLogin } from '@tabler/icons-react'

import PasskeyVerify from '@/components/passkey-verify'
import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FieldError, FieldGroup } from '@/components/ui/field'
import { Label } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { PasswordInput, TextField } from '@/components/ui/text-field'
import { register } from '@/routes'
import { store } from '@/routes/login'
import { request } from '@/routes/password'

type Props = {
    status?: string
    canResetPassword: boolean
}

export default ({ status, canResetPassword }: Props) => {
    setLayoutProps({
        title: 'Log in to your account',
        description: 'Enter your email and password below to log in',
    })
    return (
        <>
            <Head title="Log in" />

            <PasskeyVerify />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors, invalid, resetAndClearErrors }) => (
                    <>
                        <FieldGroup>
                            <TextField
                                id="email"
                                type="email"
                                name="email"
                                isRequired
                                autoFocus
                                autoComplete="email"
                                isInvalid={invalid('email')}
                            >
                                <Label>Email address</Label>
                                <Input placeholder="email@example.com" />
                                <FieldError>{errors.email}</FieldError>
                            </TextField>

                            <TextField
                                id="password"
                                name="password"
                                isRequired
                                isInvalid={invalid('password')}
                                autoComplete="current-password"
                            >
                                <div className="flex items-center justify-between">
                                    <Label>Password</Label>
                                    {canResetPassword && (
                                        <TextLink
                                            tabIndex={-1}
                                            href={request()}
                                            className="ml-auto text-sm"
                                        >
                                            Forgot your password?
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput placeholder="Password" />
                                <FieldError>{errors.password}</FieldError>
                            </TextField>

                            <Checkbox id="remember" name="remember">
                                Remember me
                            </Checkbox>

                            <Button
                                type="submit"
                                onPress={() => resetAndClearErrors()}
                                isPending={processing}
                                data-test="login-button"
                            >
                                <IconLogin />
                                Log in
                            </Button>
                        </FieldGroup>

                        <div className="text-center text-sm text-muted-foreground">
                            Don't have an account?{' '}
                            <TextLink href={register()} tabIndex={5}>
                                Sign up
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </>
    )
}
