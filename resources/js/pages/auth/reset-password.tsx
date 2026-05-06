import { Form, Head } from '@inertiajs/react'
import { IconRefresh } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { TextField } from '@/components/ui/text-field'
import password from '@/wayfinder/routes/password'

type Props = {
    token: string
    email: string
}

export default function ResetPassword({ token, email }: Props) {
    return (
        <>
            <Head title='Reset password' />

            <Form
                {...password.update.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
            >
                {({ processing, errors, invalid, clearErrors }) => (
                    <Field.Set>
                        <TextField
                            id='email'
                            type='email'
                            name='email'
                            value={email}
                            autoComplete='email'
                            isInvalid={invalid('email')}
                            isReadOnly
                        >
                            <Field.Label>Email</Field.Label>
                            <Input />
                            <Field.Error children={errors.email} />
                        </TextField>

                        <TextField
                            id='password'
                            type='password'
                            name='password'
                            autoComplete='new-password'
                            autoFocus
                        >
                            <Field.Label>Password</Field.Label>
                            <Input placeholder='Password' />
                            <Field.Error children={errors.password} />
                        </TextField>

                        <TextField
                            id='password_confirmation'
                            type='password'
                            name='password_confirmation'
                            autoComplete='new-password'
                        >
                            <Field.Label>Confirm password</Field.Label>
                            <Input placeholder='Confirm password' />
                            <Field.Error children={errors.password_confirmation} />
                        </TextField>

                        <Button
                            type='submit'
                            className='mt-4 w-full'
                            isPending={processing}
                            onPress={() => clearErrors()}
                            data-test='reset-password-button'
                        >
                            <IconRefresh />
                            Reset password
                        </Button>
                    </Field.Set>
                )}
            </Form>
        </>
    )
}

ResetPassword.layout = {
    title: 'Reset password',
    description: 'Please enter your new password below',
}
