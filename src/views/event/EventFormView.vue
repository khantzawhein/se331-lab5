<script setup lang="ts">
import EventService from '@/services/EventService'
import { useMessageStore } from '@/stores/message'
import { type Organizer, type Event } from '@/type'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '@/components/BaseInput.vue'
import OrganizerService from '@/services/OrganizerService'
import BaseSelect from '@/components/BaseSelect.vue'
import ImageUpload from '@/components/ImageUpload.vue'

const event = ref<Event>({
  id: 0,
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  petsAllowed: false,
  organizer: { id: 0, name: '' },
  images: []
})

const organizer = ref<Organizer[]>([])
onMounted(() => {
  OrganizerService.getOrganizers()
    .then((response) => {
      organizer.value = response.data
    })
    .catch((e) => {
      router.push({ name: 'network-error-view' })
    })
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
        <BaseInput
          type="text"
          v-model="event.category"
          placeholder="Category"
          class="ml-2 border rounded px-2 py-1 field"
          label="Category"
        ></BaseInput>
      </div>
      <h3>Name & Describe your event</h3>
      <div class="mb-2">
        <BaseInput
          type="text"
          v-model="event.title"
          placeholder="Title"
          class="ml-2 border rounded px-2 py-1 field"
          label="Title"
        ></BaseInput>
      </div>

      <div class="mb-2">
        <BaseInput
          type="text"
          v-model="event.description"
          placeholder="Description"
          class="ml-2 border rounded px-2 py-1 field"
          label="Description"
        ></BaseInput>
      </div>

      <div class="mb-2">
        <h3>Where is your event?</h3>
        <BaseInput
          type="text"
          v-model="event.location"
          placeholder="Location"
          class="ml-2 border rounded px-2 py-1 field"
          label="Location"
        ></BaseInput>
      </div>

      <div class="mb-2">
        <h3>Who is your organizer?</h3>
        <BaseSelect
          v-model="event.organizer.id"
          class="ml-2 border rounded px-2 py-1 field"
          :options="organizer"
          label="Select an Organizer"
        ></BaseSelect>
      </div>

      <div class="mb-2">
        <h3>The image of the Event</h3>
        <ImageUpload v-model="event.images"></ImageUpload>
      </div>

      <button type="submit" class="button bg-blue-500 rounded px-3 py-2 text-white">Submit</button>
    </form>

    <pre class="mt-4">{{ event }}</pre>
  </div>
</template>
