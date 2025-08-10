import { Head, useForm } from "@inertiajs/react"
import type { FormEventHandler } from "react"

import { Form, Link, Note } from "@/components/ui"
import { Button } from "@/components/ui/button"
import AuthLayout from "@/layouts/auth-layout"

export default function VerifyEmail({ status }: { status?: string }) {
  const { post, processing } = useForm({})

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route("verification.send"))
  }

  return (
    <>
      <Head title="Email verification" />

      {status === "verification-link-sent" && (
        <Note>
          A new verification link has been sent to the email address you provided during
          registration.
        </Note>
      )}

      <Form onSubmit={submit} className="space-y-6 text-center">
        <Button isDisabled={processing} isPending={processing} variant="secondary">
          Resend verification email
        </Button>

        <Link
          href={route("logout")}
          routerOptions={{ method: "post" }}
          className="mx-auto block text-sm"
        >
          Log out
        </Link>
      </Form>
    </>
  )
}

VerifyEmail.layout = (page: React.ReactNode) => (
  <AuthLayout
    title="Verify email"
    description="Please verify your email address by clicking on the link we just emailed to you."
    children={page}
  />
)
