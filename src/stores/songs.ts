import { ref, computed, reactive, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { SongImporter } from '@/songs/SongImporter';
import { Song } from '@/songs/model/Song';

export const useSongsStore = defineStore('songs', () => {

  const id: Ref<null | number> = ref(null);
  const list: Song[] = reactive([]);
  const loading = ref(true);
  
  function load() {
    fetch('/songs.md').then((res) => {
      res.text().then((content) => {
        const importer: SongImporter = new SongImporter();
        list.push(...importer.process(content));
        loading.value = false;
      });
    });
  }
  
  function findById(id: number) {
    return list.find((song) => song.id == id);
  }
  
  const current = computed(() => {
    if (id.value) {
      return findById(id.value) || null;
    }
  
    return null;
  });
  
  load();

  return { id, current, list, loading };
});
