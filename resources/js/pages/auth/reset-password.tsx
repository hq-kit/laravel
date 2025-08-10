import { Head, useForm } from "@inertiajs/react"
import type { FormEventHandler } from "react"

import { Button, Form, TextField } from "@/components/ui"
import AuthLayout from "@/layouts/auth-layout"

interface ResetPasswordProps {
  token: string
  email: string
}

type ResetPasswordForm = {
  token: string
  email: string
  password: string
  password_confirmation: string
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
  const { data, setData, post, processing, errors, reset } = useForm<Required<ResetPasswordForm>>({
    token: token,
    email: email,
    password: "",
    password_confirmation: "",
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route("password.store"), {
      onFinish: () => reset("password", "password_confirmation"),
    })
  }

  return (
    <>
      <Head title="Reset password" />

      <Form onSubmit={submit} className="space-y-6" validationErrors={errors}>
        <TextField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          value={data.email}
          isReadOnly
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={data.password}
          autoFocus
          onChange={(v) => setData("password", v)}
          placeholder="Password"
          errorMessage={errors.password}
        />

        <TextField
          label="Confirm password"
          name="password_confirmation"
          type="password"
          value={data.password_confirmation}
          onChange={(v) => setData("password_confirmation", v)}
          placeholder="Confirm password"
          errorMessage={errors.password_confirmation}
        />

        <Button type="submit" className="mt-4 w-full" isPending={processing}>
          Reset password
        </Button>
      </Form>
    </>
  )
}

ResetPassword.layout = (page: React.ReactNode) => (
  <AuthLayout
    title="Reset password"
    description="Please enter your new password below"
    children={page}
  />
)
