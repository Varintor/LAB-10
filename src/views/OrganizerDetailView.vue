<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import OrganizerService from '@/services/EventService'

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
    <h1>{{ organizer.organizerName }}</h1>
    <p>📍 {{ organizer.address }}</p>
  </div>
</template>
