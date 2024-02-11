<script setup lang="ts">
import { ref, toRefs } from 'vue'

const props = defineProps<{
  index?: number;
  indeterminate?: boolean
  className?: string
}>()

const { indeterminate, className } = toRefs(props)

const inputRef = ref<any>(null)
</script>

<template>
  <div class="mx-2 w-full flex align-items-center justify-content-between">
    <input
    type="checkbox"
    ref="inputRef"
    class="cursor-pointer"
    :indeterminate="indeterminate"
    v-bind="$attrs"
    />
    <span>
      {{ index }}
    </span>
  </div>
</template>
