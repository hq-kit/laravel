import { Head, useForm } from "@inertiajs/react"
import type { FormEventHandler } from "react"

import { Button, Form, TextField } from "@/components/ui"
import AuthLayout from "@/layouts/auth-layout"

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm<
    Required<{ password: string }>
  >({
    password: "",
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route("password.confirm"), {
      onFinish: () => reset("password"),
    })
  }

  return (
    <>
      <Head title="Confirm password" />

      <Form onSubmit={submit} className="space-y-4" validationErrors={errors}>
        <TextField
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
          autoFocus
          value={data.password}
          onChange={(v) => setData("password", v)}
          errorMessage={errors.password}
        />

        <Button className="w-full" isPending={processing}>
          Confirm password
        </Button>
      </Form>
    </>
  )
}

ConfirmPassword.layout = (page: React.ReactNode) => (
  <AuthLayout
    title="Confirm your password"
    description="This is a secure area of the application. Please confirm your password before continuing."
    children={page}
  />
)
