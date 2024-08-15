<script setup lang="ts">
import {toRefs} from "vue";
import type {Event} from "@/type";
import {useRouter} from "vue-router";
import {useMessageStore} from "@/stores/message";

const props = defineProps<{ event: Event, id: string }>();
const {event} = toRefs(props);
const router = useRouter();
const store = useMessageStore();
const register = () => {
  store.updateMessage(`You are successfully registered for ${event.value.title} event.`)
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({name: 'event-detail-view'})
}
</script>

<template>
  <div style="text-align: center">
    <p>Register event here</p>
    <button @click="register">
      Register
    </button>
  </div>
</template>

<style scoped>

</style>