<script setup lang="ts">
import type { Organizer } from '@/types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import OrganizerService from '@/services/OrganizerService'
import BaseInput from '@/components/BaseInput.vue'

const router = useRouter()
const store = useMessageStore()

// ✨ Organizer object ที่จะส่งไป backend
const organizer = ref<Organizer>({
  name: '',
})

function saveOrganizer() {
  console.log("👉 Sending organizer:", organizer.value)

  OrganizerService.saveOrganizer({
    name: organizer.value.name   // ✅ ส่งแค่ name
  })
    .then((response) => {
      console.log("👉 Saved organizer:", response.data)
      if (response.data && response.data.id) {
        router.push({ name: 'organizer-detail', params: { id: response.data.id } })
      } else {
        store.updateMessage('✅ Added organizer, but no ID returned')
      }
    })
}
</script>

<template>
  <div class="organizer-form">
    <h1 class="title">Add Organizer</h1>

    <form @submit.prevent="saveOrganizer" class="form-container">
      <!-- Organizer Name -->
      <section>
        <h2 class="section-title">Organizer Info</h2>
        <BaseInput v-model="organizer.name" type="text" label="Organizer Name" />
      </section>

      <!-- Submit -->
      <div class="actions">
        <button class="button -fill-gradient" type="submit">Submit</button>
      </div>
    </form>

    <!-- Debug -->
    <pre>{{ organizer }}</pre>
  </div>
</template>

<style scoped>
.organizer-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #16c0b0;
}

.actions {
  text-align: center;
}

.button {
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.button:hover {
  transform: scale(1.05);
}
</style>
