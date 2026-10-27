import { router } from '@inertiajs/react'
import { IconLogout, IconSettings } from '@tabler/icons-react'

import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { UserInfo } from '@/components/user-info'
import { useMobileNavigation } from '@/hooks/use-mobile-navigation'
import { logout } from '@/routes'
import { edit } from '@/routes/profile'
import type { User } from '@/types'

type Props = {
    user: User
}

export function UserMenuContent({ user }: Props) {
    const cleanup = useMobileNavigation()

    const handleLogout = () => {
        router.post(logout())
        cleanup()
        router.flushAll()
    }

    return (
        <>
            <DropdownMenu.Label className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Group>
                <DropdownMenu.Item href={edit()} prefetch onAction={cleanup}>
                    <IconSettings className="mr-2" />
                    Settings
                </DropdownMenu.Item>
            </DropdownMenu.Group>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
                onAction={handleLogout}
                data-test="logout-button"
            >
                <IconLogout />
                Log out
            </DropdownMenu.Item>
        </>
    )
}
