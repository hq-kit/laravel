import { Form, Head } from '@inertiajs/react'
import { Icon2fa, IconShieldCheck } from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import Heading from '@/components/heading'
import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes'
import TwoFactorSetupModal from '@/components/two-factor-setup-modal'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { PasswordInput, TextField } from '@/components/ui/text-field'
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth'
import password from '@/wayfinder/routes/password'
import { edit } from '@/wayfinder/routes/security'
import { disable, enable } from '@/wayfinder/routes/two-factor'

type Props = {
    canManageTwoFactor?: boolean
    requiresConfirmation?: boolean
    twoFactorEnabled?: boolean
}

export default function Security({
    canManageTwoFactor = false,
    requiresConfirmation = false,
    twoFactorEnabled = false,
}: Props) {
    const passwordInput = useRef<HTMLInputElement>(null)
    const currentPasswordInput = useRef<HTMLInputElement>(null)

    const {
        qrCodeSvg,
        hasSetupData,
        manualSetupKey,
        clearSetupData,
        clearTwoFactorAuthData,
        fetchSetupData,
        recoveryCodesList,
        fetchRecoveryCodes,
        errors,
    } = useTwoFactorAuth()
    const [showSetupModal, setShowSetupModal] = useState<boolean>(false)
    const prevTwoFactorEnabled = useRef(twoFactorEnabled)

    useEffect(() => {
        if (prevTwoFactorEnabled.current && !twoFactorEnabled) {
            clearTwoFactorAuthData()
        }

        prevTwoFactorEnabled.current = twoFactorEnabled
    }, [twoFactorEnabled, clearTwoFactorAuthData])

    return (
        <>
            <Head title='Security settings' />

            <h1 className='sr-only'>Security settings</h1>

            <div className='space-y-6'>
                <Heading
                    variant='small'
                    title='Update password'
                    description='Ensure your account is using a long, random password to stay secure'
                />

                <Form
                    {...password.update.form()}
                    options={{
                        preserveScroll: true,
                    }}
                    resetOnError={['password', 'password_confirmation', 'current_password']}
                    resetOnSuccess
                    onError={(errors) => {
                        if (errors.password) {
                            passwordInput.current?.focus()
                        }

                        if (errors.current_password) {
                            currentPasswordInput.current?.focus()
                        }
                    }}
                    className='space-y-6'
                >
                    {({ errors, processing, invalid, clearErrors }) => (
                        <>
                            <TextField
                                name='current_password'
                                type='password'
                                autoComplete='current-password'
                                isInvalid={invalid('current_password')}
                            >
                                <Field.Label>Current password</Field.Label>
                                <PasswordInput
                                    ref={currentPasswordInput}
                                    placeholder='Current password'
                                />
                                <Field.Error children={errors.current_password} />
                            </TextField>

                            <TextField
                                name='password'
                                type='password'
                                autoComplete='new-password'
                                isInvalid={invalid('password')}
                            >
                                <Field.Label>New password</Field.Label>
                                <PasswordInput ref={passwordInput} placeholder='New password' />
                                <Field.Error children={errors.password} />
                            </TextField>

                            <TextField
                                name='password_confirmation'
                                type='password'
                                autoComplete='new-password'
                                isInvalid={invalid('password_confirmation')}
                            >
                                <Field.Label>Confirm password</Field.Label>
                                <PasswordInput placeholder='Confirm password' />
                                <Field.Error children={errors.password_confirmation} />
                            </TextField>

                            <Button
                                type='submit'
                                onPress={() => clearErrors()}
                                isPending={processing}
                                data-test='update-password-button'
                            >
                                Save password
                            </Button>
                        </>
                    )}
                </Form>
            </div>

            {canManageTwoFactor && (
                <div className='space-y-6'>
                    <Heading
                        variant='small'
                        title='Two-factor authentication'
                        description='Manage your two-factor authentication settings'
                    />
                    {twoFactorEnabled ? (
                        <div className='flex flex-col items-start justify-start space-y-4'>
                            <p className='text-muted-foreground text-sm'>
                                You will be prompted for a secure, random pin during login, which
                                you can retrieve from the TOTP-supported application on your phone.
                            </p>

                            <div className='relative inline'>
                                <Form {...disable.form()}>
                                    {({ processing }) => (
                                        <Button
                                            variant='destructive'
                                            type='submit'
                                            isPending={processing}
                                        >
                                            Disable 2FA
                                        </Button>
                                    )}
                                </Form>
                            </div>

                            <TwoFactorRecoveryCodes
                                recoveryCodesList={recoveryCodesList}
                                fetchRecoveryCodes={fetchRecoveryCodes}
                                errors={errors}
                            />
                        </div>
                    ) : (
                        <div className='flex flex-col items-start justify-start space-y-4'>
                            <p className='text-muted-foreground text-sm'>
                                When you enable two-factor authentication, you will be prompted for
                                a secure pin during login. This pin can be retrieved from a
                                TOTP-supported application on your phone.
                            </p>

                            <div>
                                {hasSetupData ? (
                                    <Button onPress={() => setShowSetupModal(true)}>
                                        <IconShieldCheck />
                                        Continue setup
                                    </Button>
                                ) : (
                                    <Form
                                        {...enable.form()}
                                        onSuccess={() => setShowSetupModal(true)}
                                    >
                                        {({ processing }) => (
                                            <Button type='submit' isPending={processing}>
                                                <Icon2fa />
                                                Enable 2FA
                                            </Button>
                                        )}
                                    </Form>
                                )}
                            </div>
                        </div>
                    )}

                    <TwoFactorSetupModal
                        isOpen={showSetupModal}
                        onClose={() => setShowSetupModal(false)}
                        requiresConfirmation={requiresConfirmation}
                        twoFactorEnabled={twoFactorEnabled}
                        qrCodeSvg={qrCodeSvg}
                        manualSetupKey={manualSetupKey}
                        clearSetupData={clearSetupData}
                        fetchSetupData={fetchSetupData}
                        errors={errors}
                    />
                </div>
            )}
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
