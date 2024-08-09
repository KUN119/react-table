import {
  flexRender,
  useReactTable,
  getCoreRowModel
} from '@tanstack/react-table'
import styles from './Table.module.css'

export default function Table({
  data = [],
  columns = [],
  rowSelection,
  setRowSelection
}) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(), // 여기서 getCoreRowModel을 가져와 사용합니다.
    // for checkbox
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection
    },
    enableRowSelection: true
  })

  return (
    <div className={styles.table_container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={styles.tbody}>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} onClick={row.getToggleSelectedHandler()}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
