import { ButtonGroup } from '@/components/ui/button-group'
import { Select } from '@/components/ui/select'
import { useDebounceCallback } from '@/hooks/use-debounce'

interface Filter {
    id: string
    label: string
    options: {
        id: string
        label: string
    }[]
    defaultValue: string[]
}
interface FiltersProps {
    filters: Filter[]
    onFilterChange: (filters: Record<string, string>) => void
}
export const FiltersToolbar = ({ filters, onFilterChange }: FiltersProps) => {
    const handleQuery = useDebounceCallback((id, term) => {
        if (term) {
            onFilterChange?.({ [id]: term.join(',') })
        } else {
            onFilterChange?.({ [id]: '' })
        }
    }, 300)

    return (
        <ButtonGroup>
            {filters.map((filter) => (
                <Select
                    aria-label={filter.label}
                    key={filter.id}
                    defaultValue={filter.defaultValue}
                    placeholder={filter.label}
                    selectionMode={Array.isArray(filter.defaultValue) ? 'multiple' : 'single'}
                    onChange={(e) => handleQuery(filter.id, e)}
                >
                    <Select.Trigger>
                        <Select.Value />
                    </Select.Trigger>
                    <Select.Content items={filter.options}>
                        {(item) => <Select.Item textValue={item.label}>{item.label}</Select.Item>}
                    </Select.Content>
                </Select>
            ))}
        </ButtonGroup>
    )
}
