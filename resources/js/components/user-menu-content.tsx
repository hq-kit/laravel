import { router } from '@inertiajs/react'
import { IconLogout, IconSettings } from '@tabler/icons-react'
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { UserInfo } from '@/components/user-info'
import { useMobileNavigation } from '@/hooks/use-mobile-navigation'
import type { User } from '@/types'
import { logout } from '@/wayfinder/routes'
import profile from '@/wayfinder/routes/profile'

type Props = {
    user: User
}

export function UserMenuContent({ user }: Props) {
    const cleanup = useMobileNavigation()

    const handleLogout = () => {
        cleanup()
        router.flushAll()
    }

    return (
        <>
            <DropdownMenuLabel className='p-0 font-normal'>
                <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem href={profile.edit().url}>
                    <IconSettings />
                    Settings
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                href={logout().url}
                routerOptions={{ method: logout().method }}
                onAction={handleLogout}
                data-test='logout-button'
            >
                <IconLogout />
                Log out
            </DropdownMenuItem>
        </>
    )
}
