import * as React from 'react'

import { NavbarInset } from '@/components/ui/navbar'
import { SidebarInset } from '@/components/ui/sidebar'
import type { AppVariant } from '@/types'

type Props = React.ComponentProps<'main'> & {
    layout?: AppVariant
}

export function AppContent({ layout = 'sidebar', children, ...props }: Props) {
    return layout === 'sidebar' ? (
        <SidebarInset {...props}>{children}</SidebarInset>
    ) : (
        <NavbarInset {...props}>{children}</NavbarInset>
    )
}
