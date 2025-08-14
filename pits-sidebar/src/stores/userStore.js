// stores/userStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: []
  }),
  actions: {
    async fetchUsers() {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      this.users = response.data
    },
    addUser(user) {
  this.users.push(user)
}

  }
})
