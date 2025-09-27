// src/services/OrganizerService.ts
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // ✅ URL backend จาก .env
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getOrganizers() {
    return apiClient.get('/organizers')
  },
}
