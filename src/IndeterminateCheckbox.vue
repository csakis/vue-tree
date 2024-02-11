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
  <div class="flex align-items-center ">
    <input
    type="checkbox"
    ref="inputRef"
    class="cursor-pointer"
    :indeterminate="indeterminate"
    v-bind="$attrs"
    />
    <span class="ml-2">
      {{ index }}
    </span>
  </div>
</template>
