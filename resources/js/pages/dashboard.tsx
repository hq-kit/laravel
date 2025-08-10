import { Head } from "@inertiajs/react"
import { Skeleton } from "@/components/ui"
import AppLayout from "@/layouts/app-layout"

export default function Dashboard() {
  return (
    <>
      <Head title="Dashboard" />

      <div className="flex h-[calc(100vh-4.1rem)] flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Skeleton className="absolute inset-0 size-full" />
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Skeleton className="absolute inset-0 size-full" />
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Skeleton className="absolute inset-0 size-full" />
          </div>
        </div>
        <div className="relative h-full flex-1 overflow-hidden rounded-xl">
          <Skeleton className="absolute inset-0 size-full" />
        </div>
      </div>
    </>
  )
}

Dashboard.layout = (page: any) => <AppLayout layout="sidebar" children={page} />
