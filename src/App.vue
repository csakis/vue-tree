<template>
  <div class="p-2">
    <table>
      <thead>
        <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :colSpan="header.colSpan"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in table.getRowModel().rows"
          :key="row.id"
        >
          <td
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
          >
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td className="p-1">
            <IndeterminateCheckbox
              :checked="table.getIsAllPageRowsSelected()"
              :indeterminate="table.getIsSomePageRowsSelected()"
              :onChange="table.getToggleAllPageRowsSelectedHandler()"
            />
          </td>
          <td :colSpan="20">Page Rows {{ table.getRowModel().rows.length }}</td>
        </tr>
      </tfoot>
    </table>
    <div class="h-4" />
    <button
      @click="selectAllRows"
      class="border p-2"
    >
      select all
    </button>
  </div>
</template>
<script setup lang="tsx">
import { FlexRender, getCoreRowModel, useVueTable, createColumnHelper, RowSelectionState } from "@tanstack/vue-table";
import { ref } from "vue";

import IndeterminateCheckbox from "./IndeterminateCheckbox.vue";
import { makeData, Person } from "./makeData";
import dataJSON from "@/assets/MOCK_DATA.json";
import { mockColumns as columns} from "./mockColumns";

const columnHelper = createColumnHelper<Person>();

const data = ref(dataJSON);
const rowSelection = ref<RowSelectionState>({});

const rerender = () => {
  data.value = makeData(10);
};

const table = useVueTable({
  get data() {
    return data.value;
  },
  columns,
  state: {
    get rowSelection() {
      return rowSelection.value;
    },
  },
  enableRowSelection: true, //enable row selection for all rows
  // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
  onRowSelectionChange: (updateOrValue) => {
    rowSelection.value = typeof updateOrValue === "function" ? updateOrValue(rowSelection.value) : updateOrValue;
  },
  getCoreRowModel: getCoreRowModel(),
});

function selectAllRows(e) {
  table.getToggleAllPageRowsSelectedHandler()(e);
}
</script>

<style>
html {
  font-family: sans-serif;
  font-size: 14px;
}

table {
  border: 1px solid lightgray;
}

tbody {
  border-bottom: 1px solid lightgray;
}

th {
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgray;
  padding: 2px 4px;
}

tfoot {
  color: gray;
}

tfoot th {
  font-weight: normal;
}
</style>
