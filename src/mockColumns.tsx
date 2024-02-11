import { createColumnHelper } from "@tanstack/vue-table";
import IndeterminateCheckbox from "@/IndeterminateCheckbox.vue";

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
        <IndeterminateCheckbox
          index={row.index}
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
        ></IndeterminateCheckbox>
      );
    },
  },

  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastName", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: () => "Email",
  }),

  columnHelper.accessor("gender", {
    header: () => "Gender",
  }),
  columnHelper.accessor("date", {
    header: "Date",
  }),
];
