// src/services/OrganizerService.ts
import axios from 'axios'
import type { Organizer } from '@/types' 

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // ✅ URL backend จาก .env
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getOrganizers(perPage: number, page: number) {
    return apiClient.get(`/organizers?_page=${page}&_limit=${perPage}`)
  },
  getOrganizer(id: number) {
    return apiClient.get(`/organizers/${id}`)
  },
  saveOrganizer(organizer: Organizer) {
    return apiClient.post('/organizers', organizer)
  }
}
