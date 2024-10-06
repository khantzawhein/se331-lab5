<script setup lang="ts">
import OrganizerService from '@/services/OrganizerService'
import { useMessageStore } from '@/stores/message'
import type { Organizer } from '@/type'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import ImageUpload from '@/components/ImageUpload.vue'

const organizer = ref<Organizer>({
  id: 0,
  name: '',
  image: ''
})
const media = ref<string[]>([])

const router = useRouter()
const store = useMessageStore()
function saveOrganizer() {
  organizer.value.image = media.value[0] || null
  OrganizerService.saveOrganizer(organizer.value)
    .then((response) => {
      router.push({ name: 'organizer-list-view', params: { id: response.data.id } })
      store.updateMessage(`You have successfully created an organizer for ${response.data.name}`)
    })
    .catch((e) => {
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <div>
    <h1 class="text-center">Create an organizer</h1>
    <form @submit.prevent="saveOrganizer">
      <div class="mb-2">
        <label>Name</label>
        <input
          type="text"
          v-model="organizer.name"
          placeholder="Name"
          class="ml-2 border rounded px-2 py-1 field"
        />
      </div>
      <div class="mb-2">
        <h3>The image of the organizer</h3>
        <ImageUpload v-model="media" :maxFiles="1"></ImageUpload>
      </div>
      <button type="submit" class="button bg-blue-500 rounded px-3 py-2 text-white">Submit</button>
    </form>

    <pre class="mt-4">{{ organizer }}</pre>
  </div>
</template>
