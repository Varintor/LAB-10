export interface Organizer {
  id: number
  organizerName: string
  address: string
}

export interface Event {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  petsAllowed: boolean
  organizer: Organizer | null   // 💡 organizer เป็น object
}

export interface MessageState {
  message: string
}

export interface EventState {
  event: Event | null
}
