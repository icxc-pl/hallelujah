import { ref } from 'vue';
import { defineStore } from 'pinia';

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
    enabled: true,
    strategies: [
      {
        storage: localStorage
      }
    ]
  }
});
