import { defineStore } from 'pinia'
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { Organizer } from '@/types'
const apiClient: AxiosInstance = axios.create({
    baseURL : import.meta.env.VITE_BACKEND_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})
export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null as string | null,
        user: null as Organizer | null
    }),
getters: {
    currentUserName: (state): string => {
        return state.user?.name || ''
    },
     isAdmin: (state): boolean => {
     return state.user?.roles.includes('ROLE_ADMIN') || false
     },
    authorizationHeader: (state): string => {
        return `Bearer ${state.token}`
    }
},
    actions: {
        login(email:string, password: string){
            return apiClient.post('/api/v1/auth/authenticate', {
                username: email,
                password: password
            }).then((response) => {
                this.token = response.data.access_token
                this.user = response.data.user
                localStorage.setItem('access_token', this.token as string)
                localStorage.setItem('user', JSON.stringify(this.user))
                return response
            })
        },
        logout(){
            console.log('Logging out')
            this.token = null
            this.user = null
            localStorage.removeItem('access_token')
            localStorage.removeItem('user')
        },
        reload(token:string,user: Organizer){
            this.token = token
            this.user = user
        },
        register(firstname: string, lastname: string, email: string, password: string) {
        return apiClient.post('/api/v1/auth/register', {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        }).then((response) => {
            this.token = response.data.access_token
                this.user = response.data.user
                localStorage.setItem('access_token', this.token as string)
                localStorage.setItem('user', JSON.stringify(this.user))
            return response
        })
    }
    }
})

function isAdmin() {
    throw new Error('Function not implemented.')
}
