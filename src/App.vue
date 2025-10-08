<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccountPlus, mdiLogin } from '@mdi/js'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const store = useMessageStore()
const { message } = storeToRefs(store)
const authStore = useAuthStore()
const router = useRouter()
import { mdiAccount } from '@mdi/js'
import { mdiLogout } from '@mdi/js'

function logout() {
  authStore.logout()
  router.push({ name: 'login' })
}

const token = localStorage.getItem('access_token')
const user = localStorage.getItem('user')
if (token && user) {
  authStore.reload(token,JSON.parse(user))
}else{
  authStore.logout()
}
</script>

<template>
  <div class="text-center font-sans text-gray-700 antialias">
    <header>
      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <div class="wrapper">
        <nav class="py-6">
          ️<nav class="flex">
            <ul v-if="!authStore.currentUserName" class="flex navbar-nav ml-auto">
              <li class="nav-item px-2"> <router-link to="/register" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiAccountPlus" /> <span class="ml-3">Sign Up</span>
                  </div>
                </router-link> </li>
              <li class="nav-item px-2"> <router-link to="/login" class="nav-link">
                  <div class="flex item-center">
                    <SvgIcon type="mdi" :path="mdiLogin" /> <span class="ml-3">Login</span>
                  </div>
                </router-link> </li>
            </ul>
            <ul v-if="authStore.currentUserName" class="flex navbar-nav ml-auto">
              <li class="nav-item px-2">
                <router-link to="/profile" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon typer="mdi" :path="mdiAccount" /> <span class="ml-3">{{ authStore.currentUserName }}</span>
                  </div>
                </router-link>
              </li>
              <li class="nav-item px-2">
                <a href="#" class="nav-link" @click.prevent="authStore.$reset(); router.push({ name: 'event-list-view' })">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiLogout" /> <span class="ml-3">Logout</span>
                  </div>
                </a>
              </li>

            </ul>
            <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
              :to="{ name: 'event-list-view' }">Event</RouterLink> | <RouterLink class="font-bold text-gray-700"
              exact-active-class="text-green-500" :to="{ name: 'organizer-list' }">Organizer</RouterLink> | <RouterLink
              class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'about' }">About
            </RouterLink> | <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
              :to="{ name: 'add-event' }"> Add Event</RouterLink> | <RouterLink class="font-bold text-gray-700"
              exact-active-class="text-green-500" :to="{ name: 'add-organizer' }"> Add Organizers</RouterLink>
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
