<script setup lang="ts">
import type { Event, Organizer } from '@/types'   // ✅ เพิ่ม Organizer
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import EventService from '@/services/EventService'
import OrganizerService from '@/services/OrganizerService'  // ✅ เพิ่ม OrganizerService
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import ImageUpload from '@/components/ImageUpload.vue'



const organizers = ref<Organizer[]>([])   // ✅ dropdown list

onMounted(() => {
  OrganizerService.getOrganizers(5, 1)   // ✅ ดึงข้อมูล organizer มาแสดงใน dropdown
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
    name: '',
    images: []
  },
  images: []
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
  <div class="event-form">
    <h1 class="title">Create an Event</h1>

    <form @submit.prevent="saveEvent" class="form-container">
      <!-- Event Info -->
      <section>
        <h2 class="section-title">Event Info</h2>
        <BaseInput v-model="event.category" type="text" label="Category" />
        <BaseInput v-model="event.title" type="text" label="Title" />
        <BaseInput v-model="event.description" type="text" label="Description" />
      </section>

      <!-- Location & Date -->
      <section>
        <h2 class="section-title">Details</h2>
        <BaseInput v-model="event.location" type="text" label="Location" />
        <div class="grid">
          <BaseInput v-model="event.date" type="date" label="Date" />
          <BaseInput v-model="event.time" type="time" label="Time" />
        </div>
      </section>

      <!-- Organizer -->
      <section>
        <h2 class="section-title">Organizer</h2>
        <BaseSelect v-model="event.organizer.id" :options="organizers" label="Select Organizer" />
      </section>

      <!-- Other -->
      <section>
        <h2 class="section-title">Other</h2>
        <div class="field checkbox">
          <label>
            <input v-model="event.petsAllowed" type="checkbox" />
            Pets allowed?
          </label>
        </div>
        <h3>The image of the Event</h3>
        <ImageUpload v-model="event.images" />
      </section>

      <!-- Submit -->
      <div class="actions">
        <button class="button -fill-gradient" type="submit">Submit</button>
      </div>
    </form>

    <!-- Debug -->
    <pre>{{ event }}</pre>
  </div>
</template>


<style scoped>
.event-form {
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

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.field.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
