import { Form, Head } from '@inertiajs/react'
import { IconKey } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { PasswordInput, TextField } from '@/components/ui/text-field'
import password from '@/wayfinder/routes/password'

export default function ConfirmPassword() {
    return (
        <>
            <Head title='Confirm password' />

            <Form {...password.confirm.form()} resetOnSuccess={['password']}>
                {({ processing, errors, invalid, clearErrors }) => (
                    <Field.Set>
                        <TextField
                            id='password'
                            type='password'
                            name='password'
                            autoComplete='current-password'
                            isInvalid={invalid('password')}
                            autoFocus
                        >
                            <Field.Label>Password</Field.Label>
                            <PasswordInput placeholder='Password' />
                            <Field.Error children={errors.password} />
                        </TextField>

                        <Button
                            className='w-full'
                            isPending={processing}
                            onPress={() => clearErrors()}
                            data-test='confirm-password-button'
                        >
                            <IconKey />
                            Confirm password
                        </Button>
                    </Field.Set>
                )}
            </Form>
        </>
    )
}

ConfirmPassword.layout = {
    title: 'Confirm your password',
    description:
        'This is a secure area of the application. Please confirm your password before continuing.',
}
