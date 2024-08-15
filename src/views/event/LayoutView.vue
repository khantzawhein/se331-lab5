<script setup lang="ts">
import {useRouter} from "vue-router";
import {useEventStore} from "@/stores/event";
import {storeToRefs} from "pinia";

const eventStore = useEventStore();
const {event} = storeToRefs(eventStore);
</script>

<template>
  <div v-if="event" style="display: flex; justify-content: center; align-items: center">
    <div>
      <h1>{{ event.title }}</h1>
      <nav>
        <router-link :to="{name: 'event-detail-view'}">Details</router-link>
        |
        <router-link :to="{name: 'event-register-view'}">Register</router-link>
        |
        <router-link :to="{name: 'event-edit-view'}">Edit</router-link>
      </nav>
      <RouterView :event="event"></RouterView>
    </div>
  </div>
</template>

<style scoped>

</style>