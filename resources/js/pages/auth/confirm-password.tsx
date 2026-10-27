import { Form, Head, setLayoutProps } from '@inertiajs/react'

import {
    index as confirmOptions,
    store as confirmStore,
} from '@/actions/Laravel/Passkeys/Http/Controllers/PasskeyConfirmationController'
import PasskeyVerify from '@/components/passkey-verify'
import { Button } from '@/components/ui/button'
import { FieldError, FieldGroup, Label } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { PasswordInput, TextField } from '@/components/ui/text-field'
import { store } from '@/routes/password/confirm'

export default () => {
    setLayoutProps({
        title: 'Confirm password',
        description:
            'This is a secure area of the application. Please confirm your password before continuing.',
    })
    return (
        <>
            <Head title="Confirm password" />

            <PasskeyVerify
                routes={{
                    options: confirmOptions(),
                    submit: confirmStore(),
                }}
                label="Confirm with passkey"
                loadingLabel="Confirming..."
                separator="Or confirm with password"
            />

            <Form {...store.form()} resetOnSuccess={['password']}>
                {({ processing, errors, invalid, resetAndClearErrors }) => (
                    <FieldGroup>
                        <TextField
                            isInvalid={invalid('password')}
                            id="password"
                            name="password"
                            autoComplete="current-password"
                            autoFocus
                        >
                            <Label>Password</Label>
                            <PasswordInput placeholder="Password" />
                            <FieldError>{errors.password}</FieldError>
                        </TextField>

                        <div className="flex items-center">
                            <Button
                                onPress={() => resetAndClearErrors()}
                                className="w-full"
                                isPending={processing}
                                data-test="confirm-password-button"
                            >
                                {processing && <Spinner />}
                                Confirm password
                            </Button>
                        </div>
                    </FieldGroup>
                )}
            </Form>
        </>
    )
}
