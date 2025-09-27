<template>
  <RouterLink
    :to="`/organizers/${organizer.id}`"
    class="block w-80 mb-4 border rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-50"
  >
    <h2 class="text-xl font-bold text-center mb-2">{{ organizer.name }}</h2>

    <p class="text-sm text-gray-500 text-center mb-2">
      📑 Events: {{ organizer.ownEvents?.length || 0 }}
    </p>

    <ul class="mt-2 text-sm text-gray-700">
      <li v-for="event in organizer.ownEvents" :key="event.id">
        - {{ event.title }} ({{ event.participants.length }} participants)
      </li>
    </ul>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  organizer: any
}>()
</script>
