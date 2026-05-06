import { useCallback, useEffect, useRef, useState } from 'react'

export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debounced, setDebounced] = useState(value)
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(t)
    }, [value, delay])
    return debounced
}

export function useDebounceCallback<T extends (...args: any[]) => any>(callback: T, delay: number) {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    // Clear timeout on unmount to prevent memory leaks
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [])

    return useCallback(
        (...args: Parameters<T>) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }

            timeoutRef.current = setTimeout(() => {
                callback(...args)
            }, delay)
        },
        [callback, delay],
    )
}
