import { usePage } from '@inertiajs/react'
import { useEffect } from 'react'
import { toast as flash } from 'sonner'
import { Toaster } from '@/components/ui/sonner'

export function Toast() {
    const { toast } = usePage().props

    useEffect(() => {
        if (toast?.message) {
            ;(flash as any)[toast.type](toast.message)
        }
    }, [toast])
    return <Toaster richColors position='top-right' />
}
