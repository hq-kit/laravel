import { Form, Head, setLayoutProps } from '@inertiajs/react'
import { IconUserPlus } from '@tabler/icons-react'

import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { FieldError } from '@/components/ui/field'
import { Label } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { PasswordInput, TextField } from '@/components/ui/text-field'
import { login } from '@/routes'
import { store } from '@/routes/register'

export default ({ passwordRules }: { passwordRules: string }) => {
    setLayoutProps({
        title: 'Create an account',
        description: 'Enter your details below to create your account',
    })

    return (
        <>
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors, invalid, resetAndClearErrors }) => (
                    <>
                        <div className="grid gap-6">
                            <TextField
                                id="name"
                                type="text"
                                isRequired
                                autoFocus
                                autoComplete="name"
                                name="name"
                                isInvalid={invalid('name')}
                            >
                                <Label>Name</Label>
                                <Input placeholder="Full name" />
                                <FieldError>{errors.name}</FieldError>
                            </TextField>

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
                                <Label>Password</Label>
                                <PasswordInput
                                    passwordrules={passwordRules}
                                    placeholder="Password"
                                />
                                <FieldError>{errors.password}</FieldError>
                            </TextField>

                            <TextField
                                id="password_confirmation"
                                isRequired
                                autoComplete="new-password"
                                isInvalid={invalid('password_confirmation')}
                                name="password_confirmation"
                            >
                                <Label>Confirm Password</Label>
                                <PasswordInput
                                    passwordrules={passwordRules}
                                    placeholder="Confirm password"
                                />
                                <FieldError>
                                    {errors.password_confirmation}
                                </FieldError>
                            </TextField>

                            <Button
                                isPending={processing}
                                onPress={() => resetAndClearErrors()}
                                type="submit"
                                className="mt-2 w-full"
                                data-test="register-user-button"
                            >
                                <IconUserPlus />
                                Create account
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
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
