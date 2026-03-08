import {
    IconBook,
    IconBriefcase,
    IconChecklist,
    IconFolder,
    IconKey,
    IconLayoutGrid,
    IconUsers,
} from '@tabler/icons-react'
import { usePermission } from '@/hooks/use-permission'
import type { NavItem } from '@/types'
import { dashboard } from '@/wayfinder/routes'
import permissions from '@/wayfinder/routes/permissions'
import roles from '@/wayfinder/routes/roles'
import tasks from '@/wayfinder/routes/tasks'
import users from '@/wayfinder/routes/users'

export const navigationItems = () => {
    const { can, canAny } = usePermission()
    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard().url,
            icon: IconLayoutGrid,
            show: true,
        },
        {
            title: 'Users Management',
            href: users.index().url,
            icon: IconFolder,
            show: canAny(['user.view-any', 'role.view-any', 'permission.view-any']),
            items: [
                {
                    title: 'Users',
                    href: users.index().url,
                    icon: IconUsers,
                    show: can('user.view-any'),
                },
                {
                    title: 'Roles',
                    href: roles.index().url,
                    icon: IconBriefcase,
                    show: can('role.view-any'),
                },
                {
                    title: 'Permissions',
                    href: permissions.index().url,
                    icon: IconKey,
                    show: can('permission.view-any'),
                },
            ],
        },
        {
            title: 'Tasks',
            href: tasks.index().url,
            icon: IconChecklist,
            show: can('task.view-any'),
        },
    ]

    const secondaryNavItems: NavItem[] = [
        {
            title: 'Repository',
            href: 'https://github.com/laravel/react-starter-kit',
            icon: IconFolder,
            show: true,
        },
        {
            title: 'Documentation',
            href: 'https://laravel.com/docs/starter-kits#react',
            icon: IconBook,
            show: true,
        },
    ]

    return {
        mainNavItems,
        secondaryNavItems,
    }
}
