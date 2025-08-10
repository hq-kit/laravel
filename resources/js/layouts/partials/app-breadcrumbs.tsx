import { Fragment } from "react"
import { Breadcrumbs as Breadcrumb } from "@/components/ui"
import type { NavItem } from "@/types"

export function Breadcrumbs({ breadcrumbs }: { breadcrumbs?: NavItem[] }) {
  return (
    breadcrumbs &&
    breadcrumbs.length > 0 && (
      <Breadcrumb>
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1
          return (
            <Fragment key={index}>
              {isLast ? (
                <Breadcrumb.Item>{item.title}</Breadcrumb.Item>
              ) : (
                <Breadcrumb.Item href={item.href}>{item.title}</Breadcrumb.Item>
              )}
            </Fragment>
          )
        })}
      </Breadcrumb>
    )
  )
}
