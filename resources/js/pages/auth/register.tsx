import { Form, Head } from '@inertiajs/react'
import { IconUserPlus } from '@tabler/icons-react'
import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { TextField } from '@/components/ui/text-field'
import { login } from '@/wayfinder/routes'
import register from '@/wayfinder/routes/register'

export default function Register() {
    return (
        <>
            <Head title='Register' />
            <Form
                {...register.store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className='flex flex-col gap-6'
            >
                {({ processing, errors, invalid, clearErrors }) => (
                    <>
                        <Field.Set>
                            <TextField
                                type='text'
                                autoFocus
                                autoComplete='name'
                                name='name'
                                isInvalid={invalid('name')}
                            >
                                <Field.Label>Name</Field.Label>
                                <Input placeholder='Full name' />
                                <Field.Error children={errors.name} />
                            </TextField>

                            <TextField
                                type='email'
                                autoComplete='email'
                                name='email'
                                isInvalid={invalid('email')}
                            >
                                <Field.Label>Email address</Field.Label>
                                <Input placeholder='email@example.com' />
                                <Field.Error children={errors.email} />
                            </TextField>

                            <TextField
                                type='password'
                                autoComplete='new-password'
                                name='password'
                                isInvalid={invalid('password')}
                            >
                                <Field.Label>Password</Field.Label>
                                <Input placeholder='Password' />
                                <Field.Error children={errors.password} />
                            </TextField>

                            <TextField
                                type='password'
                                autoComplete='new-password'
                                name='password_confirmation'
                                isInvalid={invalid('password_confirmation')}
                            >
                                <Field.Label>Confirm password</Field.Label>
                                <Input placeholder='Confirm password' />
                                <Field.Error children={errors.password_confirmation} />
                            </TextField>

                            <Button
                                isPending={processing}
                                onPress={() => clearErrors()}
                                type='submit'
                                className='mt-2 w-full'
                                data-test='register-user-button'
                            >
                                <IconUserPlus />
                                Create account
                            </Button>
                        </Field.Set>

                        <div className='text-center text-muted-foreground text-sm'>
                            Already have an account?{' '}
                            <TextLink href={login()} tabIndex={6}>
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    )
}

Register.layout = {
    title: 'Create an account',
    description: 'Enter your details below to create your account',
}
