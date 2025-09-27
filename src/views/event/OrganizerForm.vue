<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import OrganizerService from '@/services/EventService'
import { useMessageStore } from '@/stores/message'

const organizer = ref({
  id: 0,               // ให้ backend generate
  organizerName: '',
  address: ''
})

const router = useRouter()
const store = useMessageStore()

function saveOrganizer() {
  console.log("👉 Sending organizer:", organizer.value)
  OrganizerService.addOrganizer(organizer.value)
    .then((response) => {
      // หลังจาก save เสร็จ redirect ไปหน้า list หรือ detail
      //router.push({ name: 'organizer-list-view' })
      store.updateMessage('You successfully added organizer: ' + response.data.organizerName)
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
    <h1>Create an Organizer</h1>
    <form @submit.prevent="saveOrganizer">
      <div class="field">
        <label for="organizerName">Organizer Name</label>
        <input id="organizerName" v-model="organizer.organizerName" type="text" placeholder="Organizer Name" required />
      </div>

      <div class="field">
        <label for="address">Address</label>
        <input id="address" v-model="organizer.address" type="text" placeholder="Address" required />
      </div>

      <button class="button -fill-gradient" type="submit">Submit</button>
    </form>

    <pre>{{ organizer }}</pre>
  </div>
</template>

<style scoped>
.field {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}
.field label {
  font-weight: 600;
  margin-bottom: 0.3rem;
}
input {
  padding: 8px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
