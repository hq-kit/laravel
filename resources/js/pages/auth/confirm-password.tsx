import { Form, Head } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { FieldError, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { TextField } from '@/components/ui/text-field'
import AuthLayout from '@/layouts/auth-layout'
import password from '@/wayfinder/routes/password'

export default function ConfirmPassword() {
    return (
        <>
            <Head title='Confirm password' />

            <Form {...password.confirm.store.form()} resetOnSuccess={['password']}>
                {({ processing, errors, invalid, clearErrors }) => (
                    <FieldSet>
                        <TextField
                            id='password'
                            type='password'
                            name='password'
                            autoComplete='current-password'
                            isInvalid={invalid('password')}
                            autoFocus
                        >
                            <FieldLabel>Password</FieldLabel>
                            <Input placeholder='Password' />
                            <FieldError children={errors.password} />
                        </TextField>

                        <Button
                            className='w-full'
                            isPending={processing}
                            onPress={() => clearErrors()}
                            data-test='confirm-password-button'
                        >
                            {processing && <Spinner />}
                            Confirm password
                        </Button>
                    </FieldSet>
                )}
            </Form>
        </>
    )
}

ConfirmPassword.layout = (page: React.ReactNode) => (
    <AuthLayout
        title='Confirm your password'
        description='This is a secure area of the application. Please confirm your password before continuing.'
    >
        {page}
    </AuthLayout>
)
