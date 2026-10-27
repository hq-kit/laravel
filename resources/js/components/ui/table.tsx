import { IconChevronDown, IconChevronRight, IconGripVertical } from "@tabler/icons-react"
import { cn } from "cn"
import { type ComponentProps, createContext, type Ref, use } from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  Button,
  Cell,
  type CellProps,
  Collection,
  Column,
  type ColumnProps,
  type ColumnResizerProps,
  type TableHeaderProps as HeaderProps,
  ColumnResizer as RACColumnResizer,
  Table as RACTable,
  TableBody as RACTableBody,
  TableHeader as RACTableHeader,
  type TableProps as RACTableProps,
  ResizableTableContainer,
  Row,
  type RowProps,
  type Selection,
  type SortDescriptor,
  type SortDirection,
  type TableBodyProps,
  useTableOptions
} from "react-aria-components/Table"
import { Checkbox } from "./checkbox"
import { Link, type LinkProps } from "./link"

interface TableProps extends Omit<RACTableProps, "className"> {
  allowResize?: boolean
  className?: string
  ref?: Ref<HTMLTableElement>
}

const TableContext = createContext<TableProps>({
  allowResize: false
})

const Root = ({ className, ...props }: TableProps) => (
  <RACTable
    className={composeRenderProps(className, (className) => cn("w-full caption-bottom text-sm", className))}
    {...props}
  />
)

const Table = ({ allowResize, className, ref, ...props }: TableProps) => {
  return (
    <TableContext.Provider value={{ allowResize }}>
      <div
        className={cn(
          "relative w-full overflow-x-auto has-data-[slot=table-resizable-container]:overflow-auto",
          className
        )}
        data-slot="table-container"
      >
        {allowResize ? (
          <ResizableTableContainer data-slot="table-resizable-container">
            <Root ref={ref} {...props} />
          </ResizableTableContainer>
        ) : (
          <Root {...props} ref={ref} />
        )}
      </div>
    </TableContext.Provider>
  )
}

const ColumnResizer = ({ className, ...props }: ColumnResizerProps) => (
  <RACColumnResizer
    {...props}
    className={composeRenderProps(className, (className) =>
      cn(
        "data-resizing:border-l-primary absolute top-0 right-0 bottom-0 z-10 my-2 grid w-px touch-none place-content-center border-l px-1 data-[resizable-direction=both]:cursor-ew-resize [data-resizable-direction=left]:cursor-e-resize [data-resizable-direction=right]:cursor-w-resize",
        className
      )
    )}
  />
)

const TableBody = <T extends object>({ className, ...props }: TableBodyProps<T>) => (
  <RACTableBody
    className={composeRenderProps(className, (className) => cn("[&_tr:last-child]:border-0", className))}
    data-slot="table-body"
    {...props}
  />
)

const TableColumn = ({ isResizable = false, className, ...props }: ColumnProps & { isResizable?: boolean }) => {
  return (
    <Column
      data-slot="table-head"
      {...props}
      className={composeRenderProps(className, (className) =>
        cn(
          "text-foreground relative h-10 px-2 text-left align-middle font-medium whitespace-nowrap has-[[role=checkbox]]:pr-0",
          "outline-hidden data-dragging:cursor-grabbing data-[allows-sorting=true]:cursor-default",
          isResizable && "truncate overflow-hidden",
          className
        )
      )}
    >
      {(values) => (
        <div className={cn(["inline-flex items-center gap-2 **:[svg]:shrink-0"])}>
          {typeof props.children === "function" ? props.children(values) : props.children}
          {values.allowsSorting && (
            <span
              className={cn(
                "bg-secondary text-foreground grid size-[1.15rem] flex-none shrink-0 place-content-center rounded *:[svg]:size-3.5 *:[svg]:shrink-0 *:[svg]:transition-transform *:[svg]:duration-200",
                values.isHovered ? "bg-secondary-foreground/10" : ""
              )}
            >
              <IconChevronDown className={values.sortDirection === "ascending" ? "rotate-180" : ""} />
            </span>
          )}
          {isResizable && <ColumnResizer />}
        </div>
      )}
    </Column>
  )
}

interface TableHeaderProps<T extends object> extends HeaderProps<T> {
  ref?: Ref<HTMLTableSectionElement>
}

const TableHeader = <T extends object>({ children, ref, columns, className, ...props }: TableHeaderProps<T>) => {
  const { selectionBehavior, selectionMode, allowsDragging } = useTableOptions()
  return (
    <RACTableHeader
      className={composeRenderProps(className, (className) => cn("[&_tr]:border-b", className))}
      data-slot="table-header"
      ref={ref}
      {...props}
    >
      {allowsDragging && <TableColumn className="w-8" />}
      {selectionBehavior === "toggle" && selectionMode === "multiple" && (
        <TableColumn className="w-8">
          <Checkbox slot="selection" />
        </TableColumn>
      )}
      <Collection items={columns}>{children}</Collection>
    </RACTableHeader>
  )
}

interface TableRowProps<T extends object> extends RowProps<T> {
  ref?: Ref<HTMLTableRowElement>
}

const TableRow = <T extends object>({ children, className, columns, ref, ...props }: TableRowProps<T>) => {
  const { selectionBehavior, allowsDragging } = useTableOptions()
  return (
    <Row
      data-slot="table-row"
      ref={ref}
      {...props}
      className={composeRenderProps(className, (className) =>
        cn(
          "hover:bg-muted/50 data-[state=selected]:bg-muted group has-aria-expanded:bg-muted/50 relative cursor-default border-b outline outline-transparent transition-colors",
          "data-dragging:outline-primary data-disabled:opacity-50 data-dragging:cursor-grabbing",
          "data-drop-target:outline-primary",
          className
        )
      )}
      render={(domProps) =>
        "href" in props ? <Link {...(domProps as LinkProps)} /> : <tr {...(domProps as ComponentProps<"tr">)} />
      }
    >
      {allowsDragging && (
        <TableCell>
          <Button
            className="focus-visible:ring-ring flex items-center justify-center rounded-xs outline-hidden focus-visible:ring"
            slot="drag"
          >
            <IconGripVertical className="size-4" slot="selection" />
          </Button>
        </TableCell>
      )}
      {selectionBehavior === "toggle" && (
        <TableCell>
          <Checkbox slot="selection" />
        </TableCell>
      )}
      <Collection items={columns}>{children}</Collection>
    </Row>
  )
}

interface TableCellProps extends CellProps {
  ref?: Ref<HTMLTableCellElement>
}
const TableCell = ({ className, ref, ...props }: TableCellProps) => {
  const { allowResize } = use(TableContext)
  return (
    <Cell
      {...props}
      className={composeRenderProps(className, (className) =>
        cn(
          "p-2 align-middle whitespace-nowrap outline outline-transparent has-[[role=checkbox]]:pr-0",
          allowResize && "truncate overflow-hidden",
          className
        )
      )}
      data-slot="table-cell"
      ref={ref}
      style={({ hasChildItems, isTreeColumn, level }) => ({
        paddingInlineStart: isTreeColumn ? (hasChildItems ? 0 : 6) + (level - 1) * 22 : undefined
      })}
    >
      {(values) => {
        const children = typeof props.children === "function" ? props.children(values) : props.children
        return values.isTreeColumn && values.hasChildItems ? (
          <Button
            className="text-foreground hover:bg-secondary flex shrink-0 items-center gap-1 rounded px-2"
            slot="chevron"
          >
            <IconChevronRight className="size-3.5 transition-transform in-data-expanded:rotate-90" />
            {children}
          </Button>
        ) : (
          children
        )
      }}
    </Cell>
  )
}

const TableFooter = ({ className, ...props }: ComponentProps<"tfoot">) => (
  <tfoot
    className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
    data-slot="table-footer"
    {...props}
  />
)

const TableCaption = ({ className, ...props }: ComponentProps<"caption">) => (
  <caption className={cn("text-muted-foreground mt-4 text-sm", className)} data-slot="table-caption" {...props} />
)

Table.Header = TableHeader
Table.Body = TableBody
Table.Column = TableColumn
Table.Cell = TableCell
Table.Row = TableRow
Table.Footer = TableFooter
Table.Caption = TableCaption

export type { Selection, SortDescriptor, SortDirection }
export { Table, TableBody, TableCaption, TableCell, TableColumn, TableFooter, TableHeader, TableRow }
