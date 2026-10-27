import { Form, Head } from '@inertiajs/react'
import { IconRefresh } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { FieldError } from '@/components/ui/field'
import { Label } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { PasswordInput, TextField } from '@/components/ui/text-field'
import { update } from '@/routes/password'

type Props = {
    token: string
    email: string
    passwordRules: string
}

export default function ResetPassword({ token, email, passwordRules }: Props) {
    return (
        <>
            <Head title="Reset password" />

            <Form
                {...update.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
            >
                {({ processing, errors }) => (
                    <div className="grid gap-6">
                        <TextField
                            id="email"
                            type="email"
                            name="email"
                            isRequired
                            autoFocus
                            autoComplete="email"
                            value={email}
                        >
                            <Label>Email address</Label>
                            <Input placeholder="email@example.com" />
                            <FieldError>{errors.email}</FieldError>
                        </TextField>

                        <TextField
                            id="password"
                            name="password"
                            isRequired
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
                            type="submit"
                            className="mt-4 w-full"
                            isPending={processing}
                            data-test="reset-password-button"
                        >
                            <IconRefresh />
                            Reset password
                        </Button>
                    </div>
                )}
            </Form>
        </>
    )
}

ResetPassword.layout = {
    title: 'Reset password',
    description: 'Please enter your new password below',
}
