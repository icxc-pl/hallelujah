<script lang="ts" setup>
import { onActivated, ref, type Ref, shallowReactive, computed } from 'vue';
import { useRouter } from 'vue-router';

// import SearchBar from '@/components/SearchBar.vue';
import SongsList from '@/lib/songs/view/SongsList.vue';
import { getPlaylist, getPlaylistSongs } from '@/lib/client';
import { type IPlaylist } from '@/lib/playlists/model';
import { type ISong } from '@/lib/songs/model';
import { DataContainer } from '@/lib/vue/DataContainer';

import ViewLayout from '@/components/ViewLayout.vue';

const router = useRouter();
const playlistId: Ref<number | null> = ref(-1);

const playlist: DataContainer = shallowReactive(new DataContainer());
const songs: DataContainer = shallowReactive(new DataContainer());

const isLoading = computed(() => playlist.loading || songs.loading);
const getTitle = computed(() => {
  if (playlist.data == null) {
    return "404";
  }

  return (playlist.data as IPlaylist).name;
});

function getCurrentIdFromUrl() {
  return parseInt(router.currentRoute.value.params.id as string);
}


onActivated(() => {
  playlistId.value = getCurrentIdFromUrl();
  refresh();
});

async function refresh() {
  playlist.setLoading(true);
  songs.setLoading(true);

  if (playlistId.value === null) {
    return;
  }

  const p = await getPlaylist(playlistId.value);

  if (p == null || p.id == null) {
    return;
  }

  playlist.setData(p);
  songs.setData(await getPlaylistSongs(p.id));
}

</script>

<template>
  <ViewLayout
    :title="getTitle"
    :loading-enabled="true"
    :loading-state="isLoading">

    <template #content>
        <!-- <SearchBar @input="setSearch" /> -->
        <SongsList
          :songs="(songs.data as Array<ISong>)" />
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
