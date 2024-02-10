import { createColumnHelper } from "@tanstack/vue-table";
import  IndeterminateCheckbox  from "@/IndeterminateCheckbox.vue";

const columnHelper = createColumnHelper<Person>();
export const mockColumns = [
  {
    id: "select",
    header: ({ table }: { table: any }) => {
      return (
        <IndeterminateCheckbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onClick={table.getToggleAllRowsSelectedHandler()}
        ></IndeterminateCheckbox>
      );
    },
    cell: ({ row }: { row: any }) => {
      return (
        <div className="px-1">
          <IndeterminateCheckbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          ></IndeterminateCheckbox>
        </div>
      );
    },
  },
  columnHelper.group({
    header: "Name",
    footer: (props) => props.column.id,
    columns: [
      columnHelper.accessor("firstName", {
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor((row) => row.lastName, {
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => "Last Name",
        footer: (props) => props.column.id,
      }),
    ],
  }),
  columnHelper.group({
    header: "Info",
    footer: (props) => props.column.id,
    columns: [
      columnHelper.accessor("email", {
        header: () => "Email",
        footer: (props) => props.column.id,
      }),

          columnHelper.accessor("gender", {
            header: () => "Gender",
            footer: (props) => props.column.id,
          }),
          columnHelper.accessor("date", {
            header: "Date",
            footer: (props) => props.column.id,
          }),
        ],
      }),
];
