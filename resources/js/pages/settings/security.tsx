import { Form, Head } from '@inertiajs/react'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { useRef } from 'react'

import SecurityController from '@/actions/App/Http/Controllers/Settings/SecurityController'
import Heading from '@/components/heading'
import type { Props as ManagePasskeysProps } from '@/components/manage-passkeys'
import ManagePasskeys from '@/components/manage-passkeys'
import type { Props as ManageTwoFactorProps } from '@/components/manage-two-factor'
import ManageTwoFactor from '@/components/manage-two-factor'
import { Button } from '@/components/ui/button'
import { FieldError } from '@/components/ui/field'
import { Label } from '@/components/ui/field'
import { PasswordInput, TextField } from '@/components/ui/text-field'
import { edit } from '@/routes/security'

// oxfmt-ignore
type Props = {
    passwordRules: string;
} & ManagePasskeysProps &
    ManageTwoFactorProps

export default function Security(props: Props) {
    const passwordInput = useRef<HTMLInputElement>(null)
    const currentPasswordInput = useRef<HTMLInputElement>(null)

    return (
        <>
            <Head title="Security settings" />

            <h1 className="sr-only">Security settings</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Update password"
                    description="Ensure your account is using a long, random password to stay secure"
                />

                <Form
                    {...SecurityController.update.form()}
                    options={{
                        preserveScroll: true,
                    }}
                    resetOnError={[
                        'password',
                        'password_confirmation',
                        'current_password',
                    ]}
                    resetOnSuccess
                    onError={(errors) => {
                        if (errors.password) {
                            passwordInput.current?.focus()
                        }

                        if (errors.current_password) {
                            currentPasswordInput.current?.focus()
                        }
                    }}
                    className="space-y-6"
                >
                    {({ errors, processing }) => (
                        <>
                            <TextField
                                id="current_password"
                                name="current_password"
                                autoComplete="current-password"
                            >
                                <Label>Password</Label>
                                <PasswordInput
                                    ref={currentPasswordInput}
                                    placeholder="Current password"
                                />
                                <FieldError>
                                    {errors.current_password}
                                </FieldError>
                            </TextField>

                            <TextField
                                id="password"
                                name="password"
                                isRequired
                                autoComplete="new-password"
                            >
                                <Label>Password</Label>
                                <PasswordInput placeholder="Password" />
                                <FieldError>{errors.password}</FieldError>
                            </TextField>

                            <TextField
                                id="password_confirmation"
                                isRequired
                                autoComplete="new-password"
                                name="password_confirmation"
                            >
                                <Label>Confirm Password</Label>
                                <PasswordInput placeholder="Confirm password" />
                                <FieldError>
                                    {errors.password_confirmation}
                                </FieldError>
                            </TextField>

                            <div className="flex items-center gap-4">
                                <Button
                                    isPending={processing}
                                    data-test="update-password-button"
                                >
                                    <IconDeviceFloppy />
                                    Save
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>

            <ManageTwoFactor
                canManageTwoFactor={props.canManageTwoFactor}
                requiresConfirmation={props.requiresConfirmation}
                twoFactorEnabled={props.twoFactorEnabled}
            />

            <ManagePasskeys
                canManagePasskeys={props.canManagePasskeys}
                passkeys={props.passkeys}
            />
        </>
    )
}

Security.layout = {
    breadcrumbs: [
        {
            title: 'Security settings',
            href: edit(),
        },
    ],
}
