import {
  ColumnOrderState,
  SortingState,
  flexRender, // flex box
  getCoreRowModel, // 取得row並做成row model來渲染新表格
  Sorting,
  getPaginationRowModel, // 用於分頁
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable, // 使用此 Hook 來控制表格
} from "@tanstack/react-table";
import { useState } from "react";
import "./Table.css";
import { defaultColumns, makeData } from "./Data"; // 匯入columns、data type、data等table資料
import { Link } from "react-router-dom";
import { faker } from "@faker-js/faker";
import Filter from "./Filter";

function Table() {
  const [data, setData] = useState(() => makeData(100)); // 儲存makeData()做出的假資料
  const [columns] = useState(() => [...defaultColumns]); // 儲存從defaultColumns匯入的columns資訊
  const [columnVisibility, setColumnVisibility] = useState({}); // state of columns show or not
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]); // state of columns order
  const [sorting, setSorting] = useState<SortingState>([]); // state of row sort
  const [rowSelection, setRowSelection] = useState({}); // state of selected row
  const rerender = () => setData(() => makeData(100));

  // 使用useReactTableD控制表格，參數至少要{data, columns}
  const table = useReactTable({
    data,
    columns,
    // 控制table的state
    state: {
      columnVisibility,
      columnOrder,
      sorting,
      rowSelection,
    },
    onColumnVisibilityChange: setColumnVisibility, // control columns show or not (filter)
    onColumnOrderChange: setColumnOrder, // control columns order
    onSortingChange: setSorting, // sort row
    onRowSelectionChange: setRowSelection, // row select
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18,    // or enable row selection conditionally per row
  });

  // 洗亂columns的順序
  const randomizeColumns = () => {
    table.setColumnOrder(
      faker.helpers.shuffle(table.getAllLeafColumns().map((d) => d.id))
    );
  };
  console.log(columnVisibility);
  console.log(columnOrder);
  console.log(Sorting);

  return (
    <div>
      <Link to="/v7">v7</Link>
      <div
        className="columnsVisible"
        style={{ border: "1px solid", width: "120px" }}
      >
        <div>
          <label>
            <input
              {...{
                style: { float: "left" },
                type: "checkbox",
                // 使所有columns的資料都可見or都不可見
                checked: table.getIsAllColumnsVisible(),
                onChange: table.getToggleAllColumnsVisibilityHandler(),
              }}
            />{" "}
            Toggle All
          </label>
          <hr />
        </div>
        {table.getAllLeafColumns().map((column) => {
          return (
            <div key={column.id}>
              <label>
                <input
                  {...{
                    style: { float: "left" },
                    type: "checkbox",
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />{" "}
                {column.id}
              </label>
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={() => rerender()}>New data</button>
        <button onClick={() => randomizeColumns()}>Shuffle Columns</button>
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div>
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "canSort"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} table={table} />
                        </div>
                      ) : null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      {/* page select */}
      <div className="page">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span>
          <div>Page
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </div>
        </span>
        <span>
          Go to page:
          <input
            type="number"
            min={1}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Table;
