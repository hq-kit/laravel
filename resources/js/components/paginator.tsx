import { Pagination } from "@/components/ui"
import { useIsMobile } from "@/lib/hooks"
import { cn } from "@/lib/utils"
import type { PaginationProps } from "@/types"

interface Props extends PaginationProps {
  className?: string
  only?: string[]
  showInfo?: boolean
}

export default function Paginator({ className, only, meta, links, showInfo = true }: Props) {
  const isMobile = useIsMobile()
  const routerOptions = { only: only, preserveScroll: true, preserveState: true }
  return (
    <div
      className={cn(
        "flex w-full justify-center",
        showInfo && "mt-6 flex-col-reverse items-center gap-3 pb-6 xl:flex-row xl:justify-between",
        className,
      )}
    >
      {showInfo && (
        <div>
          Menampilkan {meta.from} - {meta.to} dari {meta.total}
        </div>
      )}
      <div>
        <Pagination>
          <Pagination.Item
            routerOptions={routerOptions}
            slot="first"
            isDisabled={meta.current_page === 1}
            href={links.first ?? "#"}
          />
          <Pagination.Item
            routerOptions={routerOptions}
            slot="previous"
            isDisabled={meta.current_page === 1}
            href={links.prev ?? "#"}
          />
          {isMobile ? (
            <Pagination.Label current={meta.current_page} total={meta.last_page} />
          ) : (
            meta.links.map(
              (link) =>
                link.label.length < 4 && (
                  <Pagination.Item
                    routerOptions={routerOptions}
                    key={link.label}
                    isCurrent={link.active}
                    isDisabled={link.url === null || link.active}
                    href={link.url ?? "#"}
                  >
                    {link.label}
                  </Pagination.Item>
                ),
            )
          )}
          <Pagination.Item
            routerOptions={routerOptions}
            slot="next"
            isDisabled={meta.current_page === meta.last_page}
            href={links.next ?? "#"}
          />
          <Pagination.Item
            routerOptions={routerOptions}
            slot="last"
            isDisabled={meta.current_page === meta.last_page}
            href={links.last ?? "#"}
          />
        </Pagination>
      </div>
    </div>
  )
}
