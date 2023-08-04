import { reactive, shallowReactive } from 'vue';
import { defineStore } from 'pinia';
import { SongImporter } from '@/songs/SongImporter';
import { Song } from '@/songs/model/Song';

class State {
  id: number | null;
  song: Song | null;
  loading: boolean;

  constructor() {
    this.id = null;
    this.song = null;
    this.loading = true;
  }
}

export const useSongsStore = defineStore('songs', () => {
  const songs: Song[] = shallowReactive([]);
  const state = reactive(new State());

  fetch('/songs.md').then((res) => {
    res.text().then((content) => {
      const importer: SongImporter = new SongImporter();
      const importedSongs: Song[] = importer.process(content);
      songs.push(...importedSongs);
      state.loading = false;

      if (state.id != null) {
        setCurrent(state.id);
      }
    });
  });

  const getBydId = (id: number): Song | null => {
    for (const song of songs) {
      if (song.id == id) {
        return song;
      }
    }

    return null;
  };

  const setCurrent = (id: string | number): void => {
    if (typeof id == 'string') {
      id = parseInt(id);
    }
    state.id = id;

    if (!state.loading) {
      state.song = getBydId(id);
    }
  };

  return { songs, state, getBydId, setCurrent };
});
