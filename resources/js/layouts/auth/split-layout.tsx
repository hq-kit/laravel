import { Link } from "@inertiajs/react"
import type { PropsWithChildren } from "react"
import AppLogo from "@/components/app-logo"

interface AuthLayoutProps {
  title?: string
  description?: string
}

export default function AuthSplitLayout({
  children,
  title,
  description,
}: PropsWithChildren<AuthLayoutProps>) {
  return (
    <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground to-muted-foreground" />
        <Link
          href={route("home")}
          className="relative z-20 flex items-center font-medium text-background text-lg"
        >
          <AppLogo className="mr-2 size-8 fill-current" />
          {import.meta.env.VITE_APP_NAME}
        </Link>
      </div>
      <div className="w-full lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Link
            href={route("home")}
            className="relative z-20 flex items-center justify-center lg:hidden"
          >
            <AppLogo className="h-10 fill-current text-black sm:h-12" />
          </Link>
          <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
            <h1 className="font-medium text-xl">{title}</h1>
            <p className="text-balance text-muted-foreground text-sm">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
