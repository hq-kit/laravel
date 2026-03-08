import { IconAlertTriangle, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import type { Selection } from 'react-aria-components'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import type { BulkAction } from '@/types'

interface BulkToolbarProps {
    onClearSelection: () => void
    actions: BulkAction[]
    selectedIds: Selection
}
export function BulkToolbar({ onClearSelection, actions, selectedIds }: BulkToolbarProps) {
    const [pendingAction, setPendingAction] = useState<BulkAction | null>(null)

    const run = (action: BulkAction) => {
        if (action.confirm) {
            setPendingAction(action)
        } else {
            action.onAction(selectedIds)
            onClearSelection()
        }
    }

    const confirm = () => {
        if (!pendingAction) return
        pendingAction.onAction(selectedIds)
        setPendingAction(null)
        onClearSelection()
    }

    const isVisible = selectedIds === 'all' || [...selectedIds].length > 0
    const selectedCount = selectedIds === 'all' ? 'All' : [...selectedIds].length

    return (
        <>
            <div
                aria-hidden={!isVisible}
                className={cn(
                    'fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 translate-y-5 items-center gap-3 rounded-lg border border-border bg-background px-4 py-2.5 opacity-0 shadow-black/10 shadow-xl transition duration-300 ease-in-out',
                    isVisible && 'translate-y-0 opacity-100',
                )}
            >
                <div className='flex items-center gap-2 border-border border-r pr-3'>
                    <button
                        type='button'
                        onClick={onClearSelection}
                        className='rounded text-muted-foreground transition-colors hover:text-foreground'
                        title='Clear selection'
                    >
                        <IconX className='size-4' />
                    </button>
                    <span className='whitespace-nowrap font-medium text-sm'>
                        {selectedCount} selected
                    </span>
                </div>

                <div className='flex items-center gap-1.5'>
                    {actions.map((action) => (
                        // ✅ key pakai label, bukan index
                        <Button
                            key={action.label}
                            size='sm'
                            variant={action.isDestructive ? 'destructive' : 'default'}
                            onPress={() => run(action)}
                        >
                            {action.icon && <action.icon />}
                            {action.label}
                        </Button>
                    ))}
                </div>
            </div>

            <Dialog
                isOpen={!!pendingAction}
                onOpenChange={(open) => !open && setPendingAction(null)}
            >
                <DialogTrigger className='sr-only' />
                <DialogContent role='alertdialog'>
                    <DialogHeader>
                        <DialogTitle className='flex items-center gap-2'>
                            <IconAlertTriangle
                                className={cn(
                                    'size-5 shrink-0',
                                    pendingAction?.isDestructive
                                        ? 'text-destructive'
                                        : 'text-primary',
                                )}
                            />
                            {pendingAction?.confirm?.title ?? 'Are you sure?'}
                        </DialogTitle>
                        <DialogDescription>
                            {pendingAction?.confirm?.description ?? 'This action cannot be undone'}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button slot='close' variant='outline'>
                            Cancel
                        </Button>
                        <Button
                            onPress={confirm}
                            variant={pendingAction?.isDestructive ? 'destructive' : 'default'}
                        >
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
