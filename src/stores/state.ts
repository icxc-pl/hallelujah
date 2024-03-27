import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';

export const useStateStore = defineStore('state', () => {

  const lastSongPath: Ref<null | string> = ref(null);
    
  return { lastSongPath };
});
