import { Form, Head, Link, usePage } from '@inertiajs/react'
import DeleteUser from '@/components/delete-user'
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { TextField } from '@/components/ui/text-field'
import profile from '@/wayfinder/routes/profile'
import verification from '@/wayfinder/routes/verification'

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean
    status?: string
}) {
    const { auth } = usePage().props

    return (
        <>
            <Head title='Profile settings' />

            <h1 className='sr-only'>Profile settings</h1>

            <div className='space-y-6'>
                <Heading
                    variant='small'
                    title='Profile information'
                    description='Update your name and email address'
                />

                <Form
                    {...profile.update.form()}
                    options={{
                        preserveScroll: true,
                    }}
                    className='space-y-6'
                >
                    {({ processing, invalid, clearErrors, errors }) => (
                        <>
                            <TextField
                                defaultValue={auth.user.name}
                                name='name'
                                autoComplete='name'
                                isInvalid={invalid('name')}
                            >
                                <Field.Label>Name</Field.Label>
                                <Input placeholder='Full name' />
                                <Field.Error children={errors.name} />
                            </TextField>

                            <TextField
                                defaultValue={auth.user.email}
                                name='email'
                                autoComplete='email'
                                isInvalid={invalid('email')}
                            >
                                <Field.Label>Email address</Field.Label>
                                <Input placeholder='Email address' />
                                <Field.Error children={errors.email} />
                            </TextField>

                            {mustVerifyEmail && auth.user.email_verified_at === null && (
                                <div>
                                    <p className='-mt-4 text-muted-foreground text-sm'>
                                        Your email address is unverified.{' '}
                                        <Link
                                            href={verification.send()}
                                            as='button'
                                            className='text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500'
                                        >
                                            Click here to resend the verification email.
                                        </Link>
                                    </p>

                                    {status === 'verification-link-sent' && (
                                        <div className='mt-2 font-medium text-green-600 text-sm'>
                                            A new verification link has been sent to your email
                                            address.
                                        </div>
                                    )}
                                </div>
                            )}

                            <Button
                                type='submit'
                                onPress={() => clearErrors()}
                                isPending={processing}
                                data-test='update-profile-button'
                            >
                                Save
                            </Button>
                        </>
                    )}
                </Form>
            </div>

            <DeleteUser />
        </>
    )
}

Profile.layout = {
    breadcrumbs: [
        {
            title: 'Profile settings',
            href: profile.edit(),
        },
    ],
}
