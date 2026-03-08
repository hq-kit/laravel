import type { TablerIcon } from '@tabler/icons-react'
import type { Selection } from 'react-aria-components'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'

interface Filter {
    id: string
    label: string
    icon?: TablerIcon | null
    options: {
        id: string
        label: string
    }[]
    defaultValue: string
}
interface FiltersProps {
    filters: Filter[]
    onFilterChange: (filters: Record<string, string>) => void
}
export const FiltersToolbar = ({ filters, onFilterChange }: FiltersProps) => {
    const handleFilterChange = (name: string, value: Selection) => {
        onFilterChange({ [name]: [...value].join(',') })
    }

    return (
        <ButtonGroup>
            {filters.map((filter) => (
                <DropdownMenu key={filter.id}>
                    <Button variant='outline'>
                        {filter.icon && <filter.icon />}
                        {filter.label}
                    </Button>
                    <DropdownMenuContent
                        items={filter.options}
                        selectedKeys={filter.defaultValue ? filter.defaultValue.split(',') : []}
                        selectionMode='multiple'
                        onSelectionChange={(value) => {
                            handleFilterChange(filter.id, value)
                        }}
                    >
                        {(item) => <DropdownMenuItem id={item.id}>{item.label}</DropdownMenuItem>}
                    </DropdownMenuContent>
                </DropdownMenu>
                // <Select
                //     name={filter.id}
                //     aria-label={filter.id}
                //     placeholder='Select...'
                //     key={filter.id}
                //     value={filter.defaultValue}
                //     onChange={(value) => handleFilterChange({ name: filter.id, value })}
                // >
                //     <Select.Trigger>
                //         <Select.Value />
                //     </Select.Trigger>
                //     <Select.Content>
                //         {filter.options.map((option) => (
                //             <Select.Item key={option.id} id={option.id}>
                //                 {option.label}
                //             </Select.Item>
                //         ))}
                //     </Select.Content>
                // </Select>
            ))}
        </ButtonGroup>
    )
}
