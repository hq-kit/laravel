import { Avatar } from '@/components/ui/avatar'
import { initials, strLimit } from '@/lib/utils'
import type { User } from '@/types'

export function UserInfo({ user, showEmail = false }: { user: User; showEmail?: boolean }) {
    return (
        <>
            <Avatar
                className='h-8 w-8 overflow-hidden rounded-full'
                src={user.avatar}
                alt={user.name}
                fallback={initials(user.name)}
            />
            <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>{strLimit(user.name)}</span>
                {showEmail && (
                    <span className='truncate text-muted-foreground text-xs'>
                        {strLimit(user.email)}
                    </span>
                )}
            </div>
        </>
    )
}
