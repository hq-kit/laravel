export type User = {
    id: number
    name: string
    email: string
    avatar?: string
    email_verified_at: string | null
    two_factor_enabled?: boolean
    created_at: string
    updated_at: string
    roles?: Role[]
    permissions: Record<string, boolean>
    [key: string]: unknown
}

export interface Role {
    id: number
    name: string
    guard_name: string
    created_at: string
    updated_at: string
    permissions?: Permission[]
}

export interface Permission {
    id: number
    name: string
    guard_name: string
    created_at: string
    updated_at: string
    roles?: Role[]
}

export type Auth = {
    user: User
}

export type TwoFactorSetupData = {
    svg: string
    url: string
}

export type TwoFactorSecretKey = {
    secretKey: string
}
