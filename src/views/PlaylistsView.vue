<script lang="ts" setup>
import { shallowReactive } from 'vue';
// import SearchBar from '@/components/SearchBar.vue';
import PlaylistsList from '@/lib/playlists/view/PlaylistsList.vue';
import { getPlaylistsList } from '@/lib/client';
import type { IPlaylist } from '@/lib/songs/model/IPlaylist';
import { DataContainer } from '@/lib/vue/DataContainer';

import ViewLayout from '@/components/ViewLayout.vue';

const container: DataContainer = shallowReactive(new DataContainer());

getPlaylistsList().then((data: Array<IPlaylist>) => {
  container.setData(data);
});
</script>

<template>
  <ViewLayout :loading-enabled="true" :loading-state="container.loading">

    <template #content>
      <!-- <SearchBar @input="setSearch" /> -->
      <PlaylistsList v-if="!container.loading"
        :playlists="(container.data as Array<IPlaylist>)" />
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
