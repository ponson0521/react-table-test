import {
  ColumnOrderState,
  SortingState,
  getSortedRowModel,
  flexRender, // flex box
  getCoreRowModel, // 取得row並做成row model來渲染新表格
  useReactTable, // 使用此 Hook 來控制表格
} from "@tanstack/react-table";
import React, { useState } from "react";
import "./Table.css";
import { defaultColumns, makeData } from "./Data"; // 匯入columns、data type、data
import { Link } from "react-router-dom";
import { faker } from "@faker-js/faker";

function Table() {
  const [data, setData] = useState(() => makeData(10));    // 儲存makeData()做出的假資料
  const [columns] = useState(() => [...defaultColumns]);    // 儲存從defaultColumns匯入的columns資訊
  const [columnVisibility, setColumnVisibility] = useState({});    // state of columns show or not 
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);    // state of columns order
  const [sorting, setSorting] = useState<SortingState>([]);    // state of row sort
  const rerender = () => setData(() => makeData(10));
  // 使用useReactTableD控制表格，參數至少要{data, columns}
  const table = useReactTable({
    data,
    columns,
    // 控制table的state
    state: {
      columnVisibility,    
      columnOrder,
      sorting,
    },
    onColumnVisibilityChange: setColumnVisibility,    // control columns show or not (filter)
    onColumnOrderChange: setColumnOrder,    // control columns order
    onSortingChange: setSorting,    // sort row
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),    
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  
  // 洗亂columns的順序
  const randomizeColumns = () => {
    table.setColumnOrder(
      faker.helpers.shuffle(table.getAllLeafColumns().map((d) => d.id))
    );
  };

  return (
    <div className="p-2">
      <Link to="/v7">v7</Link>
      <div style={{border:"1px solid", width:"120px"}}>
        <div>
          <label>
            <input
              {...{
                style: {float: "left"},
                type: "checkbox",
                // 使所有columns的資料都可見or都不可見
                checked: table.getIsAllColumnsVisible(),
                onChange: table.getToggleAllColumnsVisibilityHandler(),
              }}
            />{" "}
            Toggle All
          </label>
          <hr/>
        </div>
        {table.getAllLeafColumns().map((column) => {
          return (
            <div key={column.id} className="px-1">
              <label>
                <input
                  {...{
                    style: {float: "left"},
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
      <div className="h-4" />
      <div className="flex flex-wrap gap-2">
        <button onClick={() => rerender()} className="border p-1">
          Regenerate
        </button>
        <button onClick={() => randomizeColumns()} className="border p-1">
          Shuffle Columns
        </button>
      </div>
      <div className="h-4" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'canSort'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
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
    </div>
  );
}

export default Table;
