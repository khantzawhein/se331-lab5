<script setup lang="ts">
import CategoryCard from '@/components/CategoryCard.vue'
import type { Event, Organizer } from '@/type'
import { computed, ref, watchEffect } from 'vue'
import EventService from '@/services/EventService'
import OrganizerCard from './OrganizerCard.vue'
import OrganizerService from '@/services/OrganizerService'

const organizers = ref<Organizer[] | null>(null)

const props = defineProps<{ page: number; perPage: number }>()

const page = computed(() => props.page)
const perPage = computed(() => props.perPage)
const total = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(total.value / perPage.value)
  return page.value < totalPages
})

watchEffect(() => {
  OrganizerService.getOrganizers(perPage.value, page.value)
    .then(({ data, headers }: { data: Organizer[]; headers: any }) => {
      organizers.value = data
      total.value = headers['x-total-count']
    })
    .catch((e) => {
      console.error(e)
    })
})
</script>

<template>
  <h1 class="text-center">Organizers</h1>
  <div class="home">
    <div class="flex flex-col items-center">
      <div class="flex items-center" v-for="organizer in organizers" :key="organizer.id">
        <OrganizerCard :organizer="organizer"></OrganizerCard>
      </div>
      <div class="flex justify-end gap-2">
        <RouterLink
          :to="{ name: 'organizer-list-view', query: { page: page - 1, per_page: perPage } }"
          rel="prev"
          v-if="page != 1"
          id="page-prev"
          class="text-left"
        >
          &#60; Prev Page
        </RouterLink>
        <RouterLink
          :to="{ name: 'organizer-list-view', query: { page: page + 1, per_page: perPage } }"
          rel="next"
          v-if="hasNextPage"
          class="text-right"
          id="page-next"
        >
          Next Page &#62;
        </RouterLink>
      </div>
    </div>
  </div>
</template>
