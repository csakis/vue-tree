<template>
  <div
    class="p-5 relative overflow-x-hidden"
    style="height: 500px; width: 900px;"

    ref="tableContainer"
  >
    <table style="display: grid">
      <thead
      style="display: grid; position: 'sticky'; top: 0; zindex: 1"
      >
        <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
          style="display: flex; width: 100%"
        >
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :colSpan="header.colSpan"
            :style="getHeaderSize(header)"

          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </th>
        </tr>
      </thead>
      <tbody
      :style="{
          display: 'grid',
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: 'relative',
        }"
      >
        <tr
        v-for="(virtualRow, index) in rowVirtualizer.getVirtualItems()"
          :key="rows[virtualRow.index].id"
          :data-index="virtualRow.index"

          :style="{
            display: 'flex',
            position: 'absolute',
            transform: `translateY(${virtualRow.start}px)`,
            width: '100%',
          }"
        >
          <td
            v-for="cell in rows[virtualRow.index].getVisibleCells()"
            :key="cell.id"
            :style="{
              display: 'flex',
              width: `${cell.column.getSize()}px`,
            }"

          >
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </td>
        </tr>
      </tbody>

    </table>
    <button
      @click="selectAllRows"
      class="border p-2"
    >
      select all
    </button>
  </div>
</template>
<script setup lang="tsx">
import { FlexRender, getCoreRowModel, useVueTable, type RowSelectionState } from "@tanstack/vue-table";
import { measureElement, useVirtualizer } from "@tanstack/vue-virtual";
import { ref } from "vue";

import IndeterminateCheckbox from "./IndeterminateCheckbox.vue";
import { makeData, Person } from "./makeData";
import dataJSON from "@/assets/MOCK_DATA.json";
import { mockColumns as columns} from "./mockColumns";

const tableContainer = ref(null);

const data = ref(dataJSON);
const rowSelection = ref<RowSelectionState>({});

function getHeaderSize(header) {
  return `display: flex; width: ${header.getSize()}px;`;
}

const rowVirtualizer = useVirtualizer({
  count: data.value.length,
  estimateSize: () => 25,
  getScrollElement: () => tableContainer.value,
  measureElement:
  typeof window !== "undefined" && navigator.userAgent.indexOf("Firefox") === -1
  ? (element) => element.getBoundingClientRect().height
  : undefined,
  overscan: 5,
});

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
  debugTable: true,
});

const { rows } = table.getRowModel();

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
