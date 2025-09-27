<script setup lang="ts">
import type { Event, Organizer } from '@/types'   // ✅ เพิ่ม Organizer
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import EventService from '@/services/EventService'
import OrganizerService from '@/services/OrganizerService'  // ✅ เพิ่ม OrganizerService
import BaseInput from '@/components/BaseInput.vue'



const organizers = ref<Organizer[]>([])   // ✅ dropdown list

onMounted(() => {
  OrganizerService.getOrganizers()
    .then((response) => {
      organizers.value = response.data
    })
    .catch(() => {
      console.error("❌ Fetch organizers failed:")
    })
})

const event = ref<Event>({
  id: 0, // ให้เป็น optional
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  petsAllowed: false,
  organizer: {
    id: 0,
    name: ''
  }
})

const router = useRouter()
const store = useMessageStore()

function saveEvent() {
  console.log("👉 Sending event:", event.value)

  EventService.saveEvent({ ...event.value })   // 🔥 แก้จาก event.value → { ...event.value }
    .then((response) => {
      router.push({ name: 'event-detail-view', params: { id: response.data.id } })
      store.updateMessage('You successfully added event: ' + response.data.title)
      setTimeout(() => store.resetMessage(), 3000)
    })
    .catch((err) => {
      console.error("❌ Save failed:", err)
      router.push({ name: 'network-error-view' })
    })
}

</script>

<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="saveEvent">
      <!-- Base Inputs -->
      <BaseInput v-model="event.category" type="text" label="Category" />
      <BaseInput v-model="event.title" type="text" label="Title" />
      <BaseInput v-model="event.description" type="text" label="Description" />
      <BaseInput v-model="event.location" type="text" label="Location" />
      <BaseInput v-model="event.date" type="date" label="Date" />
      <BaseInput v-model="event.time" type="time" label="Time" />

      <!-- Organizer Dropdown -->
      <h3>Who is your organizer?</h3>
      <div class="field">
        <label for="organizer">Select an Organizer</label>
        <select id="organizer" v-model="event.organizer.id">
          <option disabled value="0">-- Please select an organizer --</option>
          <option 
            v-for="option in organizers" 
            :key="option.id" 
            :value="option.id"
          >
            {{ option.name }}
          </option>
        </select>
      </div>

      <!-- Pets Allowed -->
      <div class="field checkbox">
        <label>
          <input v-model="event.petsAllowed" type="checkbox" />
          Pets allowed?
        </label>
      </div>

      <!-- Submit -->
      <button class="button -fill-gradient" type="submit">Submit</button>
    </form>

    <!-- Debug -->
    <pre>{{ event }}</pre>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 1rem;
}

.field {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.field label {
  font-weight: 600;
  margin-bottom: 0.3rem;
}

input,
textarea {
  padding: 8px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.checkbox {
  flex-direction: row;
  align-items: center;
}

.button {
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.button:hover {
  transform: scale(1.05);
}
</style>
