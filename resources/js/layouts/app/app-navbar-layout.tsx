import { AppContent } from '@/components/app-content'
import { AppNavbar } from '@/components/app-navbar'
import { AppShell } from '@/components/app-shell'
import type { AppLayoutProps } from '@/types'

export default function AppNavbarLayout({ children }: AppLayoutProps) {
    return (
        <AppShell layout="navbar">
            <AppNavbar />
            <AppContent layout="navbar">{children}</AppContent>
        </AppShell>
    )
}
