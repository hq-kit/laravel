// Credit: https://usehooks-ts.com/
import { useCallback, useState } from 'react'
import { toast } from 'sonner'

export type CopiedValue = string | null
export type CopyFn = (text: string) => Promise<boolean>
export type UseClipboardReturn = [CopiedValue, CopyFn]

export function useClipboard(): UseClipboardReturn {
    const [copiedText, setCopiedText] = useState<CopiedValue>(null)

    const copy: CopyFn = useCallback(async (text) => {
        if (!navigator?.clipboard) {
            toast.error('Clipboard not supported')

            return false
        }

        try {
            await navigator.clipboard.writeText(text)
            setCopiedText(text)
            toast.success('Copied to clipboard')

            return true
        } catch (error) {
            console.warn('Copy failed', error)
            toast.warning('Copy failed')
            setCopiedText(null)

            return false
        }
    }, [])

    return [copiedText, copy]
}
