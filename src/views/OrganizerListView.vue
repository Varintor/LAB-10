<template>
  <div>
    <h1 class="text-2xl font-bold text-center mb-6">Organizer List</h1>

    <div v-if="loading" class="text-center">⏳ Loading organizers...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-else>
      <!-- การ์ดตรงกลาง -->
      <div class="flex flex-col items-center">
        
          <OrganizerCard
            v-for="org in organizers"
            :key="org.id"
            :organizer="org"
          />
    
      </div>

      <!-- Pagination -->
      <div class="pagination mt-6 flex justify-center gap-4">
        <button :disabled="page===1" @click="page-- && loadOrganizers()">Prev</button>
        <span> Page {{ page }} / {{ Math.ceil(totalOrganizers / perPage) }} </span>
        <button :disabled="page >= Math.ceil(totalOrganizers / perPage)" @click="page++ && loadOrganizers()">Next</button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import OrganizerService from '@/services/EventService'
import OrganizerCard from '@/components/OrganizerCard.vue'

const organizers = ref<any[]>([])
const totalOrganizers = ref(0)
const loading = ref(true)
const error = ref<string | null>(null)
const perPage = 5
const page = ref(1)

onMounted(() => {
  loadOrganizers()
})

function loadOrganizers() {
  loading.value = true
  OrganizerService.getOrganizers(perPage, page.value)
    .then((res) => {
      organizers.value = res.data
      totalOrganizers.value = Number(res.headers['x-total-count'] || organizers.value.length)
    })
    .catch((err) => {
      console.error("❌ Load organizers failed:", err)
      error.value = "Cannot load organizers."
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
