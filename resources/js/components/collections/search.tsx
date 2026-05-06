import { SearchField, SearchInput } from '@/components/ui/search-field'
import { useDebounceCallback } from '@/hooks/use-debounce'

interface SearchProps {
    onChange: (search: string) => void
    value?: string
}
export const Search = ({ value, onChange }: SearchProps) => {
    const handleSearch = useDebounceCallback((value) => {
        if (value) {
            onChange(value)
        } else {
            onChange('')
        }
    }, 300)

    return (
        <SearchField
            defaultValue={value}
            onChange={handleSearch}
            aria-label='Search'
            name='search'
            onClear={() => handleSearch('')}
        >
            <SearchInput placeholder='Cari ...' />
        </SearchField>
    )
}
