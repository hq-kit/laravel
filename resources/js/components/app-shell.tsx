import { usePage } from '@inertiajs/react'
import type { ReactNode } from 'react'

import { NavbarProvider } from '@/components/ui/navbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import type { AppVariant } from '@/types'

type Props = {
    children: ReactNode
    layout?: AppVariant
}

export function AppShell({ children, layout = 'sidebar' }: Props) {
    const isOpen = usePage().props.sidebarOpen

    return layout === 'sidebar' ? (
        <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>
    ) : (
        <NavbarProvider className="flex min-h-screen w-full flex-col">
            {children}
        </NavbarProvider>
    )
}
