<template>
  <div
    class="p-5 relative overflow-x-hidden"
    style="height: 500px; width: 1000px"
    ref="tableContainer"
  >
  <div :style="{height: `${totalSize}px`}">

    <table style="display: grid">
      <thead style="display: grid; top: 0; zindex: 1">
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
          v-for="virtualRow in rowVirtualizer.getVirtualItems()"
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
            :style="getHeaderSize(cell.column)"
          >
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
<div class="m-5">

  <button
  @click="selectAllRows"
  class="border p-2"
  >
  select all
</button>
</div>
</template>
<script setup lang="tsx">
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  type RowSelectionState,
  type ExpandedState,
  getExpandedRowModel,
} from "@tanstack/vue-table";
import { measureElement, useVirtualizer } from "@tanstack/vue-virtual";
import { ref } from "vue";

import dataJSON from "@/assets/expand.json";
import { mockColumns as columns } from "./mockColumns";

const tableContainer = ref();

const data = ref(dataJSON);
const rowSelection = ref<RowSelectionState>({});
const expanded = ref<ExpandedState>({});


function getHeaderSize(header) {
  let size = "150px";
  switch (header.id) {
    case "select":
      size = "100px";
      break;
    case "firstName":
    case "lastName":
      size = "150px";
      break;
    case "email":
      size = "300px";
      break;
    case "gender":
    case "date":
      size = "100px";
      break;

    default:
      break;
  }

  return `display: flex; width: ${size};`;
}



const table = useVueTable({
  get data() {
    return data.value;
  },
  columns,
  state: {
    get rowSelection() {
      return rowSelection.value
    },
    get expanded() {
      return expanded.value;
    },
  },
  enableExpanding: true,
  enableRowSelection: true, //enable row selection for all rows
  onExpandedChange: (updateOrValue) => {
    expanded.value = typeof updateOrValue === "function" ? updateOrValue(expanded.value) : updateOrValue;
  },

  getSubRows: (row) => {
    return row.subRows;
  },
  // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
  onRowSelectionChange: (updateOrValue) => {
    rowSelection.value = typeof updateOrValue === "function" ? updateOrValue(rowSelection.value) : updateOrValue;
  },
  getCoreRowModel: getCoreRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  debugTable: true,
});

const rows = computed(()=>table.getRowModel().rows);
const rowVirtualizerOptions = computed(() => {
  return {
    count: rows.value.length,
    getScrollElement: () => tableContainer.value,
    measureElement:
    typeof window !== "undefined" && navigator.userAgent.indexOf("Firefox") === -1
      ? (element) => element.getBoundingClientRect().height
      : undefined,
    estimateSize: () => 30,
    overscan: 5,
  }
})

const rowVirtualizer = useVirtualizer(rowVirtualizerOptions);

const totalSize = computed(() => rowVirtualizer.value.getTotalSize())

watchEffect(() => {
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
