import {
  flexRender, // 其實就是 flex box
  getCoreRowModel, // 取得行的資料來渲染新表格
  useReactTable, // 使用此 Hook 來掌握表格
} from "@tanstack/react-table";
import React, { useState } from "react";
import "./Table.css";
import { columns } from "./columns";

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

function Table() {
  const [data, setData] = useState(() => [...defaultData]);
  const [formInput, setForm] = useState({
    firstName: "",
    lastName: "",
    age: 0,
    visits: 0,
    status: "",
    progress: 0,
  });
  const [rowSelection, setRowSelection] = useState({});
  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    state:{
        rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setData([...data, formInput]);
  };

  return (
    <div className="p-2">
      <form onSubmit={handleSubmit}>
        firstName
        <input
          type="text"
          value={formInput.firstName}
          onChange={(event) =>
            setForm({ ...formInput, firstName: event.target.value })
          }
        />
        lastName
        <input
          type="text"
          value={formInput.lastName}
          onChange={(event) =>
            setForm({ ...formInput, lastName: event.target.value })
          }
        />
        age
        <input
          type="number"
          value={formInput.age}
          onChange={(event) =>
            setForm({ ...formInput, age: parseInt(event.target.value, 10) })
          }
        />
        visits
        <input
          type="number"
          value={formInput.visits}
          onChange={(event) =>
            setForm({ ...formInput, visits: parseInt(event.target.value, 10) })
          }
        />
        status
        <input
          type="text"
          value={formInput.status}
          onChange={(event) =>
            setForm({ ...formInput, status: event.target.value })
          }
        />
        progress
        <input
          type="number"
          value={formInput.progress}
          onChange={(event) =>
            setForm({
              ...formInput,
              progress: parseInt(event.target.value, 10),
            })
          }
        />
        <br />
        <input type="submit" value="送出" />
      </form>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
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
                <th key={header.id}>
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
      <div className="h-4" />
      <button
        style={{ float: "left" }}
        onClick={() => rerender()}
        className="border p-2"
      >
        Rerender
      </button>
    </div>
  );
}

export default Table;
