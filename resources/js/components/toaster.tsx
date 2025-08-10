import { usePage } from "@inertiajs/react"
import { useEffect } from "react"
import { toast } from "sonner"
import { Toast } from "@/components/ui"
import type { SharedData } from "@/types"

export function Toaster() {
  const { flash } = usePage<SharedData>().props
  useEffect(() => {
    if (flash?.message) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(toast as any)[flash.type](flash.message)
    }
  }, [flash])
  return <Toast />
}
