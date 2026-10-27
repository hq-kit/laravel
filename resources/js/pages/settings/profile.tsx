import { Form, Head, setLayoutProps, usePage } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import { IconDeviceFloppy } from '@tabler/icons-react'

import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController'
import DeleteUser from '@/components/delete-user'
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { FieldError } from '@/components/ui/field'
import { Label } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { TextField } from '@/components/ui/text-field'
import { edit } from '@/routes/profile'
import { send } from '@/routes/verification'

export default ({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean
    status?: string
}) => {
    const { auth } = usePage().props
    setLayoutProps({
        breadcrumbs: [
            {
                title: 'Profile settings',
                href: edit(),
            },
        ],
    })

    return (
        <>
            <Head title="Profile settings" />

            <h1 className="sr-only">Profile settings</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Profile"
                    description="Update your name and email address"
                />

                <Form
                    {...ProfileController.update.form()}
                    options={{
                        preserveScroll: true,
                    }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <TextField
                                id="name"
                                type="text"
                                isRequired
                                autoFocus
                                defaultValue={auth.user.name}
                                autoComplete="name"
                                name="name"
                            >
                                <Label>Name</Label>
                                <Input placeholder="Full name" />
                                <FieldError>{errors.name}</FieldError>
                            </TextField>

                            <TextField
                                id="email"
                                type="email"
                                name="email"
                                defaultValue={auth.user.email}
                                isRequired
                                autoFocus
                                autoComplete="email"
                            >
                                <Label>Email address</Label>
                                <Input placeholder="email@example.com" />
                                <FieldError>{errors.email}</FieldError>
                            </TextField>

                            {mustVerifyEmail &&
                                auth.user.email_verified_at === null && (
                                    <div>
                                        <p className="-mt-4 text-sm text-muted-foreground">
                                            Your email address is unverified.{' '}
                                            <Link
                                                href={send()}
                                                as="button"
                                                className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                            >
                                                Click here to re-send the
                                                verification email.
                                            </Link>
                                        </p>

                                        {status ===
                                            'verification-link-sent' && (
                                            <div className="mt-2 text-sm font-medium text-green-600">
                                                A new verification link has been
                                                sent to your email address.
                                            </div>
                                        )}
                                    </div>
                                )}

                            <div className="flex items-center gap-4">
                                <Button
                                    type="submit"
                                    isPending={processing}
                                    data-test="update-profile-button"
                                >
                                    <IconDeviceFloppy />
                                    Save
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>

            <DeleteUser />
        </>
    )
}
