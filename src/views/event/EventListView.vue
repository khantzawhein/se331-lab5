<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import CategoryCard from '@/components/CategoryCard.vue'
import type { Event } from '@/type'
import { computed, ref, watchEffect } from 'vue'
import EventService from '@/services/EventService'
import BaseInput from '@/components/BaseInput.vue'
import router from '@/router'

const events = ref<Event[] | null>(null)

const props = defineProps<{ page: number; perPage: number }>()

const page = computed(() => props.page)
const perPage = computed(() => props.perPage)
const totalEvents = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / perPage.value)
  return page.value < totalPages
})

const keyword = ref('')

watchEffect(() => {
  updateKeyword()
})

function updateKeyword() {
  let queryFunction
  if (keyword.value === '') {
    queryFunction = EventService.getEvents(3, page.value)
  } else {
    queryFunction = EventService.getEventsByKeyword(keyword.value, 3, page.value)
  }

  queryFunction
    .then(({ data, headers }: { data: Event[]; headers: any }) => {
      events.value = data
      totalEvents.value = headers['x-total-count']
    })
    .catch((e) => {
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <h1 class="text-center">Events for Good</h1>
  <div class="flex justify-center">
    <div class="w-64">
      <BaseInput
        @input="updateKeyword"
        v-model="keyword"
        label="Search..."
        class="w-full border rounded px-2 py-1"
      ></BaseInput>
    </div>
  </div>
  <div class="home">
    <div class="flex flex-col items-center">
      <div class="flex items-center" v-for="event in events" :key="event.id">
        <EventCard :event="event"></EventCard>
      </div>
      <div class="flex justify-end gap-2">
        <RouterLink
          :to="{ name: 'event-list-view', query: { page: page - 1, per_page: perPage } }"
          rel="prev"
          v-if="page != 1"
          id="page-prev"
          class="text-left"
        >
          &#60; Prev Page
        </RouterLink>
        <RouterLink
          :to="{ name: 'event-list-view', query: { page: page + 1, per_page: perPage } }"
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
