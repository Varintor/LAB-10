<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import OrganizerService from '@/services/OrganizerService'

const route = useRoute()
const organizer = ref<any>(null)

onMounted(() => {
  OrganizerService.getOrganizer(Number(route.params.id))
    .then((response) => {
      organizer.value = response.data
    })
    .catch((err) => console.error(err))
})
</script>

<template>
  <div v-if="organizer">
    <h1 class="text-2xl font-bold mb-4">{{ organizer.name }}</h1>

    <h2 class="text-lg font-semibold">Events:</h2>
    <ul class="list-disc ml-6 mt-2">
      <li v-for="event in organizer.ownEvents" :key="event.id">
        {{ event.title }} ({{ event.participants.length }} participants)
      </li>
    </ul>
  </div>
  <div v-else>
    ⏳ Loading organizer details...
  </div>
</template>
