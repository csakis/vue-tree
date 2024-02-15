import { createColumnHelper } from "@tanstack/vue-table";
import IndeterminateCheckbox from "@/IndeterminateCheckbox.vue";
import SatelliteTreeColumnHeader from "./components/SatelliteTreeColumnHeader.vue";
import SatelliteTreeRowHeader from "./components/SatelliteTreeRowHeader.vue";

const columnHelper = createColumnHelper<Person>();
export const mockColumns = [
  {
    id: "Satellite",
    header: ({ table }) => h(SatelliteTreeColumnHeader, { table }),
    cell: ( {row} ) => h(SatelliteTreeRowHeader, { row }),
  },

  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastName", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("age", {
    header: () => "Age",
  }),

  columnHelper.accessor("status", {
    header: () => "Status",
  }),
  columnHelper.accessor("visits", {
    header: "Visits",
  }),
];
