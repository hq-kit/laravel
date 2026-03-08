import { router } from '@inertiajs/react'
import type { PropsWithChildren } from 'react'
import { RouterProvider } from 'react-aria-components'

export function Providers({ children }: PropsWithChildren) {
    return (
        <RouterProvider navigate={(to, options) => router.visit(to, options as any)}>
            {children}
        </RouterProvider>
    )
}
