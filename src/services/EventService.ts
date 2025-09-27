import axios from 'axios'
import type { Event } from '@/types'
import type { AxiosResponse } from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  // 📌 Events
  getEvents(perPage: number, page: number) {
    return apiClient.get(`/events?_page=${page}&_limit=${perPage}`)
  },
  getEvent(id: number) {
    return apiClient.get(`/events/${id}`)
  },
  saveEvent(event: Event) {
    return apiClient.post(`/events`, event)
  },
  getEventsByKeyword(keyword: string, perPage: number, page: number): Promise<AxiosResponse<Event[]>> {
    return apiClient.get<Event[]>(
      '/events?title=' + keyword + '&_limit=' + perPage + '&_page=' + page
    )
  },
  // 📌 Organizers
  getOrganizers(perPage: number, page: number) {
    return apiClient.get(`/organizers?_page=${page}&_limit=${perPage}`)
  },
  getOrganizer(id: number) {
    return apiClient.get(`/organizers/${id}`)
  },
  addOrganizer(organizer: { organizerName: string; address: string }) {
    return apiClient.post(`/organizers`, organizer)
  }
}

