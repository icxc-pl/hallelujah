<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSongsStore } from '@/stores/songs';
import SearchBar from '@/components/SearchBar.vue';
import SongsList from '@/songs/view/SongsList.vue';

const store = useSongsStore();
const { list } = storeToRefs(store);
const search = ref("");

function setSearch(_search: string) {
    search.value = _search;
}
</script>

<template>
  <div>
    <SearchBar @input="setSearch" />
    <SongsList :songs="list" :search="search" />
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
