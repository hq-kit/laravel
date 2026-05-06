import { createInertiaApp } from '@inertiajs/react'
import { Toaster } from '@/components/ui/sonner'
import { initializeTheme } from '@/hooks/use-appearance'
import AppLayout from '@/layouts/app-layout'
import AuthLayout from '@/layouts/auth-layout'
import SettingsLayout from '@/layouts/settings/layout'
import { Providers } from './components/providers'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
                return null
            case name.startsWith('auth/'):
                return AuthLayout
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout]
            default:
                return AppLayout
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <Providers>
                {app}
                <Toaster />
            </Providers>
        )
    },
    progress: {
        color: '#007a55',
    },
    defaults: {
        visitOptions: () => {
            return { viewTransition: true }
        },
    },
})

// This will set light / dark mode on load...
initializeTheme()
