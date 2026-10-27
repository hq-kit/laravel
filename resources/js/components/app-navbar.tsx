import { Link } from '@inertiajs/react'
import { useEffect } from 'react'

import AppLogo from '@/components/app-logo'
import { NavMenu } from '@/components/nav-menu'
import { NavUser } from '@/components/nav-user'
import { Navbar, useNavbar } from '@/components/ui/navbar'
import { useCurrentUrl } from '@/hooks/use-current-url'
import { mainNavs, secondaryNavs } from '@/layouts/navigations'
import { dashboard } from '@/routes'

export function AppNavbar() {
    const { isMobile, open, setOpen } = useNavbar()
    const { currentUrl } = useCurrentUrl()
    useEffect(() => {
        if (isMobile && open) setOpen(false)
    }, [currentUrl])
    return (
        <Navbar sticky container variant="inset">
            <Navbar.Content>
                <Navbar.Header>
                    <Link
                        href={dashboard()}
                        prefetch
                        className="flex items-center space-x-2"
                    >
                        <AppLogo />
                    </Link>
                </Navbar.Header>
                <NavMenu layout="navbar" items={mainNavs} />
                {isMobile && (
                    <NavMenu
                        items={secondaryNavs}
                        layout="navbar"
                        className="mt-auto"
                    />
                )}
            </Navbar.Content>
            <Navbar.Actions>
                {!isMobile && <NavMenu items={secondaryNavs} layout="navbar" />}
                <NavUser layout="navbar" />
            </Navbar.Actions>
        </Navbar>
    )
}
