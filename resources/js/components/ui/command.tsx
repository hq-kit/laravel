import { cn, fuzzyMatch } from "@/lib/utils"

import { IconLoader, IconSearch } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import type {
  AutocompleteProps,
  ButtonProps,
  MenuProps,
  ModalOverlayProps,
} from "react-aria-components"
import { Autocomplete, Button, Group, Input, Menu, TextField } from "react-aria-components"
import { Keyboard } from "./keyboard"
import { MenuItem, MenuLabel, MenuSection, MenuSeparator } from "./menu"
import { ModalContent } from "./modal"

interface CommandProps<T>
  extends MenuProps<T>,
    Pick<AutocompleteProps, "inputValue" | "onInputChange"> {
  isPending?: boolean
}

const Command = <T extends object>({ ...props }: CommandProps<T>) => {
  return (
    <div data-command className={cn("rounded-lg border", props.className)}>
      <Autocomplete
        filter={fuzzyMatch}
        inputValue={props.inputValue}
        onInputChange={props.onInputChange}
      >
        <TextField autoFocus className="border-b p-1" aria-label="Search">
          <Group className="flex items-center px-2">
            {props.isPending ? (
              <IconLoader className="size-4 shrink-0 animate-spin text-muted-foreground" />
            ) : (
              <IconSearch className="size-4 shrink-0 text-muted-foreground" />
            )}
            <Input className="w-full p-2 outline-hidden" placeholder="Search..." />
          </Group>
        </TextField>
        <Menu
          renderEmptyState={() => (
            <div className="col-span-full p-4 text-center text-muted-foreground">
              No results found
            </div>
          )}
          className="grid w-full grid-cols-[auto_1fr_auto] gap-y-1 overflow-y-auto p-2 outline-hidden sm:max-h-[30rem]"
          {...props}
        />
      </Autocomplete>
    </div>
  )
}

interface CommandModalProps<T>
  extends CommandProps<T>,
    Pick<ModalOverlayProps, "isOpen" | "onOpenChange"> {
  shortcut?: {
    modifiers?: "alt" | "mod" | "mod+alt" | "mod+shift" | "mod+alt+shift" | "alt+shift"
    key: string
  }
}

const CommandModal = <T extends object>({ shortcut, ...props }: CommandModalProps<T>) => {
  const [shortcutOpen, setShortcutOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!shortcut) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === shortcut?.key &&
        (shortcut.modifiers === "alt"
          ? e.altKey
          : shortcut.modifiers === "mod+alt"
            ? e.altKey && (e.ctrlKey || e.metaKey)
            : shortcut.modifiers === "mod+shift"
              ? e.shiftKey && (e.ctrlKey || e.metaKey)
              : shortcut.modifiers === "mod+alt+shift"
                ? e.altKey && e.shiftKey && (e.ctrlKey || e.metaKey)
                : shortcut.modifiers === "alt+shift"
                  ? e.altKey && e.shiftKey
                  : e.ctrlKey || e.metaKey)
      ) {
        e.preventDefault()
        if (props.onOpenChange) {
          return props.onOpenChange(!props.isOpen)
        }
        setShortcutOpen(!shortcutOpen)
      } else if (e.key === "Escape") {
        e.preventDefault()
        if (props.onOpenChange) {
          return props.onOpenChange(false)
        }
        setShortcutOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  })

  return (
    <ModalContent
      isOpen={props.isOpen || shortcutOpen}
      onOpenChange={props.onOpenChange || setShortcutOpen}
      aria-label="Commands"
      className="h-[70dvh] **:data-command:border-0 sm:h-auto sm:min-h-0"
    >
      <Command {...props} />
    </ModalContent>
  )
}

const CommandTrigger = (props: ButtonProps) => <Button {...props} />

Command.Modal = CommandModal

Command.Trigger = CommandTrigger

Command.Item = MenuItem
Command.Label = MenuLabel
Command.Section = MenuSection
Command.Separator = MenuSeparator

Command.Shortcut = Keyboard

export { Command }
