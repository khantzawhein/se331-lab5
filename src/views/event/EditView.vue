<script setup lang="ts">
import {toRefs} from "vue";
import type {Event} from "@/type";
import {useMessageStore} from "@/stores/message";
import {useRouter} from "vue-router";

const props = defineProps<{ event: Event, id: string }>();
const {event} = toRefs(props);
const store = useMessageStore();
const router = useRouter();
const edit = () => {
  store.updateMessage(`You are successfully edited ${event.value.title} event.`)
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({name: 'event-detail-view'})
}


</script>

<template>
  <div style="text-align: center">
    <p>Edit event here</p>

    <button @click="edit">Edit</button>
  </div>
</template>

<style scoped>

</style>