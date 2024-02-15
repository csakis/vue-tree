import { createColumnHelper } from "@tanstack/vue-table";
import IndeterminateCheckbox from "@/IndeterminateCheckbox.vue";
import SatelliteTreeColumnHeader from "./components/SatelliteTreeColumnHeader.vue";
import SatelliteTreeRowHeader from "./components/SatelliteTreeRowHeader.vue";
import TreeCheckbox from "./components/TreeCheckbox.vue";
import TableHeaderCell from "./components/TableHeaderCell.vue";

const columnHelper = createColumnHelper<Person>();
export const mockColumns = [
  {
    id: "name",
    header: ({ table }) => h(SatelliteTreeColumnHeader, { table }),
    cell: ({ row }) => h(SatelliteTreeRowHeader, { row }),
  },

  {
    id: "fov",
    header: () => h(TableHeaderCell, { text: "F" }),
    cell: ({ row }) => h(TreeCheckbox, { row, property: "fov" }),
  },
  {
    id: "orb",
    header: () => h(TableHeaderCell, { text: "O" }),
    cell: ({ row }) => h(TreeCheckbox, { row, property: "orb" }),
  },
  {
    id: "gnd",
    header: () => h(TableHeaderCell, { text: "G" }),
    cell: ({ row }) => h(TreeCheckbox, { row, property: "gnd" }),
  },
  {
    id: "sky",
    header: () => h(TableHeaderCell, { text: "S" }),
    cell: ({ row }) => h(TreeCheckbox, { row, property: "sky" }),
  },
];
