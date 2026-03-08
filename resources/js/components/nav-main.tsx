import { IconChevronRight } from '@tabler/icons-react'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { useCurrentUrl } from '@/hooks/use-current-url'
import type { NavItem } from '@/types'

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { isCurrentOrParentUrl } = useCurrentUrl()

    return (
        <SidebarGroup className='px-2 py-0'>
            <SidebarGroupLabel>Navigations</SidebarGroupLabel>
            <SidebarMenu>
                {items
                    .filter((item) => item.show)
                    .map((item) =>
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
                                            {item.items
                                                ?.filter((subItem) => subItem.show)
                                                .map((subItem) => (
                                                    <SidebarMenuSubItem
                                                        key={subItem.href as string}
                                                    >
                                                        <SidebarMenuSubButton
                                                            href={subItem.href as string}
                                                            isActive={isCurrentOrParentUrl(
                                                                subItem.href,
                                                            )}
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
                                    isActive={isCurrentOrParentUrl(item.href)}
                                >
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ),
                    )}
            </SidebarMenu>
        </SidebarGroup>
    )
}
