<script lang="ts">
import { defineComponent } from 'vue';
import { Song } from '@/songs/model/Song';
import { useSongsStore } from '@/stores/songs';
import SearchBar from '@/components/SearchBar.vue';
import SongsList from '@/songs/view/SongsList.vue';

export default defineComponent({
  components: {
    SearchBar,
    SongsList
  },

  data() {
    return {
      songs: [] as Array<Song>,
      search: ""
    }
  },

  methods: {
    setSearch(search: string) {
      this.search = search;
    }
  },

  created() {
    const { songs } = useSongsStore();
    this.songs = songs;
  }
});
</script>

<template>
  <div>
    <SearchBar @input="setSearch" />
    <SongsList :songs="songs" :search="search" />
  </div>
</template>

<style lang="less" scoped>
div {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 3rem 1fr;
  grid-template-areas: 'search-bar' 'song-list';

  form {
    grid-area: search-bar;
  }

  ul {
    grid-area: song-list;
  }
}
</style>
