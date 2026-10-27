import { Form } from '@inertiajs/react'
import { useRef } from 'react'

import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController'
import Heading from '@/components/heading'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { FieldError, Label } from '@/components/ui/field'
import { PasswordInput, TextField } from '@/components/ui/text-field'

export default function DeleteUser() {
    const passwordInput = useRef<HTMLInputElement>(null)

    return (
        <div className="space-y-6">
            <Heading
                variant="small"
                title="Delete account"
                description="Delete your account and all of its resources"
            />
            <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
                <div className="relative space-y-0.5 text-destructive">
                    <p className="font-medium">Warning</p>
                    <p className="text-sm">
                        Please proceed with caution, this cannot be undone.
                    </p>
                </div>

                <AlertDialog>
                    <Button
                        variant="destructive"
                        data-test="delete-user-button"
                    >
                        Delete account
                    </Button>
                    <AlertDialog.Content>
                        <AlertDialog.Title>
                            Are you sure you want to delete your account?
                        </AlertDialog.Title>
                        <AlertDialog.Description>
                            Once your account is deleted, all of its resources
                            and data will also be permanently deleted. Please
                            enter your password to confirm you would like to
                            permanently delete your account.
                        </AlertDialog.Description>

                        <Form
                            {...ProfileController.destroy.form()}
                            options={{
                                preserveScroll: true,
                            }}
                            onError={() => passwordInput.current?.focus()}
                            resetOnSuccess
                            className="space-y-6"
                        >
                            {({
                                resetAndClearErrors,
                                processing,
                                errors,
                                invalid,
                            }) => (
                                <>
                                    <TextField
                                        isInvalid={invalid('password')}
                                        id="password"
                                        name="password"
                                        autoComplete="current-password"
                                    >
                                        <Label className="sr-only">
                                            Password
                                        </Label>

                                        <PasswordInput
                                            ref={passwordInput}
                                            placeholder="Password"
                                        />

                                        <FieldError>
                                            {errors.password}
                                        </FieldError>
                                    </TextField>

                                    <AlertDialog.Footer className="gap-2">
                                        <DialogClose
                                            onPress={() =>
                                                resetAndClearErrors()
                                            }
                                        >
                                            Cancel
                                        </DialogClose>

                                        <Button
                                            isPending={processing}
                                            variant="destructive"
                                            data-test="confirm-delete-user-button"
                                            type="submit"
                                            onPress={() =>
                                                resetAndClearErrors()
                                            }
                                        >
                                            Delete account
                                        </Button>
                                    </AlertDialog.Footer>
                                </>
                            )}
                        </Form>
                    </AlertDialog.Content>
                </AlertDialog>
            </div>
        </div>
    )
}
