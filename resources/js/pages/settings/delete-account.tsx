import { useForm } from "@inertiajs/react"
import { IconAlertCircle, IconUserX } from "@tabler/icons-react"
import type React from "react"
import { useRef } from "react"

import { Button, Card, Form, Modal, Note, TextField } from "@/components/ui"

export default function DeleteAccount() {
  const passwordInput = useRef<HTMLInputElement>(null)
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors,
  } = useForm<Required<{ password: string }>>({ password: "" })

  const deleteUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    destroy(route("profile"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => reset(),
      onFinish: () => reset(),
    })
  }

  const closeModal = () => {
    clearErrors()
    reset()
  }

  return (
    <Card>
      <Card.Header
        title="Delete account"
        description="Delete your account and all of its resources"
      />
      <Card.Content>
        <Note variant="destructive" className="mb-4 max-w-xl border-destructive bg-destructive/10">
          <IconAlertCircle />
          Please proceed with caution, this cannot be undone.
        </Note>

        <Modal onOpenChange={closeModal}>
          <Button variant="destructive">
            <IconUserX />
            Delete account
          </Button>
          <Modal.Content role="alertdialog">
            <Form onSubmit={deleteUser} validationErrors={errors}>
              <Modal.Header>
                <Modal.Title>Are you sure you want to delete your account?</Modal.Title>
                <Modal.Description>
                  Once your account is deleted, all of its resources and data will also be
                  permanently deleted.
                </Modal.Description>
              </Modal.Header>
              <Modal.Body>
                <TextField
                  aria-label="Password"
                  type="password"
                  name="password"
                  ref={passwordInput}
                  value={data.password}
                  onChange={(v) => setData("password", v)}
                  placeholder="Password"
                  errorMessage={errors.password}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="outline" slot="close">
                  Cancel
                </Button>
                <Button variant="destructive" type="submit" isPending={processing}>
                  <IconAlertCircle />
                  Delete Account
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Content>
        </Modal>
      </Card.Content>
    </Card>
  )
}
