import { router, usePage } from '@inertiajs/react'
import {
    IconHome,
    IconLayoutGrid,
    IconLogin,
    IconLogout,
    IconSettings,
    IconSun,
    IconUserPlus,
} from '@tabler/icons-react'
import { useEffect } from 'react'
import {
    CommandDialog,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command'
import { useCurrentUrl } from '@/hooks/use-current-url'
import { useMobileNavigation } from '@/hooks/use-mobile-navigation'
import { dashboard, login, logout, register } from '@/wayfinder/routes'
import appearance from '@/wayfinder/routes/appearance'
import profile from '@/wayfinder/routes/profile'

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}
export default function CommandPalette({ open, setOpen }: Props) {
    const currentUrl = useCurrentUrl()
    const { auth } = usePage().props
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen(!open)
            }
        }
        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    useEffect(() => {
        onOpenChange()
    }, [currentUrl])

    const onOpenChange = () => {
        setOpen(false)
    }

    const cleanup = useMobileNavigation()

    const handleLogout = () => {
        cleanup()
        router.flushAll()
    }
    return (
        <CommandDialog
            className='top-auto bottom-0 max-w-none translate-y-0 ring-4 ring-accent/50 sm:top-1/4 sm:max-w-xl sm:-translate-y-1/2'
            isOpen={open}
            onOpenChange={onOpenChange}
            showCloseButton={false}
        >
            <CommandInput className='m-1.5 rounded-lg bg-input' />
            <CommandList renderEmptyState={() => <CommandEmpty>No Item</CommandEmpty>}>
                <CommandItem href='/' textValue='homepage'>
                    <IconHome />
                    Homepage
                </CommandItem>
                <CommandSeparator />
                {auth.user ? (
                    <>
                        <CommandItem href={dashboard().url} textValue='dashboard'>
                            <IconLayoutGrid />
                            Dashboard
                        </CommandItem>
                        <CommandItem href={profile.edit().url} textValue='profile setting'>
                            <IconSettings />
                            Settings
                        </CommandItem>
                        <CommandItem
                            href={appearance.edit().url}
                            textValue='appearance/dark-mode/theme'
                        >
                            <IconSun />
                            Appearance
                        </CommandItem>
                        <CommandSeparator />
                        <CommandItem
                            href={logout().url}
                            routerOptions={{ method: logout().method }}
                            onAction={handleLogout}
                            textValue='logout'
                        >
                            <IconLogout />
                            Logout
                        </CommandItem>
                    </>
                ) : (
                    <>
                        <CommandItem href={login().url} textValue='login/sign-in'>
                            <IconLogin />
                            Login
                        </CommandItem>
                        <CommandItem href={register().url} textValue='register/sign-up'>
                            <IconUserPlus />
                            Register
                        </CommandItem>
                    </>
                )}
            </CommandList>
        </CommandDialog>
    )
}
