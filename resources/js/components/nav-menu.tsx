import { IconChevronDown, IconChevronRight } from '@tabler/icons-react'
import { cn } from 'cn'

import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { Navbar } from '@/components/ui/navbar'
import {
    Sidebar,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { useCurrentUrl } from '@/hooks/use-current-url'
import { toUrl } from '@/lib/utils'
import { dashboard } from '@/routes'
import type { Navigations } from '@/types'

export function NavMenu({
    items,
    layout = 'sidebar',
    className,
}: {
    items: Navigations[]
    layout?: 'sidebar' | 'navbar'
    className?: string
}) {
    const { isCurrentOrParentUrl, isCurrentUrl } = useCurrentUrl()
    return layout === 'sidebar'
        ? items.map((nav, i) => (
              <Sidebar.Group key={i} className={cn('px-2 py-1', className)}>
                  <Sidebar.GroupLabel className="in-data-[state=collapsed]:hidden">
                      {nav.title}
                  </Sidebar.GroupLabel>
                  <Sidebar.Menu className="space-y-1">
                      {nav.items.map((item, i) =>
                          item.items ? (
                              <Collapsible key={i} defaultExpanded={true}>
                                  <SidebarMenuItem>
                                      <SidebarMenuButton
                                          slot="trigger"
                                          tooltip={item.title}
                                      >
                                          {item.icon && <item.icon />}
                                          <span>{item.title}</span>
                                          <IconChevronRight className="ml-auto transition-transform duration-200 group-data-expanded/collapsible:rotate-90" />
                                      </SidebarMenuButton>
                                      <CollapsibleContent>
                                          <SidebarMenuSub>
                                              {item.items.map((subItem, i) => (
                                                  <SidebarMenuSubItem key={i}>
                                                      <SidebarMenuSubButton
                                                          href={toUrl(
                                                              subItem.href,
                                                          )}
                                                          isActive={isCurrentUrl(
                                                              subItem.href,
                                                          )}
                                                      >
                                                          {subItem.icon && (
                                                              <subItem.icon />
                                                          )}
                                                          <span>
                                                              {subItem.title}
                                                          </span>
                                                      </SidebarMenuSubButton>
                                                  </SidebarMenuSubItem>
                                              ))}
                                          </SidebarMenuSub>
                                      </CollapsibleContent>
                                  </SidebarMenuItem>
                              </Collapsible>
                          ) : (
                              <SidebarMenuItem key={i}>
                                  <SidebarMenuButton
                                      href={toUrl(item.href)}
                                      tooltip={item.title}
                                      isActive={
                                          toUrl(item.href) ===
                                          toUrl(dashboard())
                                              ? isCurrentUrl(item.href)
                                              : isCurrentOrParentUrl(item.href)
                                      }
                                  >
                                      {item.icon && <item.icon />}
                                      <span>{item.title}</span>
                                  </SidebarMenuButton>
                              </SidebarMenuItem>
                          ),
                      )}
                  </Sidebar.Menu>
              </Sidebar.Group>
          ))
        : items.map((nav, i) => (
              <Navbar.Group className={cn(className)} key={i}>
                  <Navbar.GroupContent>
                      <Navbar.Menu>
                          {nav.items.map((item) =>
                              item?.items ? (
                                  <DropdownMenu key={item.title}>
                                      <Navbar.MenuItem>
                                          <Navbar.MenuButton
                                              isActive={item.isActive}
                                          >
                                              {item.icon && <item.icon />}
                                              <span>{item.title}</span>
                                              <IconChevronDown
                                                  className="ml-auto"
                                                  data-slot="chevron"
                                              />
                                          </Navbar.MenuButton>
                                          <DropdownMenu.Content>
                                              {item.items?.map((subItem) => (
                                                  <DropdownMenu.Item
                                                      href={subItem.href}
                                                      key={subItem.title}
                                                  >
                                                      {subItem.title}
                                                  </DropdownMenu.Item>
                                              ))}
                                          </DropdownMenu.Content>
                                      </Navbar.MenuItem>
                                  </DropdownMenu>
                              ) : (
                                  <Navbar.MenuItem key={item.title}>
                                      <Navbar.MenuButton
                                          href={item.href}
                                          isActive={
                                              toUrl(item.href) ===
                                              toUrl(dashboard())
                                                  ? isCurrentUrl(item.href)
                                                  : isCurrentOrParentUrl(
                                                        item.href,
                                                    )
                                          }
                                      >
                                          {item.icon && <item.icon />}
                                          <span>{item.title}</span>
                                      </Navbar.MenuButton>
                                  </Navbar.MenuItem>
                              ),
                          )}
                      </Navbar.Menu>
                  </Navbar.GroupContent>
              </Navbar.Group>
          ))
}
