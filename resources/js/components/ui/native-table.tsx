import type { ComponentProps } from "react"
import { cn } from "cn"

interface TableProps extends ComponentProps<"table"> {
  containerClassName?: string
}

function Table({ className, containerClassName, ...props }: TableProps) {
  return (
    <div className={cn("relative w-auto overflow-x-auto", containerClassName)} data-slot="table-container">
      <table className={cn("w-full caption-bottom text-sm", className)} data-slot="table" {...props} />
    </div>
  )
}

function TableHeader({ className, ...props }: ComponentProps<"thead">) {
  return <thead className={cn("text-xs [&_tr]:border-b", className)} data-slot="table-header" {...props} />
}

function TableBody({ className, ...props }: ComponentProps<"tbody">) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} data-slot="table-body" {...props} />
}

function TableFooter({ className, ...props }: ComponentProps<"tfoot">) {
  return (
    <tfoot
      className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
      data-slot="table-footer"
      {...props}
    />
  )
}

function TableRow({ className, ...props }: ComponentProps<"tr">) {
  return (
    <tr
      className={cn("hover:bg-accent/10 border-b transition-colors has-[td]:divide-x", className)}
      data-slot="table-row"
      {...props}
    />
  )
}

function TableHead({ className, ...props }: ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "text-foreground sticky top-0 z-10 h-10 px-2 text-left align-middle font-medium whitespace-nowrap has-[[role=checkbox]]:pr-0",
        className
      )}
      data-slot="table-head"
      {...props}
    />
  )
}

function TableCell({ className, ...props }: ComponentProps<"td">) {
  return (
    <td
      className={cn("border-l p-2 align-middle text-xs whitespace-nowrap first:border-l-0", className)}
      data-slot="table-cell"
      {...props}
    />
  )
}

function TableCaption({ className, ...props }: ComponentProps<"caption">) {
  return (
    <caption className={cn("text-muted-foreground mt-4 text-sm", className)} data-slot="table-caption" {...props} />
  )
}

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow }

Table.Header = TableHeader
Table.Body = TableBody
Table.Head = TableHead
Table.Cell = TableCell
Table.Row = TableRow
Table.Footer = TableFooter
Table.Caption = TableCaption
