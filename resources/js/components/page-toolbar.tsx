import { router } from "@inertiajs/react"
import { IconFilter } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import type { Selection } from "react-aria-components"

import { Button, Menu, SearchField, Select } from "@/components/ui"
import { useDebounce } from "@/lib/hooks"
import { cn } from "@/lib/utils"
import type { PageProps } from "@/types"

const PerPages = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
]

interface Props {
  className?: string
  attributes?: PageProps
  filters?: { id: string; label: string }[]
  perPages?: { value: number; label: string }[]
  url?: string
}

export function PageToolbar({ className, attributes, filters, perPages = PerPages, url }: Props) {
  const [query, setQuery] = useState<{
    search: string
    perPage: number
    sort: string
    dir: string
    filter: string[]
  }>({
    search: attributes?.search || "",
    perPage: attributes?.perPage || perPages[0].value,
    sort: attributes?.sort || "id",
    dir: attributes?.dir || "asc",
    filter: attributes?.filter ?? [],
  })

  const debouncedQuery = useDebounce(query, 200)

  useEffect(() => {
    const cleanedQuery = cleanQuery(debouncedQuery)
    if (url) {
      router.get(url, cleanedQuery, { preserveState: true })
    } else if ((route().current() as string).includes("index")) {
      router.get(route(route().current() as string), cleanedQuery, { preserveState: true })
    }
  }, [debouncedQuery, url])

  function onChange(key: string, value: string | number | string[] | undefined) {
    setQuery((prev) => ({ ...prev, [key]: value }))
  }

  const [filter, setFilter] = useState<Selection>(new Set(query.filter))

  useEffect(() => {
    // @ts-expect-error unknown-type
    onChange("filter", Array.from(filter))
  }, [filter])

  return (
    <div className={cn("mb-4 flex flex-row items-center justify-between gap-2", className)}>
      <Select
        placeholder="10"
        className="w-fit"
        aria-label="Per Page"
        items={perPages}
        selectedKey={query.perPage}
        onSelectionChange={(v) => onChange("perPage", v!)}
      >
        {(item) => (
          <Select.Item id={item.value} textValue={item.label}>
            {item.label}
          </Select.Item>
        )}
      </Select>
      <div className="flex gap-2">
        {filters && filters.length > 0 && (
          <Menu>
            <Button icon variant="outline">
              <IconFilter />
            </Button>
            <Menu.Content
              placement="bottom end"
              selectionMode="multiple"
              selectedKeys={filter}
              onSelectionChange={setFilter}
              items={filters}
            >
              {(item) => (
                <Menu.Item key={item.id} textValue={item.label}>
                  <Menu.Label>{item.label}</Menu.Label>
                </Menu.Item>
              )}
            </Menu.Content>
          </Menu>
        )}
        <SearchField
          aria-label="search"
          placeholder="Cari..."
          value={query.search}
          onChange={(v) => onChange("search", v)}
        />
      </div>
    </div>
  )
}

function cleanQuery<T extends object>(obj: T): Partial<T> {
  const cleaned: Partial<T> = {}

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== "" && !(Array.isArray(value) && value.every((v) => v === ""))) {
      cleaned[key as keyof T] = value
    }
  })

  return cleaned
}
