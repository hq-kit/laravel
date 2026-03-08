import type { InertiaLinkProps } from '@inertiajs/react'
import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url
}

export function initials(fullName: string): string {
    const names = fullName.trim().split(' ')

    if (names.length === 0) return ''
    if (names.length === 1) return names[0].charAt(0).toUpperCase()

    const firstInitial = names[0].charAt(0)
    const lastInitial = names[names.length - 1].charAt(0)

    return `${firstInitial}${lastInitial}`.toUpperCase()
}

export const titleCase = (str: string): string =>
    str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

export const strLimit = (str: string, length: number = 30): string =>
    `${str.length > length ? `${str.slice(0, length)}...` : str}`
