<template>
  <div
    class="flex align-items-center"
    :style="{ paddingLeft: `${(row.depth * 1.5+1)}rem`,}"
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
    <span v-if="row.original.nodeType==='satellite'">
      {{ row.original.name}} - {{ row.original.id}}
    </span>
    <span v-else>
      {{ row.original.name}}
    </span>




  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
});
  console.log("🚀:  row:", props.row.original)

</script>

<style scoped></style>
