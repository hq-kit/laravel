import { Link } from '@inertiajs/react'
import type { PropsWithChildren } from 'react'
import Heading from '@/components/heading'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCurrentUrl } from '@/hooks/use-current-url'
import { cn, toUrl } from '@/lib/utils'
import type { NavItem } from '@/types'
import appearance from '@/wayfinder/routes/appearance'
import profile from '@/wayfinder/routes/profile'
import twoFactor from '@/wayfinder/routes/two-factor'
import userPassword from '@/wayfinder/routes/user-password'

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: profile.edit().url,
        icon: null,
    },
    {
        title: 'Password',
        href: userPassword.edit().url,
        icon: null,
    },
    {
        title: 'Two-Factor Auth',
        href: twoFactor.show().url,
        icon: null,
    },
    {
        title: 'Appearance',
        href: appearance.edit().url,
        icon: null,
    },
]

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl()

    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null
    }

    return (
        <>
            <Heading title='Settings' description='Manage your profile and account settings' />

            <div className='flex flex-col lg:flex-row lg:space-x-12'>
                <aside className='w-full max-w-xl lg:w-48'>
                    <nav className='flex flex-col space-x-0 space-y-1' aria-label='Settings'>
                        {sidebarNavItems.map((item, index) => (
                            <Link
                                key={`${toUrl(item.href)}-${index}`}
                                href={item.href}
                                className={buttonVariants({
                                    size: 'sm',
                                    variant: 'ghost',
                                    className: cn('w-full justify-start', {
                                        'bg-muted': isCurrentOrParentUrl(item.href),
                                    }),
                                })}
                            >
                                {item.icon && <item.icon className='size-4' />}
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </aside>

                <Separator className='my-6 lg:hidden' />

                <div className='flex-1 md:max-w-2xl'>
                    <section className='max-w-xl space-y-12'>{children}</section>
                </div>
            </div>
        </>
    )
}
