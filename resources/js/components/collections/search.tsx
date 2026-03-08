import { useEffect, useState } from 'react'
import { SearchField, SearchInput } from '@/components/ui/search-field'
import { useDebounce } from '@/hooks/use-debounce'

interface SearchProps {
    search: string
    onSearchChange: (search: string) => void
}
export const Search = ({ search, onSearchChange }: SearchProps) => {
    const [query, setQuery] = useState<string>(search ?? '')
    const debouncedSearch = useDebounce(query)
    useEffect(() => {
        onSearchChange(debouncedSearch)
    }, [debouncedSearch])

    return (
        <SearchField
            value={query}
            onChange={setQuery}
            aria-label='Search'
            name='search'
            onClear={() => setQuery('')}
        >
            <SearchInput placeholder='Search ...' />
        </SearchField>
    )
}
