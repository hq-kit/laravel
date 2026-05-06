import { Form } from '@inertiajs/react'
import { useRef } from 'react'
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogBody,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { TextField } from '@/components/ui/text-field'
import profile from '@/wayfinder/routes/profile'

export default function DeleteUser() {
    const passwordInput = useRef<HTMLInputElement>(null)

    return (
        <div className='space-y-6'>
            <Heading
                variant='small'
                title='Delete account'
                description='Delete your account and all of its resources'
            />
            <div className='space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10'>
                <div className='relative space-y-0.5 text-red-600 dark:text-red-100'>
                    <p className='font-medium'>Warning</p>
                    <p className='text-sm'>Please proceed with caution, this cannot be undone.</p>
                </div>

                <Dialog>
                    <Button variant='destructive' data-test='delete-user-button'>
                        Delete account
                    </Button>
                    <DialogContent role='alertdialog'>
                        <DialogHeader>
                            <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                            <DialogDescription>
                                Once your account is deleted, all of its resources and data will
                                also be permanently deleted. Please enter your password to confirm
                                you would like to permanently delete your account.
                            </DialogDescription>
                        </DialogHeader>

                        <Form
                            {...profile.destroy.form()}
                            options={{
                                preserveScroll: true,
                            }}
                            onError={() => passwordInput.current?.focus()}
                            resetOnSuccess
                        >
                            {({
                                resetAndClearErrors,
                                clearErrors,
                                processing,
                                errors,
                                invalid,
                            }) => (
                                <>
                                    <DialogBody>
                                        <TextField
                                            id='password'
                                            type='password'
                                            name='password'
                                            autoComplete='current-password'
                                            isInvalid={invalid('password')}
                                        >
                                            <FieldLabel className='sr-only'>Password</FieldLabel>
                                            <Input ref={passwordInput} placeholder='Password' />
                                            <FieldError children={errors.password} />
                                        </TextField>
                                    </DialogBody>

                                    <DialogFooter className='gap-2'>
                                        <Button
                                            slot='close'
                                            variant='secondary'
                                            onPress={() => resetAndClearErrors()}
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            type='submit'
                                            variant='destructive'
                                            isPending={processing}
                                            data-test='confirm-delete-user-button'
                                            onPress={() => clearErrors()}
                                        >
                                            Delete account
                                        </Button>
                                    </DialogFooter>
                                </>
                            )}
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
