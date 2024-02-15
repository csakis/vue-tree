<template>
  <div
    class="flex align-items-center"
    :style="{ paddingLeft: `${(row.depth * 2+1)}rem`,}"
  >
    <input
    v-if="row.getCanExpand()"
      type="checkbox"
      :checked="row.getIsAllSubRowsSelected()"
      :indeterminate="row.getIsSomeSelected()"
      @change="row.getToggleSelectedHandler()($event)"
    />
    <input
    v-else
      type="checkbox"
      :checked="row.getIsSelected()"
      @change="row.toggleSelected()"
    />
    <span
      v-if="row.getCanExpand()"
      style="{ cursor: 'pointer' }"
      @click="row.getToggleExpandedHandler()($event)"
    >
      <i
        v-if="row.getIsExpanded()"
        class="pi pi-angle-down"
      />
      <i
        v-else
        class="pi pi-angle-right"
      />
    </span>

      {{ row.original.firstName}}  {{ row.original.lastName }}


  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
});

function handleClick(e) {
console.log("🚀:  e:", e.target.value)
console.log("indeterm", props.row.getIsSomeSelected())
console.log("row", props.row.getIsSelected())

  props.row.getToggleSelectedHandler()(e);
}

</script>

<style scoped></style>
