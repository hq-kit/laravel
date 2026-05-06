import { Form, Head } from '@inertiajs/react'
import { IconMail } from '@tabler/icons-react'
import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { TextField } from '@/components/ui/text-field'
import { login } from '@/wayfinder/routes'
import { email } from '@/wayfinder/routes/password'

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title='Forgot password' />

            {status && (
                <div className='mb-4 text-center font-medium text-green-600 text-sm'>{status}</div>
            )}

            <div className='space-y-6'>
                <Form {...email.form()}>
                    {({ processing, errors, invalid, clearErrors }) => (
                        <Field.Set>
                            <TextField
                                id='email'
                                name='email'
                                autoComplete='off'
                                isInvalid={invalid('email')}
                                autoFocus
                            >
                                <Field.Label>Email address</Field.Label>
                                <Input placeholder='email@example.com' />
                                <Field.Error children={errors.email} />
                            </TextField>

                            <Button
                                className='w-full'
                                type='submit'
                                isPending={processing}
                                onPress={() => clearErrors()}
                                data-test='email-password-reset-link-button'
                            >
                                <IconMail />
                                Email password reset link
                            </Button>
                        </Field.Set>
                    )}
                </Form>

                <div className='space-x-1 text-center text-muted-foreground text-sm'>
                    <span>Or, return to</span>
                    <TextLink href={login()}>log in</TextLink>
                </div>
            </div>
        </>
    )
}

ForgotPassword.layout = {
    title: 'Forgot password',
    description: 'Enter your email to receive a password reset link',
}
