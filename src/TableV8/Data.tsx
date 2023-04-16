import { createColumnHelper } from "@tanstack/react-table";
import { faker } from "@faker-js/faker";
import IndeterminateCheckbox from "./IndeterminateCheckbox";

// Data type
export type Person = {
  id: string;
  firstName: string;
  age: number;
  visits: number;
  status: "known" | "unknown";
  subRows?: Person[];
};

// 使用faker來生成假資料
const newPerson = (): Person => {
  return {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    age: faker.datatype.number({
      min: 18,
      max: 50,
    }),
    visits: faker.datatype.number(1000),
    status: faker.helpers.shuffle<Person["status"]>(["known", "unknown"])[0]!,
  };
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

// 製作table的假資料
export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

// Columns
const columnHelper = createColumnHelper<Person>();
export const defaultColumns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div>
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  }),
  // .group()，Grouping Column，no sort、filter
  columnHelper.group({
    id: "Identity",
    header: "Identity",
    footer: (props) => props.column.id,
    columns: [
      // .accessor()，Accessor Column，can sort、filter、group
      columnHelper.accessor("id", {
        cell: (prop) => prop.getValue(),
        footer: (prop) => prop.column.id,
      }),
      columnHelper.accessor((row) => row.firstName, {
        id: "firstName",
        cell: (prop) => prop.getValue(),
        header: () => <span>Name</span>,
        footer: (props) => props.column.id,
      }),
    ],
  }),
  columnHelper.group({
    header: "Info",
    footer: (props) => props.column.id,
    columns: [
      columnHelper.accessor("age", {
        header: () => "Age",
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor("visits", {
        header: () => <span>Visits</span>,
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor("status", {
        header: "Status",
        footer: (props) => props.column.id,
      }),
    ],
  }),
];

// export const defaultColumns: ColumnDef<Person>[] = [
//   {
//     header: "Name",
//     footer: (props) => props.column.id,
//     columns: [
//       {
//         accessorKey: "firstName",
//         cell: (info) => info.getValue(),
//         footer: (props) => props.column.id,
//       },
//       {
//         accessorFn: (row) => row.lastName,
//         id: "lastName",
//         cell: (info) => info.getValue(),
//         header: () => <span>Last Name</span>,
//         footer: (props) => props.column.id,
//       },
//     ],
//   },
//   {
//     header: "Info",
//     footer: (props) => props.column.id,
//     columns: [
//       {
//         accessorKey: "age",
//         header: () => "Age",
//         footer: (props) => props.column.id,
//       },
//       {
//         header: "More Info",
//         columns: [
//           {
//             accessorKey: "visits",
//             header: () => <span>Visits</span>,
//             footer: (props) => props.column.id,
//           },
//           {
//             accessorKey: "status",
//             header: "Status",
//             footer: (props) => props.column.id,
//           },
//           {
//             accessorKey: "progress",
//             header: "Profile Progress",
//             footer: (props) => props.column.id,
//           },
//         ],
//       },
//     ],
//   },
// ];
