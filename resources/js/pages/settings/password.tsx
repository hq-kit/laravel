import { useForm } from "@inertiajs/react"
import { IconDeviceFloppy } from "@tabler/icons-react"
import { type FormEventHandler, useRef } from "react"
import { Card, Form, TextField } from "@/components/ui"
import { Button } from "@/components/ui/button"

export default function Password() {
  const passwordInput = useRef<HTMLInputElement>(null)
  const currentPasswordInput = useRef<HTMLInputElement>(null)

  const { data, setData, errors, put, reset, processing } = useForm({
    current_password: "",
    password: "",
    password_confirmation: "",
  })

  const updatePassword: FormEventHandler = (e) => {
    e.preventDefault()

    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors) => {
        if (errors.password) {
          reset("password", "password_confirmation")
          passwordInput.current?.focus()
        }

        if (errors.current_password) {
          reset("current_password")
          currentPasswordInput.current?.focus()
        }
      },
    })
  }

  return (
    <Card>
      <Card.Header
        title="Update password"
        description="Ensure your account is using a long, random password to stay secure"
      />

      <Card.Content>
        <Form onSubmit={updatePassword} className="max-w-xl space-y-4" validationErrors={errors}>
          <TextField
            label="Current password"
            id="current_password"
            ref={currentPasswordInput}
            value={data.current_password}
            onChange={(v) => setData("current_password", v)}
            type="password"
            autoComplete="current-password"
            placeholder="Current password"
            errorMessage={errors.current_password}
          />
          <TextField
            label="New password"
            id="password"
            ref={passwordInput}
            type="password"
            autoComplete="new-password"
            placeholder="New password"
            value={data.password}
            onChange={(v) => setData("password", v)}
            errorMessage={errors.password}
          />

          <TextField
            label="Confirm password"
            name="password_confirmation"
            type="password"
            autoComplete="new-password"
            placeholder="Confirm password"
            value={data.password_confirmation}
            onChange={(v) => setData("password_confirmation", v)}
            errorMessage={errors.password_confirmation}
          />

          <Button type="submit" isDisabled={processing} isPending={processing}>
            <IconDeviceFloppy />
            Save password
          </Button>
        </Form>
      </Card.Content>
    </Card>
  )
}
