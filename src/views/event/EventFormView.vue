<script setup lang="ts">
import type { Event, Organizer } from '@/types'   // ✅ เพิ่ม Organizer
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import EventService from '@/services/EventService'
import OrganizerService from '@/services/EventService'


const organizers = ref<Organizer[]>([])   // ✅ dropdown list

onMounted(() => {
  OrganizerService.getOrganizers(100, 1).then((res) => {
    organizers.value = res.data
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
  organizer: null
})

const router = useRouter()
const store = useMessageStore()

function saveEvent() {
  console.log("👉 Sending event:", event.value)
  EventService.saveEvent(event.value)
    .then((response) => {
      router.push({ name: 'event-detail-view', params: { id: response.data.id } })
      store.updateMessage('You successfully added event: ' + response.data.title)
      setTimeout(() => {
        store.resetMessage()
      }, 3000)
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
      <div class="field">
        <label for="category">Category</label>
        <input id="category" v-model="event.category" type="text" placeholder="Category" required />
      </div>

      <h3>Name & describe your event</h3>
      <div class="field">
        <label for="title">Title</label>
        <input id="title" v-model="event.title" type="text" placeholder="Title" required />
      </div>

      <div class="field">
        <label for="description">Description</label>
        <textarea id="description" v-model="event.description" placeholder="Write a short description..."></textarea>
      </div>

      <h3>Where is your event?</h3>
      <div class="field">
        <label for="location">Location</label>
        <input id="location" v-model="event.location" type="text" placeholder="Location" required />
      </div>

      <h3>Other info</h3>
      <div class="field">
        <label for="date">Date</label>
        <input id="date" v-model="event.date" type="date" />
      </div>

      <div class="field">
        <label for="time">Time</label>
        <input id="time" v-model="event.time" type="time" />
      </div>

      <div class="field">
        <label for="organizer">Organizer</label>
        <select id="organizer" v-model="event.organizer">
          <option :value="null" disabled>Select organizer</option>
          <option v-for="org in organizers" :key="org.id" :value="org">
            {{ org.organizerName }}
          </option>
        </select>
      </div>



      <div class="field checkbox">
        <label>
          <input v-model="event.petsAllowed" type="checkbox" />
          Pets allowed?
        </label>
      </div>

      <button class="button -fill-gradient" type="submit">Submit</button>
    </form>

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
