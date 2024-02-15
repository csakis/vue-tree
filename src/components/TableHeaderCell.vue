<template>
  <div class="flex w-full justify-content-center">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
