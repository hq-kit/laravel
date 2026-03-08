import { IconChevronRight } from '@tabler/icons-react'
import { type ComponentPropsWithoutRef, useMemo } from 'react'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { useCurrentUrl } from '@/hooks/use-current-url'
import type { NavItem } from '@/types'

export function NavFooter({
    items,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {
    items: NavItem[]
}) {
    const { isCurrentUrl } = useCurrentUrl()

    const filteredItems = useMemo(() => {
        return items.filter((item) => item.show)
    }, [items])

    return (
        <SidebarGroup {...props} className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {filteredItems.map((item) =>
                        item.items ? (
                            <Collapsible key={item.href as string} defaultExpanded={true}>
                                <SidebarMenuItem>
                                    <SidebarMenuButton tooltip={item.title}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <IconChevronRight className='ml-auto transition-transform duration-200 group-data-expanded/collapsible:rotate-90' />
                                    </SidebarMenuButton>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => (
                                                <SidebarMenuSubItem key={subItem.href as string}>
                                                    <SidebarMenuSubButton
                                                        href={subItem.href as string}
                                                        isActive={isCurrentUrl(subItem.href)}
                                                    >
                                                        {subItem.icon && <subItem.icon />}
                                                        <span>{subItem.title}</span>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        ) : (
                            <SidebarMenuItem key={item.href as string}>
                                <SidebarMenuButton
                                    href={item.href as string}
                                    tooltip={item.title}
                                    isActive={isCurrentUrl(item.href)}
                                >
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ),
                    )}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
