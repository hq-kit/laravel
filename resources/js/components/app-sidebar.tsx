import { useEffect } from 'react'

import AppLogo from '@/components/app-logo'
import { NavMenu } from '@/components/nav-menu'
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
import { mainNavs, secondaryNavs } from '@/layouts/navigations'
import { dashboard } from '@/routes'

export function AppSidebar() {
    const { isMobile, setOpenMobile, openMobile } = useSidebar()
    const { currentUrl } = useCurrentUrl()
    useEffect(() => {
        if (isMobile && openMobile) setOpenMobile(false)
    }, [currentUrl])
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            prefetch
                            href={dashboard()}
                            size="lg"
                        >
                            <AppLogo />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMenu items={mainNavs} />
            </SidebarContent>

            <SidebarFooter>
                <NavMenu
                    items={secondaryNavs}
                    className="mt-auto px-0 group-data-[collapsible=icon]:p-0"
                />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
