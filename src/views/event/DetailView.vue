<script setup lang="ts">
import { toRefs } from 'vue'
import type { Event } from '@/type'

const props = defineProps<{ event: Event; id: string }>()
const { event } = toRefs(props)
</script>

<template>
  <p>{{ event.title }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
</template>

<style scoped></style>
