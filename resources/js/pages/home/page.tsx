import { Head } from "@inertiajs/react"
import { Container, Header, Skeleton } from "@/components/ui"
import NavbarLayout from "@/layouts/app/navbar-layout"

export default function Home() {
  return (
    <>
      <Head title="Inertia Laravel Starter kit" />
      <Container className="py-12">
        <Header
          title="Laravel Starter Kit"
          description="A fully-featured Laravel starter kit built with HQ-Kit UI, offering a clean foundation for modern web apps."
        />
        <div className="mt-8 flex flex-1 flex-col gap-4 rounded-xl">
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
        </div>
      </Container>
    </>
  )
}

Home.layout = (page: any) => <NavbarLayout children={page} />
