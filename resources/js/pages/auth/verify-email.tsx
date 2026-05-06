import { Form, Head } from '@inertiajs/react'
import { IconMail } from '@tabler/icons-react'
import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { logout } from '@/wayfinder/routes'
import { send } from '@/wayfinder/routes/verification'

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

            <Form {...send.form()} className='space-y-6 text-center'>
                {({ processing }) => (
                    <>
                        <Button isPending={processing} variant='secondary'>
                            <IconMail />
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

VerifyEmail.layout = {
    title: 'Verify email',
    description: 'Please verify your email address by clicking on the link we just emailed to you.',
}
