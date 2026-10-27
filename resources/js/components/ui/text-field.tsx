import { IconEye, IconEyeClosed } from '@tabler/icons-react'
import type { VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
import { ComponentProps, useState } from 'react'
import { composeRenderProps } from 'react-aria-components/composeRenderProps'
import {
    TextField as RACTextField,
    type TextFieldProps,
} from 'react-aria-components/TextField'

import { fieldVariants } from './field'
import {
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from './input'

const TextField = ({
    className,
    orientation = 'vertical',
    ...props
}: TextFieldProps & VariantProps<typeof fieldVariants>) => (
    <RACTextField
        className={composeRenderProps(className, (className) =>
            cn(fieldVariants({ orientation }), className),
        )}
        data-orientation={orientation}
        data-slot="field"
        {...props}
    />
)

const PasswordInput = ({
    className,
    ...props
}: Omit<ComponentProps<typeof Input>, 'type'>) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    return (
        <InputGroup className={cn(className)}>
            <InputGroupInput
                type={isVisible ? 'text' : 'password'}
                {...props}
            />
            <InputGroupAddon align="inline-end">
                <InputGroupButton
                    excludeFromTabOrder
                    onPress={() => setIsVisible(!isVisible)}
                >
                    <IconEye
                        className={cn(
                            'size-5 transition-transform sm:size-4',
                            isVisible ? 'scale-0' : 'scale-100',
                        )}
                    />
                    <IconEyeClosed
                        className={cn(
                            'absolute size-5 transition-transform sm:size-4',
                            isVisible ? 'scale-100' : 'scale-0',
                        )}
                    />
                </InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    )
}

export { PasswordInput, TextField }
