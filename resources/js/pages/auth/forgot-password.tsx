import { Head, useForm } from "@inertiajs/react"
import type { FormEventHandler } from "react"

import { Form, Link, TextField } from "@/components/ui"
import { Button } from "@/components/ui/button"
import AuthLayout from "@/layouts/auth-layout"

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
    email: "",
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route("password.email"))
  }

  return (
    <>
      <Head title="Forgot password" />

      {status && (
        <div className="mb-4 text-center font-medium text-emerald-500 text-sm">{status}</div>
      )}

      <Form onSubmit={submit} className="space-y-4" validationErrors={errors}>
        <TextField
          label="Email address"
          name="email"
          type="email"
          autoComplete="off"
          value={data.email}
          autoFocus
          onChange={(v) => setData("email", v)}
          placeholder="email@example.com"
          errorMessage={errors.email}
        />

        <Button className="w-full" isPending={processing}>
          Email password reset link
        </Button>
        <div className="flex justify-center">
          <Link className="hover:text-primary" href={route("login")}>
            Log in
          </Link>
        </div>
      </Form>
    </>
  )
}

ForgotPassword.layout = (page: React.ReactNode) => (
  <AuthLayout
    title="Forgot password"
    description="Enter your email to receive a password reset link"
    children={page}
  />
)
