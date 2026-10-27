import type { InertiaLinkProps } from '@inertiajs/react'

export function initials(fullName: string): string {
    const names = fullName.trim().split(/\s+/u).filter(Boolean)

    if (names.length === 0) {
        return ''
    }

    if (names.length === 1) {
        return Array.from(names[0])[0].toUpperCase()
    }

    const firstInitial = Array.from(names[0])[0]
    const lastInitial = Array.from(names[names.length - 1])[0]

    return `${firstInitial}${lastInitial}`.toUpperCase()
}
export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url
}
