import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as { username: string } | null,
  }),
  actions: {
    login(user: { username: string }) {
      this.user = user;
    },
    logout() {
      this.user = null;
    },
  },
});
