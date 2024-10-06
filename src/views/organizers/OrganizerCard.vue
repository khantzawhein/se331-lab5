<template>
  <div
    class="cursor-pointer border border-gray-600 p-[20px] w-[250px] mb-[18px] hover:scale-[1.01] hover:shadow-sp"
  >
    <h2 class="text-xl">{{ organizer.name }}</h2>
    <img
      v-if="organizer.image"
      :src="organizer.image"
      alt="Organizer Image"
      class="w-[200px] h-[200px] object-cover"
    />
  </div>
</template>

<script setup lang="ts">
import type { Organizer } from '@/type'
defineProps<{ organizer: Organizer }>()
</script>
