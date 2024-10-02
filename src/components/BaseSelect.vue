<script setup lang="ts">
import type { Organizer } from '@/type'

const modelValue = defineModel()

interface BaseSelectProps {
  label: string
  options: Organizer[]
}

const props = withDefaults(defineProps<BaseSelectProps>(), {
  label: ''
})
</script>

<template>
  <label v-if="label">
    {{ props.label }}
  </label>
  <select class="mb-6" v-bind="$attrs" v-model="modelValue">
    <option v-for="option in props.options" :key="option.id" :value="option.id">
      {{ option.name }}
    </option>
  </select>
</template>
