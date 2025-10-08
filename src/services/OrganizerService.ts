import apiClient from './AxiosClient'
import type { Organizer } from '@/types' 



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
