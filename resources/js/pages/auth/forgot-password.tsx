import { Form, Head, setLayoutProps } from '@inertiajs/react'

import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { FieldError, Label } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { TextField } from '@/components/ui/text-field'
import { login } from '@/routes'
import { email } from '@/routes/password'

export default ({ status }: { status?: string }) => {
    setLayoutProps({
        title: 'Forgot password',
        description: 'Enter your email to receive a password reset link',
    })
    return (
        <>
            <Head title="Forgot password" />

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="space-y-6">
                <Form {...email.form()}>
                    {({ processing, errors, invalid, resetAndClearErrors }) => (
                        <>
                            <TextField
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="off"
                                autoFocus
                                isInvalid={invalid('email')}
                            >
                                <Label>Email address</Label>
                                <Input placeholder="email@example.com" />

                                <FieldError>{errors.email}</FieldError>
                            </TextField>

                            <div className="my-6 flex items-center justify-start">
                                <Button
                                    className="w-full"
                                    onPress={() => resetAndClearErrors()}
                                    isPending={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    Email password reset link
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                <div className="space-x-1 text-center text-sm text-muted-foreground">
                    <span>Or, return to</span>
                    <TextLink href={login()}>log in</TextLink>
                </div>
            </div>
        </>
    )
}
