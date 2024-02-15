<template>
  <div class="flex w-full justify-content-center">
    <input type="checkbox"
    :checked="props.row.original[props.property]"

    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
  property: {
    type: String,
    required: true,
  },
});

</script>

<style scoped>

</style>