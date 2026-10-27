import { InertiaLinkProps, Link } from '@inertiajs/react'
import { IconCheck, IconChevronRight } from '@tabler/icons-react'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'
import type { ComponentProps, ReactNode } from 'react'
import { composeRenderProps } from 'react-aria-components/composeRenderProps'
import {
    Header,
    Menu,
    MenuItem,
    type MenuItemProps,
    MenuSection,
    type MenuSectionProps,
    MenuTrigger,
    Popover,
    type Selection,
    SubmenuTrigger,
} from 'react-aria-components/Menu'
import { Separator } from 'react-aria-components/Separator'

const DropdownMenu = ({ ...props }: ComponentProps<typeof MenuTrigger>) => (
    <MenuTrigger data-slot="dropdown-menu-trigger" {...props} />
)

const DropdownMenuContent = ({
    'data-slot': dataSlot = 'dropdown-menu-content',
    placement = 'bottom start',
    offset = 4,
    crossOffset = 0,
    className,
    children,
    ...props
}: Omit<ComponentProps<typeof Menu<object>>, 'children' | 'className'> &
    Pick<
        ComponentProps<typeof Popover>,
        'placement' | 'offset' | 'crossOffset'
    > & {
        'data-slot'?: string
        className?: string
        children?: ReactNode
    }) => (
    <Popover
        className={cn(
            'z-50 w-(--trigger-width) min-w-32 origin-(--trigger-anchor-point) overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-95 data-exiting:animate-out data-exiting:overflow-hidden data-exiting:fade-out-0 data-exiting:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2',
            className,
        )}
        crossOffset={crossOffset}
        data-slot={dataSlot}
        offset={offset}
        placement={placement}
    >
        <Menu className="outline-hidden" {...props}>
            {children}
        </Menu>
    </Popover>
)

const DropdownMenuGroup = ({
    ...props
}: Omit<MenuSectionProps<object>, 'children'> & {
    children?: ReactNode
}) => <MenuSection data-slot="dropdown-menu-group" {...props} />

const DropdownMenuLabel = ({
    className,
    inset,
    ...props
}: ComponentProps<typeof Header> & {
    inset?: boolean
}) => (
    <Header
        className={cn(
            'px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7',
            className,
        )}
        data-inset={inset}
        data-slot="dropdown-menu-label"
        {...props}
    />
)

const dropdownMenuItemVariants = cva(
    'group/dropdown-menu-item relative flex cursor-default items-center whitespace-nowrap outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
    {
        variants: {
            selectionMode: {
                none: "gap-1.5 rounded-md px-1.5 py-1 text-sm focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
                single: "gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 [&_svg:not([class*='size-'])]:size-4",
                multiple:
                    "gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 [&_svg:not([class*='size-'])]:size-4",
            },
        },
    },
)

const DropdownMenuItem = ({
    className,
    inset,
    variant = 'default',
    children,
    ...props
}: Omit<MenuItemProps, 'href'> &
    Omit<InertiaLinkProps, keyof Omit<MenuItemProps, 'href'>> & {
        inset?: boolean
        variant?: 'default' | 'destructive'
    }) => (
    <MenuItem
        className={composeRenderProps(
            className,
            (className, { selectionMode }) =>
                cn(dropdownMenuItemVariants({ selectionMode }), className),
        )}
        data-inset={inset}
        data-slot="dropdown-menu-item"
        data-variant={variant}
        render={(domProps) =>
            'href' in props ? (
                <Link {...(domProps as InertiaLinkProps)} />
            ) : (
                <div {...(domProps as ComponentProps<'div'>)} />
            )
        }
        textValue={typeof children === 'string' ? children : props.textValue}
        {...(props as MenuItemProps)}
    >
        {(values) => (
            <>
                {values.selectionMode !== 'none' ? (
                    <span
                        className="pointer-events-none absolute right-2 flex items-center justify-center"
                        data-slot={
                            values.selectionMode === 'single'
                                ? 'dropdown-menu-radio-item-indicator'
                                : 'dropdown-menu-checkbox-item-indicator'
                        }
                    >
                        {values.isSelected ? <IconCheck /> : null}
                    </span>
                ) : null}
                {children}
            </>
        )}
    </MenuItem>
)

const DropdownMenuSub = ({
    ...props
}: ComponentProps<typeof SubmenuTrigger>) => (
    <SubmenuTrigger data-slot="dropdown-menu-sub" {...props} />
)

const DropdownMenuSubTrigger = ({
    className,
    inset,
    children,
    ...props
}: MenuItemProps & {
    inset?: boolean
}) => (
    <MenuItem
        className={cn(
            "flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className,
        )}
        data-inset={inset}
        data-slot="dropdown-menu-sub-trigger"
        textValue={typeof children === 'string' ? children : props.textValue}
        {...props}
    >
        {composeRenderProps(children, (children) => (
            <>
                {children}
                <IconChevronRight className="ml-auto" />
            </>
        ))}
    </MenuItem>
)

const DropdownMenuSubContent = ({
    placement = 'end top',
    crossOffset = -3,
    offset = 0,
    className,
    ...props
}: ComponentProps<typeof DropdownMenuContent>) => (
    <DropdownMenuContent
        className={cn(
            'w-auto min-w-24 rounded-lg bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100',
            className,
        )}
        crossOffset={crossOffset}
        data-slot="dropdown-menu-sub-content"
        offset={offset}
        placement={placement}
        {...props}
    />
)

const DropdownMenuSeparator = ({
    className,
    ...props
}: ComponentProps<typeof Separator>) => (
    <Separator
        className={cn('-mx-1 my-1 h-px bg-border', className)}
        data-slot="dropdown-menu-separator"
        {...props}
    />
)

const DropdownMenuShortcut = ({
    className,
    ...props
}: ComponentProps<'span'>) => (
    <span
        className={cn(
            'ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground',
            className,
        )}
        data-slot="dropdown-menu-shortcut"
        {...props}
    />
)

DropdownMenu.Group = DropdownMenuGroup
DropdownMenu.Item = DropdownMenuItem
DropdownMenu.Label = DropdownMenuLabel
DropdownMenu.Separator = DropdownMenuSeparator
DropdownMenu.Shortcut = DropdownMenuShortcut
DropdownMenu.Sub = DropdownMenuSub
DropdownMenu.SubContent = DropdownMenuSubContent
DropdownMenu.SubTrigger = DropdownMenuSubTrigger
DropdownMenu.Content = DropdownMenuContent

export type { Selection }
export {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
}
