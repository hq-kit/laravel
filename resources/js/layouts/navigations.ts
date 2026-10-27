import { IconBook2, IconGitBranch, IconLayoutGrid } from '@tabler/icons-react'

import { dashboard } from '@/routes'
import type { Navigations } from '@/types'

export const mainNavs: Navigations[] = [
    {
        title: 'Main',
        items: [
            {
                title: 'Dashboard',
                href: dashboard(),
                icon: IconLayoutGrid,
            },
        ],
    },
]

export const secondaryNavs: Navigations[] = [
    {
        title: 'Refs',
        items: [
            {
                title: 'Repository',
                href: 'https://github.com/laravel/react-starter-kit',
                icon: IconGitBranch,
            },
            {
                title: 'Documentation',
                href: 'https://laravel.com/docs/starter-kits#react',
                icon: IconBook2,
            },
        ],
    },
]
