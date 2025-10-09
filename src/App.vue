<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccountPlus, mdiLogin, mdiAccount, mdiLogout } from '@mdi/js'

const store = useMessageStore()
const { message } = storeToRefs(store)
const authStore = useAuthStore()
const router = useRouter()

function logout() {
  authStore.logout()
  router.push({ name: 'login' })
}

// ✅ ตรวจสอบ token ใน localStorage เพื่อ reload user
const token = localStorage.getItem('access_token')
const user = localStorage.getItem('user')
if (token && user) {
  authStore.reload(token, JSON.parse(user))
} else {
  authStore.logout()
}
</script>

<template>
  <div class="text-center font-sans text-gray-700 antialias">
    <header>
      <!-- Flash Message -->
      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4>{{ message }}</h4>
      </div>

      <div class="wrapper">
        <!-- ✅ Navbar -->
        <nav class="py-6 flex justify-between items-center">

          <!-- ซ้าย: เมนูหลัก -->
          <div class="flex space-x-3">
            <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
              :to="{ name: 'event-list-view' }">Event</RouterLink>

            <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
              :to="{ name: 'organizer-list' }">Organizer</RouterLink>

            <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
              :to="{ name: 'about' }">About</RouterLink>

            <span v-if="authStore.isAdmin">
              <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
                :to="{ name: 'add-event' }">Add Events</RouterLink>
            </span>

            <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
              :to="{ name: 'add-organizer' }">Add Organizers</RouterLink>
          </div>

          <!-- ขวา: Login / Profile -->
          <ul class="flex navbar-nav ml-auto">
            <!-- ถ้ายังไม่ login -->
            <template v-if="!authStore.currentUserName">
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
                    <SvgIcon type="mdi" :path="mdiLogin" />
                    <span class="ml-3">Login</span>
                  </div>
                </router-link>
              </li>
            </template>

            <!-- ถ้า login แล้ว -->
            <template v-else>
              <li class="nav-item px-2">
                <router-link to="/profile" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiAccount" />
                    <span class="ml-3">{{ authStore.currentUserName }}</span>
                  </div>
                </router-link>
              </li>
              <li class="nav-item px-2">
                <a href="#" class="nav-link" @click.prevent="logout">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiLogout" />
                    <span class="ml-3">Logout</span>
                  </div>
                </a>
              </li>
            </template>
          </ul>
        </nav>

        <!-- Page Size Selector -->
        <div class="page-size-selector mt-4">
          <span>Page Size: </span>
          <RouterLink :to="{ name: 'event-list-view', query: { page: 1, limit: 2 } }">2</RouterLink> |
          <RouterLink :to="{ name: 'event-list-view', query: { page: 1, limit: 3 } }">3</RouterLink> |
          <RouterLink :to="{ name: 'event-list-view', query: { page: 1, limit: 4 } }">4</RouterLink>
        </div>
      </div>
    </header>

    <!-- Router View -->
    <RouterView />
  </div>
</template>
