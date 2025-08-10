import { Head } from "@inertiajs/react"
import SidebarLayout from "@/layouts/app/sidebar-layout"
import DeleteAccount from "./delete-account"
import Password from "./password"
import Profile from "./profile"

export default function Settings({
  mustVerifyEmail,
  status,
}: {
  mustVerifyEmail: boolean
  status?: string
}) {
  return (
    <>
      <Head title="Settings" />
      <div className="space-y-10 p-6 md:p-8">
        <Profile mustVerifyEmail={mustVerifyEmail} status={status} />
        <Password />
        <DeleteAccount />
      </div>
    </>
  )
}

const breadcrumbs = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Profile Settings",
  },
]

Settings.layout = (page: React.ReactNode) => (
  <SidebarLayout breadcrumbs={breadcrumbs} children={page} />
)
