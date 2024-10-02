<script setup lang="ts">
import OrganizerService from '@/services/OrganizerService'
import { useMessageStore } from '@/stores/message'
import type { Organizer } from '@/type'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const organizer = ref<Organizer>({
  id: 0,
  name: ''
})

const router = useRouter()
const store = useMessageStore()
function saveOrganizer() {
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
      <!-- <div class="mb-2">
        <label>Organization</label>
        <input
          type="text"
          v-model="organizer.organization"
          placeholder="Organization"
          class="ml-2 border rounded px-2 py-1 field"
        />
      </div>

      <div class="mb-2">
        <label>Address</label>
        <input
          type="text"
          v-model="organizer.address"
          placeholder="Address"
          class="ml-2 border rounded px-2 py-1 field"
        />
      </div> -->

      <button type="submit" class="button bg-blue-500 rounded px-3 py-2 text-white">Submit</button>
    </form>

    <pre class="mt-4">{{ organizer }}</pre>
  </div>
</template>
