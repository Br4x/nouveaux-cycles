import { defineStore } from "pinia";

export const useUserStore = defineStore({
  persist: {
    enabled: true,
  },
  id: "user-store",
  state: () => {
    return {
      gAuthUser: {
        id: null,
        fullName: null,
        firstName: null,
        lastName: null,
        avatar: null,
        email: null,
      },
    };
  },
  actions: {
    async login() {
      try {
        const response = await $fetch(`/api/users?page=${this.page}`);
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    usersList: (state) => state.users,
  },
});
