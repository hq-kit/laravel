import { usePage } from '@inertiajs/react'

export function usePermission() {
    const { auth } = usePage().props

    const can = (permission: string): boolean => {
        return auth?.user?.permissions?.[permission] ?? false
    }

    const canAny = (permissions: string[]): boolean => {
        return permissions.some(can)
    }

    const canAll = (permissions: string[]): boolean => {
        return permissions.every(can)
    }

    return { can, canAny, canAll }
}

export function groupPermissions(permissions: string[]) {
    return permissions.reduce<Record<string, string[]>>((acc, permission) => {
        const [model, action] = permission.split('.')

        if (!acc[model]) {
            acc[model] = []
        }

        acc[model].push(action)

        return acc
    }, {})
}
