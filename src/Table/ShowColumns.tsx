import { Table } from "@tanstack/react-table";

function ShowColumns({ table }: { table: Table<any> }) {
  return (
    <div className="columnsVisible" style={{ border: "1px solid" }}>
      <div>
        <label>
          <input
            {...{
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
  );
}

export default ShowColumns;
