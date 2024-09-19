<script setup lang="ts">
import EventService from '@/services/EventService'
import { useMessageStore } from '@/stores/message'
import type { Event } from '@/type'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const event = ref<Event>({
  id: 0,
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  petsAllowed: false,
  organizer: ''
})

const router = useRouter()
const store = useMessageStore()
function saveEvent() {
  EventService.saveEvent(event.value)
    .then((response) => {
      router.push({ name: 'event-detail-view', params: { id: response.data.id } })
      store.updateMessage(`You have successfully created an event for ${response.data.title}`)
    })
    .catch((e) => {
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <div>
    <h1 class="text-center">Create an event</h1>
    <form @submit.prevent="saveEvent">
      <div class="mb-2">
        <label>Category</label>
        <input
          type="text"
          v-model="event.category"
          placeholder="Category"
          class="ml-2 border rounded px-2 py-1 field"
        />
      </div>
      <h3>Name & Describe your event</h3>
      <div class="mb-2">
        <label>Title</label>
        <input
          type="text"
          v-model="event.title"
          placeholder="Title"
          class="ml-2 border rounded px-2 py-1 field"
        />
      </div>

      <div class="mb-2">
        <label>Description</label>
        <input
          type="text"
          v-model="event.description"
          placeholder="Description"
          class="ml-2 border rounded px-2 py-1 field"
        />
      </div>

      <div class="mb-2">
        <h3>Where is your event?</h3>
        <label>Location</label>
        <input
          type="text"
          v-model="event.location"
          placeholder="Location"
          class="ml-2 border rounded px-2 py-1 field"
        />
      </div>

      <button type="submit" class="button bg-blue-500 rounded px-3 py-2 text-white">Submit</button>
    </form>

    <pre class="mt-4">{{ event }}</pre>
  </div>
</template>
