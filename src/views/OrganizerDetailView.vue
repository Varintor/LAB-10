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

    <div class="flex flex-row flex-wrap justify-center mt-4">
      <img v-for="img in organizer.images" :key="img" :src="img"
     alt="Organizer image"
     class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg" />
    </div>

    <h2 class="text-lg font-semibold mt-6">Events:</h2>
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

