<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

import { SpeedInsights } from '@vercel/speed-insights/vue'
import { mdiAccountPlus, mdiLogin } from '@mdi/js'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount } from '@mdi/js'

import { mdiLogout } from '@mdi/js'
import { useAuthStore } from './stores/auth'

const store = useMessageStore()
const { message } = storeToRefs(store)
const authStore = useAuthStore()

const router = useRouter()

function logout() {
  authStore.logout()

  router.push({ name: 'login' })
}

const token = localStorage.getItem('token')

const user = localStorage.getItem('user')

if (token && user) {
  authStore.reload(token, JSON.parse(user))
} else {
  authStore.logout()
}
</script>

<template>
  <SpeedInsights></SpeedInsights>
  <div id="text-center font-sans text-gray-700 antialias">
    <header>
      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <h1>Deploy with Vercel</h1>
      <div class="wrapper">
        <nav class="p-[30px] text-center">
          <div class="wrapper">
            <nav class="flex">
              <ul v-if="!authStore.currentUserName" class="flex navbar-nav ml-auto">
                <li class="nav-item px-2">
                  <router-link to="/register" class="nav-link">
                    <div class="flex items-center">
                      <SvgIcon type="mdi" :path="mdiAccountPlus" />
                      <span class="ml-3">Sign Up</span>
                    </div>
                  </router-link>
                </li>

                <li class="nav-item px-2">
                  <router-link to="/login" class="nav-link">
                    <div class="flex items-center">
                      <SvgIcon type="mdi" :path="mdiLogin" /> <span class="ml-3">Login</span>
                    </div>
                  </router-link>
                </li>
              </ul>
              <ul v-if="authStore.currentUserName" class="flex navbar-nav ml-auto">
                <li class="nav-item px-2">
                  <router-link to="/profile" class="nav-link">
                    <div class="flex items-center">
                      <SvgIcon type="mdi" :path="mdiAccount" />

                      <span class="ml-3">{{ authStore.currentUserName }}</span>
                    </div>
                  </router-link>
                </li>

                <li class="nav-item px-2">
                  <a class="nav-link hover:cursor-pointer" @click="logout">
                    <div class="flex items-center">
                      <SvgIcon type="mdi" :path="mdiLogin" /> <span class="ml-3"> LogOut</span>
                    </div>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <RouterLink
            :to="{ name: 'event-list-view' }"
            class="font-bold"
            exact
            exact-active-class="text-green-500"
            >Event
          </RouterLink>
          |
          <RouterLink
            :to="{ name: 'students' }"
            exact
            exact-active-class="text-green-500"
            class="font-bold"
            >Students</RouterLink
          >
          |
          <RouterLink
            :to="{ name: 'about' }"
            exact
            exact-active-class="text-green-500"
            class="font-bold"
            >About</RouterLink
          >
          <span v-if="authStore.isAdmin">
            |
            <RouterLink
              :to="{ name: 'add-event' }"
              exact
              exact-active-class="text-green-500"
              class="font-bold"
              >New Event</RouterLink
            >
            |
            <RouterLink
              :to="{ name: 'add-organizer' }"
              exact
              exact-active-class="text-green-500"
              class="font-bold"
              >New Organizer</RouterLink
            >
          </span>
        </nav>
      </div>
    </header>
  </div>

  <RouterView />
</template>

<style></style>
