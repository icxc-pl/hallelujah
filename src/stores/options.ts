import { ref } from 'vue';
import { defineStore } from 'pinia';
import { } from 'pinia-plugin-persistedstate';

export const useOptionsStore = defineStore('options', {
  state: () => {
    const showChords = ref(0);
    const showLeaderTools = ref(false);

    return {
      showChords,
      showLeaderTools
    };
  },
  
  persist: {
    storage: localStorage
  }
});
