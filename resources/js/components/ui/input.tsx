'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
import type { ComponentProps, Ref } from 'react'
import { composeRenderProps } from 'react-aria-components/composeRenderProps'
import { Group, type GroupProps } from 'react-aria-components/Group'
import {
    type InputProps as RACInputProps,
    Input as RACInput,
} from 'react-aria-components/Input'
import { TextArea, type TextAreaProps } from 'react-aria-components/TextArea'

import { Button } from './button'
export interface InputProps extends RACInputProps {
    ref?: Ref<HTMLInputElement>
}
const Input = ({ className, ...props }: InputProps) => (
    <RACInput
        className={composeRenderProps(className, (className) =>
            cn(
                'h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-[color,box-shadow,border] outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
                className,
            ),
        )}
        data-slot="input"
        slot="control"
        {...props}
    />
)

const Textarea = ({ className, ...props }: TextAreaProps) => (
    <TextArea
        className={composeRenderProps(className, (className) =>
            cn(
                'flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
                '[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:cursor-pointer [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-foreground/50 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent',
                className,
            ),
        )}
        data-slot="textarea"
        slot="control"
        {...props}
    />
)

const inputGroupVariants = cva(
    'group/input-group relative flex h-8 w-full min-w-0 items-center rounded-lg border border-input transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:bg-input/50 has-disabled:opacity-50 has-data-focus-within:border-ring has-data-focus-within:ring-3 has-data-focus-within:ring-ring/50 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:bg-input/30 dark:has-disabled:bg-input/80 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5',
)

const InputGroup = ({ className, ...props }: GroupProps) => (
    <Group
        className={composeRenderProps(className, (className) =>
            cn(inputGroupVariants(), className),
        )}
        data-slot="input-group"
        role="group"
        slot="control"
        {...props}
    />
)

const inputGroupAddonVariants = cva(
    "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
    {
        variants: {
            align: {
                'inline-start':
                    'order-first pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]',
                'inline-end':
                    'order-last pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]',
                'block-start':
                    'order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2',
                'block-end':
                    'order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2',
            },
        },
        defaultVariants: {
            align: 'inline-start',
        },
    },
)

const InputGroupAddon = ({
    className,
    align = 'inline-start',
    ...props
}: ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>) => (
    <div
        className={cn(inputGroupAddonVariants({ align }), className)}
        data-align={align}
        data-slot="input-group-addon"
        onClick={(e) => {
            if ((e.target as HTMLElement).closest('button')) {
                return
            }
            e.currentTarget.parentElement?.querySelector('input')?.focus()
        }}
        onKeyDown={(e) => {
            if ((e.target as HTMLElement).closest('button')) {
                return
            }
            e.currentTarget.parentElement?.querySelector('input')?.focus()
        }}
        role="group"
        {...props}
    />
)

const inputGroupButtonVariants = cva(
    'flex items-center gap-2 text-sm shadow-none',
    {
        variants: {
            size: {
                xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
                sm: '',
                'icon-xs':
                    'size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0',
                'icon-sm': 'size-8 p-0 has-[>svg]:p-0',
            },
        },
        defaultVariants: {
            size: 'xs',
        },
    },
)

const InputGroupButton = ({
    className,
    type = 'button',
    variant = 'ghost',
    size = 'xs',
    ...props
}: Omit<ComponentProps<typeof Button>, 'size'> &
    VariantProps<typeof inputGroupButtonVariants>) => (
    <Button
        className={cn(inputGroupButtonVariants({ size }), className)}
        data-size={size}
        type={type}
        variant={variant}
        {...props}
    />
)

const InputGroupText = ({ className, ...props }: ComponentProps<'span'>) => (
    <span
        className={cn(
            "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
            className,
        )}
        {...props}
    />
)

const InputGroupInput = ({
    className,
    ...props
}: ComponentProps<typeof Input>) => (
    <Input
        className={cn(
            'flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent',
            className,
        )}
        data-slot="input-group-control"
        {...props}
    />
)

const InputGroupTextarea = ({ className, ...props }: TextAreaProps) => (
    <Textarea
        className={cn(
            'flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent',
            className,
        )}
        data-slot="input-group-control"
        {...props}
    />
)

InputGroup.Addon = InputGroupAddon
InputGroup.Button = InputGroupButton
InputGroup.Text = InputGroupText
InputGroup.Input = InputGroupInput
InputGroup.Textarea = InputGroupTextarea

export {
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
    inputGroupVariants,
    Textarea,
}
