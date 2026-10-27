import { ReactNode } from 'react'

import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout'

export default function AuthLayout({
    title = '',
    description = '',
    children,
}: {
    title?: string
    description?: string
    children: ReactNode
}) {
    return (
        <AuthLayoutTemplate title={title} description={description}>
            {children}
        </AuthLayoutTemplate>
    )
}
