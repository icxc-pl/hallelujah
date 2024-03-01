<script lang="ts" setup>
import { ref, reactive, shallowReactive } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import SongsList from '@/songs/view/SongsList.vue';
import { getSongsList } from '@/client';
import type { ISong } from '@/songs/model/ISong';

const search = ref("");
const list: Array<ISong> = shallowReactive([]);

function setSearch(_search: string) {
    search.value = _search;
}

getSongsList().then((data: Array<ISong>) => {
  list.push(...data);
});
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
