import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';

export const useStateStore = defineStore('state', () => {

  const currentSongIndex: Ref<null | number> = ref(null);
    
  return { currentSongIndex };
});
