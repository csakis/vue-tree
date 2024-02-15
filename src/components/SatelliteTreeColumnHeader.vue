<template>
  <div className="flex align-items-center">
    <input
      type="checkbox"
      :checked="table.getIsAllRowsSelected()"
      :indeterminate="table.getIsSomeRowsSelected()"
      @click="table.getToggleAllRowsSelectedHandler()($event)"
    />
    Satellite
  </div>
</template>

<script setup lang="ts">


defineProps({
  table: {
    type: Object,
    required: true,
  },
});

</script>

<style scoped></style>
