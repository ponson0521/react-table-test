import {
  ColumnOrderState, // columns順序的type
  SortingState, // row排序的type
  getCoreRowModel, // 取得row並做成row model來渲染新表格
  getPaginationRowModel, // 用於分頁
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable, // 使用此 Hook 來控制表格
} from "@tanstack/react-table";
import { useState } from "react";
import { defaultColumns, makeData } from "./Data"; // 匯入columns、data type、data等table資料
import Table from "./Table";
import Page from "./Page";
import ShowColumns from "./ShowColumns"; // 顯示/隱藏columns的component
import ProSidebar from "../Sidebar/ProSidebar"; // sidebar
import Filter from "./Filter";
import "./Index.css";

function Index() {
  const [data, setData] = useState(() => makeData(100)); // 儲存makeData()做出的假資料
  const [columns] = useState(() => [...defaultColumns]); // 儲存從defaultColumns匯入的columns資訊
  const [columnVisibility, setColumnVisibility] = useState({}); // state of columns show or not，{"column name": false}
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]); // state of columns order
  const [sorting, setSorting] = useState<SortingState>([]); // state of row sort， {id: 'column name', desc: true or false}
  const [rowSelection, setRowSelection] = useState({}); // state of selected row， {id: true or false}

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
    onColumnVisibilityChange: setColumnVisibility, // control columns show or not onChange
    onColumnOrderChange: setColumnOrder, // control columns order onChange
    onSortingChange: setSorting, // sort row onChange
    onRowSelectionChange: setRowSelection, // row select onChange
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

  // console.log(columnVisibility);

  return (
    <div style={{ display: "flex" }}>
      <ProSidebar />
      <div style={{ display: "flex" }}>
        <div>
          <Filter table={table} />
          <Table table={table} />
          <div style={{ display: "flex" }}>
            <Page table={table} />
            <button onClick={() => rerender()}>New data</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
