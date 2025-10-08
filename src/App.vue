<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccountPlus, mdiLogin } from '@mdi/js'
const store = useMessageStore()
const { message } = storeToRefs(store)
</script>

<template>
  <div class="text-center font-sans text-gray-700 antialias">
    <header>
      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <div class="wrapper">
        <nav class="py-6">
          ️<nav class="flex items-center justify-between bg-white shadow px-6 py-3">
            <!-- Left: เมนูหลัก -->
            <div class="flex items-center space-x-4">
              <RouterLink class="font-semibold text-gray-700 hover:text-green-600" exact-active-class="text-green-500"
                :to="{ name: 'event-list-view' }">
                Event
              </RouterLink>

              <RouterLink class="font-semibold text-gray-700 hover:text-green-600" exact-active-class="text-green-500"
                :to="{ name: 'organizer-list' }">
                Organizer
              </RouterLink>

              <RouterLink class="font-semibold text-gray-700 hover:text-green-600" exact-active-class="text-green-500"
                :to="{ name: 'about' }">
                About
              </RouterLink>

              <RouterLink class="font-semibold text-gray-700 hover:text-green-600" exact-active-class="text-green-500"
                :to="{ name: 'add-event' }">
                Add Event
              </RouterLink>

              <RouterLink class="font-semibold text-gray-700 hover:text-green-600" exact-active-class="text-green-500"
                :to="{ name: 'add-organizer' }">
                Add Organizers
              </RouterLink>
            </div>

            <!-- Right: ปุ่ม Login / Sign Up -->
            <ul class="flex items-center space-x-6">
              <li>
                <router-link to="/register" class="flex items-center text-gray-700 hover:text-green-600">
                  <SvgIcon type="mdi" :path="mdiAccountPlus" class="w-5 h-5" />
                  <span class="ml-2 font-medium">Sign Up</span>
                </router-link>
              </li>

              <li>
                <router-link to="/login" class="flex items-center text-gray-700 hover:text-green-600">
                  <SvgIcon type="mdi" :path="mdiLogin" class="w-5 h-5" />
                  <span class="ml-2 font-medium">Login</span>
                </router-link>
              </li>
            </ul>
          </nav>
          </nav>

          <div class="page-size-selector">
            <span>Page Size: </span>
            <RouterLink :to="{ name: 'event-list-view', query: { page: 1, limit: 2 } }">2</RouterLink> |
            <RouterLink :to="{ name: 'event-list-view', query: { page: 1, limit: 3 } }">3</RouterLink> |
            <RouterLink :to="{ name: 'event-list-view', query: { page: 1, limit: 4 } }">4</RouterLink>
          </div>

      </div>
    </header>
    <RouterView />
  </div>
</template>

<style>
/* nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
} */



/* @keyframes yellofade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}
#flashMessage {
  animation: yellofade 3s ease-in-out;
} */
</style>
