import { Head, useForm } from "@inertiajs/react"
import { IconLogin } from "@tabler/icons-react"
import type { FormEventHandler } from "react"
import { Form, Link, TextField } from "@/components/ui"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import AuthLayout from "@/layouts/auth-layout"

type LoginForm = {
  email: string
  password: string
  remember: boolean
}

interface LoginProps {
  status?: string
  canResetPassword: boolean
}

export default function Login({ status, canResetPassword }: LoginProps) {
  const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
    email: "",
    password: "",
    remember: false,
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route("login"), {
      onFinish: () => reset("password"),
    })
  }

  return (
    <>
      <Head title="Log in" />

      <Form className="flex flex-col gap-4" onSubmit={submit} validationErrors={errors}>
        <TextField
          label="Email address"
          name="email"
          type="email"
          isRequired
          autoFocus
          autoComplete="email"
          value={data.email}
          onChange={(v) => setData("email", v)}
          placeholder="email@example.com"
          errorMessage={errors.email}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          isRequired
          autoComplete="current-password"
          value={data.password}
          onChange={(v) => setData("password", v)}
          placeholder="Password"
          errorMessage={errors.password}
        />

        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            id="remember"
            name="remember"
            isSelected={data.remember}
            onChange={() => setData("remember", !data.remember)}
          />
          {canResetPassword && (
            <Link
              href={route("password.request")}
              className="font-medium text-muted-fg text-sm/4 hover:text-primary"
            >
              Forgot password?
            </Link>
          )}
        </div>

        <Button type="submit" className="mt-4 w-full" isPending={processing}>
          <IconLogin />
          Log in
        </Button>

        <div className="text-center text-muted-fg text-sm">
          Don't have an account?{" "}
          <Link className="hover:text-fg" href={route("register")}>
            Sign up
          </Link>
        </div>
      </Form>
      {status && (
        <div className="mb-4 text-center font-medium text-emerald-500 text-sm">{status}</div>
      )}
    </>
  )
}

Login.layout = (page: React.ReactNode) => (
  <AuthLayout
    title="Log in to your account"
    description="Enter your email and password below to log in"
    children={page}
  />
)
