import { useEffect } from 'react'
import AppLogo from '@/components/app-logo'
import { NavFooter } from '@/components/nav-footer'
import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar'
import { useCurrentUrl } from '@/hooks/use-current-url'
import { navigationItems } from '@/layouts/navigations'
import { dashboard } from '@/wayfinder/routes'

export function AppSidebar() {
    const { mainNavItems, secondaryNavItems } = navigationItems()

    const { setOpenMobile, isMobile } = useSidebar()
    const currentUrl = useCurrentUrl()

    useEffect(() => {
        if (isMobile) {
            setOpenMobile(false)
        }
    }, [currentUrl])

    return (
        <Sidebar collapsible='icon' variant='inset'>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton href={dashboard().url} size='lg'>
                            <AppLogo />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={secondaryNavItems} className='mt-auto' />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
