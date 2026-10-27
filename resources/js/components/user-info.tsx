import { Avatar } from '@/components/ui/avatar'
import { initials } from '@/lib/utils'
import type { User } from '@/types'

export function UserInfo({
    user,
    showEmail = false,
    showInfo = true,
}: {
    user: User
    showEmail?: boolean
    showInfo?: boolean
}) {
    return (
        <>
            <Avatar className={'ring ring-ring'}>
                <Avatar.Image src={user.avatar} alt={user.name} />
                <Avatar.Fallback>{initials(user.name)}</Avatar.Fallback>
            </Avatar>
            {showInfo && (
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    {showEmail && (
                        <span className="truncate text-xs text-muted-foreground">
                            {user.email}
                        </span>
                    )}
                </div>
            )}
        </>
    )
}
