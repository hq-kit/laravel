import { Form } from '@inertiajs/react'
import { IconCheck, IconCopy, IconLineScan } from '@tabler/icons-react'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import AlertError from '@/components/alert-error'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogBody,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { FieldError } from '@/components/ui/field'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Spinner } from '@/components/ui/spinner'
import { TextField } from '@/components/ui/text-field'
import { useAppearance } from '@/hooks/use-appearance'
import { useClipboard } from '@/hooks/use-clipboard'
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth'
import { confirm } from '@/wayfinder/routes/two-factor'

function GridScanIcon() {
    return (
        <div className='mb-3 rounded-full border border-border bg-card p-0.5 shadow-sm'>
            <div className='relative overflow-hidden rounded-full border border-border bg-muted p-2.5'>
                <div className='absolute inset-0 grid grid-cols-5 opacity-50'>
                    {Array.from({ length: 5 }, (_, i) => (
                        <div
                            key={`col-${i + 1}`}
                            className='border-border border-r last:border-r-0'
                        />
                    ))}
                </div>
                <div className='absolute inset-0 grid grid-rows-5 opacity-50'>
                    {Array.from({ length: 5 }, (_, i) => (
                        <div
                            key={`row-${i + 1}`}
                            className='border-border border-b last:border-b-0'
                        />
                    ))}
                </div>
                <IconLineScan className='relative z-20 size-6 text-foreground' />
            </div>
        </div>
    )
}

function TwoFactorSetupStep({
    qrCodeSvg,
    manualSetupKey,
    buttonText,
    onNextStep,
    errors,
}: {
    qrCodeSvg: string | null
    manualSetupKey: string | null
    buttonText: string
    onNextStep: () => void
    errors: string[]
}) {
    const { resolvedAppearance } = useAppearance()
    const [copiedText, copy] = useClipboard()
    const IconComponent = copiedText === manualSetupKey ? IconCheck : IconCopy

    return (
        <>
            {errors?.length ? (
                <AlertError errors={errors} />
            ) : (
                <>
                    <div className='mx-auto flex max-w-md overflow-hidden'>
                        <div className='mx-auto aspect-square w-64 rounded-lg border border-border'>
                            <div className='z-10 flex h-full w-full items-center justify-center p-5'>
                                {qrCodeSvg ? (
                                    <div
                                        className='aspect-square w-full rounded-lg bg-white p-2 [&_svg]:size-full'
                                        dangerouslySetInnerHTML={{
                                            __html: qrCodeSvg,
                                        }}
                                        style={{
                                            filter:
                                                resolvedAppearance === 'dark'
                                                    ? 'invert(1) brightness(1.5)'
                                                    : undefined,
                                        }}
                                    />
                                ) : (
                                    <Spinner />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='flex w-full space-x-5'>
                        <Button className='w-full' onClick={onNextStep}>
                            {buttonText}
                        </Button>
                    </div>

                    <div className='relative flex w-full items-center justify-center'>
                        <div className='absolute inset-0 top-1/2 h-px w-full bg-border' />
                        <span className='relative bg-card px-2 py-1'>
                            or, enter the code manually
                        </span>
                    </div>

                    <InputGroup>
                        {!manualSetupKey ? (
                            <InputGroupAddon className='flex h-full w-full items-center justify-center bg-muted p-3'>
                                <Spinner />
                            </InputGroupAddon>
                        ) : (
                            <>
                                <InputGroupInput type='text' readOnly value={manualSetupKey} />
                                <InputGroupAddon align='inline-end'>
                                    <InputGroupButton
                                        type='button'
                                        onPress={() => copy(manualSetupKey)}
                                    >
                                        <IconComponent />
                                    </InputGroupButton>
                                </InputGroupAddon>
                            </>
                        )}
                    </InputGroup>
                </>
            )}
        </>
    )
}

function TwoFactorVerificationStep({
    onClose,
    onBack,
}: {
    onClose: () => void
    onBack: () => void
}) {
    const [code, setCode] = useState<string>('')
    const pinInputContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setTimeout(() => {
            pinInputContainerRef.current?.querySelector('input')?.focus()
        }, 0)
    }, [])

    return (
        <Form {...confirm.form()} onSuccess={() => onClose()} resetOnError resetOnSuccess>
            {({
                processing,
                errors,
                clearErrors,
            }: {
                processing: boolean
                errors?: { confirmTwoFactorAuthentication?: { code?: string } }
                clearErrors: () => void
            }) => (
                <>
                    <div ref={pinInputContainerRef} className='relative w-full space-y-3'>
                        <TextField
                            isInvalid={!!errors?.confirmTwoFactorAuthentication?.code}
                            aria-label='code'
                            className='place-content-center'
                        >
                            <InputOTP
                                id='otp'
                                name='code'
                                maxLength={OTP_MAX_LENGTH}
                                onChange={setCode}
                                disabled={processing}
                                pattern={REGEXP_ONLY_DIGITS}
                            >
                                <InputOTPGroup>
                                    {Array.from({ length: OTP_MAX_LENGTH }, (_, index) => (
                                        <InputOTPSlot
                                            aria-invalid={
                                                !!errors?.confirmTwoFactorAuthentication?.code
                                            }
                                            key={index}
                                            index={index}
                                        />
                                    ))}
                                </InputOTPGroup>
                            </InputOTP>
                            <FieldError children={errors?.confirmTwoFactorAuthentication?.code} />
                        </TextField>

                        <div className='flex w-full space-x-5'>
                            <Button
                                type='button'
                                variant='outline'
                                className='flex-1'
                                onClick={onBack}
                                isPending={processing}
                            >
                                Back
                            </Button>
                            <Button
                                type='submit'
                                className='flex-1'
                                onPress={() => clearErrors()}
                                isDisabled={processing || code.length < OTP_MAX_LENGTH}
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </Form>
    )
}

type Props = {
    isOpen: boolean
    onClose: () => void
    requiresConfirmation: boolean
    twoFactorEnabled: boolean
    qrCodeSvg: string | null
    manualSetupKey: string | null
    clearSetupData: () => void
    fetchSetupData: () => Promise<void>
    errors: string[]
}

export default function TwoFactorSetupModal({
    isOpen,
    onClose,
    requiresConfirmation,
    twoFactorEnabled,
    qrCodeSvg,
    manualSetupKey,
    clearSetupData,
    fetchSetupData,
    errors,
}: Props) {
    const [showVerificationStep, setShowVerificationStep] = useState<boolean>(false)

    const modalConfig = useMemo<{
        title: string
        description: string
        buttonText: string
    }>(() => {
        if (twoFactorEnabled) {
            return {
                title: 'Two-factor authentication enabled',
                description:
                    'Two-factor authentication is now enabled. Scan the QR code or enter the setup key in your authenticator app.',
                buttonText: 'Close',
            }
        }

        if (showVerificationStep) {
            return {
                title: 'Verify authentication code',
                description: 'Enter the 6-digit code from your authenticator app',
                buttonText: 'Continue',
            }
        }

        return {
            title: 'Enable two-factor authentication',
            description:
                'To finish enabling two-factor authentication, scan the QR code or enter the setup key in your authenticator app',
            buttonText: 'Continue',
        }
    }, [twoFactorEnabled, showVerificationStep])

    const handleModalNextStep = useCallback(() => {
        if (requiresConfirmation) {
            setShowVerificationStep(true)
            return
        }

        clearSetupData()
        onClose()
    }, [requiresConfirmation, clearSetupData, onClose])

    const resetModalState = useCallback(() => {
        setShowVerificationStep(false)

        if (twoFactorEnabled) {
            clearSetupData()
        }
    }, [twoFactorEnabled, clearSetupData])

    useEffect(() => {
        if (isOpen && !qrCodeSvg) {
            fetchSetupData()
        }
    }, [isOpen, qrCodeSvg, fetchSetupData])

    const handleClose = useCallback(() => {
        resetModalState()
        onClose()
    }, [onClose, resetModalState])

    return (
        <Dialog isOpen={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogTrigger className='sr-only' />
            <DialogContent className='sm:max-w-md'>
                <DialogHeader className='flex items-center justify-center'>
                    <GridScanIcon />
                    <DialogTitle>{modalConfig.title}</DialogTitle>
                    <DialogDescription className='text-center'>
                        {modalConfig.description}
                    </DialogDescription>
                </DialogHeader>

                <DialogBody>
                    <div className='flex flex-col items-center space-y-5'>
                        {showVerificationStep ? (
                            <TwoFactorVerificationStep
                                onClose={onClose}
                                onBack={() => setShowVerificationStep(false)}
                            />
                        ) : (
                            <TwoFactorSetupStep
                                qrCodeSvg={qrCodeSvg}
                                manualSetupKey={manualSetupKey}
                                buttonText={modalConfig.buttonText}
                                onNextStep={handleModalNextStep}
                                errors={errors}
                            />
                        )}
                    </div>
                </DialogBody>
            </DialogContent>
        </Dialog>
    )
}
