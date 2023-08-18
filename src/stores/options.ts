import { reactive } from 'vue';
import { defineStore } from 'pinia';

export class OptionsFunctions {
  showChords: boolean;
  showLeaderTools: boolean;

  constructor() {
    this.showChords = false;
    this.showLeaderTools = false;
  }
}

export const useOptionsStore = defineStore('options', {
  state: () => {
    const functions = reactive(new OptionsFunctions());

    return {
      functions
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
