// Components
import { Form, Head } from '@inertiajs/react'
import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import AuthLayout from '@/layouts/auth-layout'
import { logout } from '@/wayfinder/routes'
import verification from '@/wayfinder/routes/verification'

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <>
            <Head title='Email verification' />

            {status === 'verification-link-sent' && (
                <div className='mb-4 text-center font-medium text-green-600 text-sm'>
                    A new verification link has been sent to the email address you provided during
                    registration.
                </div>
            )}

            <Form {...verification.send.form()} className='space-y-6 text-center'>
                {({ processing }) => (
                    <>
                        <Button isPending={processing} type='submit' variant='secondary'>
                            {processing && <Spinner />}
                            Resend verification email
                        </Button>

                        <TextLink href={logout()} className='mx-auto block text-sm'>
                            Log out
                        </TextLink>
                    </>
                )}
            </Form>
        </>
    )
}

VerifyEmail.layout = (page: React.ReactNode) => (
    <AuthLayout
        title='Verify email'
        description='Please verify your email address by clicking on the link we just emailed to you.'
    >
        {page}
    </AuthLayout>
)
