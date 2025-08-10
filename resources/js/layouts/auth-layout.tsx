import { ThemeToggle } from "@/components/theme-toggle"
import AuthLayoutTemplate from "@/layouts/auth/card-layout"

export default function AuthLayout({
  children,
  title,
  description,
  ...props
}: {
  children: React.ReactNode
  title: string
  description: string
}) {
  return (
    <AuthLayoutTemplate title={title} description={description} {...props}>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      {children}
    </AuthLayoutTemplate>
  )
}
