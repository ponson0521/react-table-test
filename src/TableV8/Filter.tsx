import { Table as t } from "@tanstack/react-table";
import { Person } from "./Data";

// 篩選(查詢)row的輸入框
function Filter({ table }: { table: t<any> }) {
  const columnId = table.getAllLeafColumns()[1] ?? null;
  const columnName = table.getAllLeafColumns()[2] ?? null;
  const columnAge = table.getAllLeafColumns()[3] ?? null;
  const columnStatus = table.getAllLeafColumns()[5] ?? null;

  // console.log(columnStatus.getFilterValue());

  return (
    <div>
      {columnId === null ? null : (
        <input
          className="filterinput"
          type="text"
          value={(columnId.getFilterValue() ?? "") as string}
          onChange={(e) => columnId.setFilterValue(e.target.value)}
          placeholder={`Search id`}
        />
      )}
      {columnName === null ? null : (
        <input
          className="filterinput"
          type="text"
          value={(columnName.getFilterValue() ?? "") as string}
          onChange={(e) => columnName.setFilterValue(e.target.value)}
          placeholder={`Search Name`}
        />
      )}
      {columnAge === null ? null : (
        <input
          className="filterinput"
          type="number"
          value={((columnAge.getFilterValue() as any)?.[0] ?? "") as string}
          min={0}
          onChange={(e) =>
            columnAge.setFilterValue((old: any) => [e.target.value, old?.[1]])
          }
          placeholder={`Search Min Age`}
        />
      )}
      {columnStatus === null ? null : (
        <select
          className="filterinput"
          value={columnStatus.getFilterValue() as Person["status"]}
          onChange={(e) => columnStatus.setFilterValue(e.target.value)}
        >
          <option value="">Search Status</option>
          <option value="colleague">colleague</option>
          <option value="unknown">unknown</option>
        </select>
      )}
    </div>
  );
}

export default Filter;
