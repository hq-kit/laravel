import { Link, useForm, usePage } from "@inertiajs/react"
import { IconDeviceFloppy } from "@tabler/icons-react"
import type { FormEventHandler } from "react"

import { Card, Form, Note, TextField } from "@/components/ui"
import { Button } from "@/components/ui/button"
import type { SharedData } from "@/types"

type ProfileForm = {
  name: string
  email: string
}

export default function Profile({
  mustVerifyEmail,
  status,
}: {
  mustVerifyEmail: boolean
  status?: string
}) {
  const { auth } = usePage<SharedData>().props

  const { data, setData, patch, errors, processing } = useForm<Required<ProfileForm>>({
    name: auth.user.name,
    email: auth.user.email,
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    patch(route("profile"), {
      preserveScroll: true,
    })
  }

  return (
    <Card>
      <Card.Header title="Profile information" description="Update your name and email address" />

      <Card.Content>
        <Form onSubmit={submit} className="max-w-xl space-y-4" validationErrors={errors}>
          <TextField
            label="Name"
            name="name"
            isRequired
            autoComplete="name"
            placeholder="Full name"
            autoFocus
            value={data.name}
            onChange={(v) => setData("name", v)}
            errorMessage={errors.name}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={data.email}
            onChange={(v) => setData("email", v)}
            isRequired
            autoComplete="email"
            placeholder="Email address"
            errorMessage={errors.email}
          />

          {mustVerifyEmail && auth.user.email_verified_at === null && (
            <div>
              <p className="-mt-4 text-muted-foreground text-sm">
                Your email address is unverified.
                <Link
                  href={route("verification.send")}
                  method="post"
                  as="button"
                  className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                >
                  Click here to resend the verification email.
                </Link>
              </p>

              {status === "verification-link-sent" && (
                <Note>A new verification link has been sent to the email address</Note>
              )}
            </div>
          )}

          <Button type="submit" isPending={processing}>
            <IconDeviceFloppy />
            Save
          </Button>
        </Form>
      </Card.Content>
    </Card>
  )
}
