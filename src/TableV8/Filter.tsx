import { Column as c, Table as t } from "@tanstack/react-table";
import { Person } from "./Data";

// 篩選(查詢)row的輸入框
function Filter({ table }: { table: t<any> }) {
  // const firstValue = table
  //   .getPreFilteredRowModel()
  //   .flatRows[0]?.getValue(column.id);
  const columnId = table.getHeaderGroups()[0].headers[1].subHeaders[0].column;
  const columnName = table.getHeaderGroups()[0].headers[1].subHeaders[1].column;
  const columnAge = table.getHeaderGroups()[0].headers[2].subHeaders[0].column;
  const columnStatus =
    table.getHeaderGroups()[0].headers[2].subHeaders[2].column;

  // console.log(columnStatus.getFilterValue());

  return (
    <div>
      <input
        type="text"
        value={(columnId.getFilterValue() ?? "") as string}
        onChange={(e) => columnId.setFilterValue(e.target.value)}
        placeholder={`Search id`}
      />
      <input
        type="text"
        value={(columnName.getFilterValue() ?? "") as string}
        onChange={(e) => columnName.setFilterValue(e.target.value)}
        placeholder={`Search Name`}
      />
      <input
        type="number"
        value={((columnAge.getFilterValue() as any)?.[0] ?? "") as string}
        min={0}
        onChange={(e) =>
          columnAge.setFilterValue((old: any) => [e.target.value, old?.[1]])
        }
        placeholder={`Search Min Age`}
      />
      <select
        value={columnStatus.getFilterValue() as Person["status"]}
        onChange={(e) => columnStatus.setFilterValue(e.target.value)}
      >
        <option value="">Search Status</option>
        <option value="known">known</option>
        <option value="unknown">unknown</option>
      </select>
    </div>
  );
}

export default Filter;
