import { usePage } from '@inertiajs/react'
import { IconChevronDown, IconSearch } from '@tabler/icons-react'
import { useState } from 'react'
import AppLogo from '@/components/app-logo'
import { Breadcrumbs } from '@/components/breadcrumbs'
import CommandPalette from '@/components/command-palette'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import {
    Navbar,
    NavbarBreadcrumbs,
    NavbarCompact,
    NavbarFlex,
    NavbarItem,
    NavbarLogo,
    NavbarNav,
    NavbarSection,
    NavbarTrigger,
} from '@/components/ui/navbar'
import { Separator } from '@/components/ui/separator'
import { UserMenuContent } from '@/components/user-menu-content'
import { useCurrentUrl } from '@/hooks/use-current-url'
import { navigationItems } from '@/layouts/navigations'
import { initials } from '@/lib/utils'
import type { BreadcrumbItem, NavItem } from '@/types'
import { dashboard } from '@/wayfinder/routes'

type Props = {
    breadcrumbs?: BreadcrumbItem[]
}

export function AppHeader({ breadcrumbs = [] }: Props) {
    const page = usePage()
    const { auth } = page.props
    const { mainNavItems, secondaryNavItems } = navigationItems()
    const [open, setOpen] = useState<boolean>(false)

    return (
        <Navbar isSticky>
            <CommandPalette open={open} setOpen={setOpen} />
            <NavbarNav>
                <NavbarLogo aria-label='Dashboard' href={dashboard().url}>
                    <AppLogo />
                </NavbarLogo>
                <NavbarSection>
                    <Navigation items={mainNavItems} />
                    <div className='mt-auto md:hidden'>
                        <Navigation items={secondaryNavItems} />
                    </div>
                </NavbarSection>

                <NavbarSection className='hidden md:ml-auto md:flex'>
                    <Navigation items={secondaryNavItems} />
                    <Button variant='ghost' size='icon' onPress={() => setOpen(!open)}>
                        <IconSearch />
                    </Button>
                    <DropdownMenu>
                        <Button variant='ghost' className='size-10 rounded-full p-1'>
                            <Avatar
                                className='size-8 overflow-hidden rounded-full'
                                src={auth.user.avatar}
                                alt={auth.user.name}
                                fallback={initials(auth.user.name)}
                            />
                        </Button>
                        <DropdownMenuContent className='w-56' placement='bottom end'>
                            <UserMenuContent user={auth.user} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </NavbarSection>
            </NavbarNav>
            <NavbarCompact>
                <NavbarFlex>
                    <NavbarTrigger className='-ml-2' />
                    <Separator className='h-6 sm:mx-1' orientation='vertical' />
                    <NavbarLogo aria-label='Dashboard' href={dashboard().url}>
                        <AppLogo />
                    </NavbarLogo>
                </NavbarFlex>
                <NavbarFlex>
                    <Button variant='ghost' size='icon' onPress={() => setOpen(!open)}>
                        <IconSearch />
                    </Button>
                    <DropdownMenu>
                        <Button variant='ghost' className='size-10 rounded-full p-1'>
                            <Avatar
                                className='size-8 overflow-hidden rounded-full'
                                src={auth.user.avatar}
                                alt={auth.user.name}
                                fallback={initials(auth.user.name)}
                            />
                        </Button>
                        <DropdownMenuContent className='w-56' placement='bottom end'>
                            <UserMenuContent user={auth.user} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </NavbarFlex>
            </NavbarCompact>
            {breadcrumbs?.length > 1 && (
                <NavbarBreadcrumbs>
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </NavbarBreadcrumbs>
            )}
        </Navbar>
    )
}

const Navigation = ({ items }: { items: NavItem[] }) => {
    const { isCurrentUrl } = useCurrentUrl()

    return items
        .filter((item) => item.show)
        .map((item) =>
            item.items ? (
                <DropdownMenu key={item.title}>
                    <NavbarItem isActive={isCurrentUrl(item.href)}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <IconChevronDown className='ml-auto in-aria-expanded:rotate-180 transition-transform' />
                    </NavbarItem>
                    <DropdownMenuContent placement='bottom start'>
                        {item.items
                            ?.filter((i) => i.show)
                            .map((subItem) => (
                                <DropdownMenuItem href={subItem.href as string} key={subItem.title}>
                                    {subItem.title}
                                </DropdownMenuItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <NavbarItem
                    href={item.href as string}
                    key={item.title}
                    isActive={isCurrentUrl(item.href)}
                >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                </NavbarItem>
            ),
        )
}
