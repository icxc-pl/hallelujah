<script lang="ts" setup>
import { shallowReactive } from 'vue';
// import SearchBar from '@/components/SearchBar.vue';
import SongsList from '@/lib/songs/view/SongsList.vue';
import { getSongsList } from '@/lib/client';
import type { ISong } from '@/lib/songs/model/ISong';
import { DataContainer } from '@/lib/vue/DataContainer';

import ViewLayout from '@/components/ViewLayout.vue';

const container: DataContainer = shallowReactive(new DataContainer());

getSongsList().then((data: Array<ISong>) => {
  container.setData(data);
});
</script>

<template>
  <ViewLayout title="Przeglądaj"
    :loading-enabled="true"
    :loading-state="container.loading">

    <template #content>
        <!-- <SearchBar @input="setSearch" /> -->
        <SongsList
          :songs="(container.data as Array<ISong>)" />
    </template>

  </ViewLayout>
</template>

<style lang="less" scoped>
// div {
//   display: grid;
//   grid-template-columns: 1fr;
//   grid-template-rows: 3rem 1fr;
//   grid-template-areas: 'search-bar' 'song-list';

//   form {
//     grid-area: search-bar;
//   }

//   ul {
//     grid-area: song-list;
//   }
// }
</style>
