<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {useMessageStore} from "@/stores/message";
import {storeToRefs} from "pinia";

const store = useMessageStore();
const {message} = storeToRefs(store);
</script>

<template>
  <div id="text-center font-sans text-gray-700 antialias">
    <header>
      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <h1>Deploy with Vercel</h1>
      <div class="wrapper">
        <nav class="p-[30px] text-center">
          <RouterLink :to="{name: 'event-list-view'}" class="font-bold"
                      exact exact-active-class="text-green-500">Event
          </RouterLink>
          |
          <RouterLink :to="{name: 'students'}" exact exact-active-class="text-green-500" class="font-bold">Students</RouterLink>
          |
          <RouterLink :to="{name: 'about'}" exact exact-active-class="text-green-500" class="font-bold">About</RouterLink>
        </nav>
      </div>
    </header>
  </div>

  <RouterView/>
</template>

<style>

</style>
