import { usePage } from '@inertiajs/react'
import { IconSelector } from '@tabler/icons-react'

import { Button, LinkButton } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import { UserInfo } from '@/components/user-info'
import { UserMenuContent } from '@/components/user-menu-content'
import { login } from '@/routes'

export function NavUser({
    layout = 'sidebar',
}: {
    layout?: 'sidebar' | 'navbar'
}) {
    const { auth } = usePage().props

    if (!auth.user) {
        return (
            <LinkButton
                className="in-data-sidebar:w-full"
                variant="outline"
                href={login()}
            >
                Login
            </LinkButton>
        )
    }

    return layout === 'sidebar' ? (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <SidebarMenuButton
                        size="lg"
                        data-test="sidebar-menu-button"
                    >
                        <UserInfo user={auth.user} />
                        <IconSelector className="ml-auto" />
                    </SidebarMenuButton>
                    <DropdownMenuContent
                        className="w-(--trigger-width) min-w-56"
                        placement="bottom end"
                    >
                        <UserMenuContent user={auth.user} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    ) : (
        <DropdownMenu>
            <Button
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                variant="ghost"
            >
                <UserInfo showInfo={false} user={auth.user} />
            </Button>
            <DropdownMenu.Content className="min-w-56" placement="bottom end">
                <UserMenuContent user={auth.user} />
            </DropdownMenu.Content>
        </DropdownMenu>
    )
}
