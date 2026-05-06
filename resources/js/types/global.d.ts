import type { VisitOptions } from '@inertiajs/core'
import type { Auth } from '@/types/auth'

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string
            auth: Auth
            toast: {
                type: 'success' | 'error' | 'warning' | 'pending' | 'promise' | 'info'
                message: string
                data?: any
            }
            sidebarOpen: boolean
            [key: string]: unknown
        }
    }
}

declare module 'react-aria-components' {
    interface RouterConfig {
        routerOptions: VisitOptions
    }
}
