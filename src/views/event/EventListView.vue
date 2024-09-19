<script setup lang="ts">
import EventCard from '@/components/EventCard.vue';
import CategoryCard from '@/components/CategoryCard.vue';
import type {Event} from '@/type';
import {computed, ref, watchEffect} from 'vue';
import EventService from '@/services/EventService';

const events = ref<Event[] | null>(null);

const props = defineProps<{ page: number, perPage: number }>()

const page = computed(() => props.page)
const perPage = computed(() => props.perPage)
const totalEvents = ref(0);
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / perPage.value);
  return page.value < totalPages;
})

watchEffect(() => {
  EventService.getEvents(perPage.value, page.value).then(({data, headers}: { data: Event[], headers: any }) => {
    events.value = data;
    console.log(headers);
    totalEvents.value = headers['x-total-count']
  }).catch((e) => {
    console.error(e);
  })
})

</script>

<template>
  <h1 class="text-center">Events for Good</h1>
  <div class="home">
    <div class="flex flex-col items-center">
      <div class="flex items-center" v-for="event in events" :key="event.id">
        <EventCard :event="event"></EventCard>
      </div>
      <div class="flex justify-end gap-2">
        <RouterLink :to="{name: 'event-list-view', query: {page: page - 1, per_page: perPage}}" rel="prev"
                    v-if="page != 1" id="page-prev" class="text-left">
          &#60; Prev Page
        </RouterLink>
        <RouterLink :to="{name: 'event-list-view', query: {page: page + 1, per_page: perPage}}" rel="next"
                    v-if="hasNextPage" class="text-right"
                    id="page-next">
          Next Page &#62;
        </RouterLink>
      </div>
    </div>
  </div>
</template>