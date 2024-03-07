<script lang="ts" setup>
import { computed, shallowReactive } from 'vue';
// import SearchBar from '@/components/SearchBar.vue';
import PlaylistsList from '@/lib/playlists/view/PlaylistsList.vue';
import { getPlaylistsList, createPlaylist } from '@/lib/client';
import { type IPlaylist, Playlist } from '@/lib/playlists/model';
import { DataContainer } from '@/lib/vue/DataContainer';

import ViewLayout from '@/components/ViewLayout.vue';
import ToolbarButton from '@/components/toolbar/ToolbarButton.vue';

const container: DataContainer = shallowReactive(new DataContainer());

const areItems = computed(() => {
  return container.data instanceof Array && container.data.length > 0;
});

function refresh() {
  container.setLoading(true);
  getPlaylistsList().then((data: Array<IPlaylist>) => {
    container.setData(data);
  });
}

function addPlaylist() {
  let title = prompt("Podaj nazwę nowej Playlisty:");
  
  if (title == null) {
    return;
  }

  let playlist: IPlaylist;
  try {
    playlist = new Playlist(title);
  } catch (e: any) {
    alert("Wystąpił błąd podczas tworzenia Playlisty: " + e.message);
    return;
  }

  createPlaylist(playlist).then((data: IPlaylist) => {
    refresh();
  });

}


refresh();

</script>

<template>
  <ViewLayout title="Playlisty"
    :loading-enabled="true"
    :loading-state="container.loading">

    <template #toolbar>
      <ToolbarButton title="Dodaj nową Playlistę" icon="Plus" color="green" @click="addPlaylist" />
    </template>

    <template #content>
      <!-- <SearchBar @input="setSearch" /> -->
      <template v-if="!container.loading">
        <PlaylistsList v-if="areItems"
          :playlists="(container.data as Array<IPlaylist>)" />
        
        <p v-else>
          Nie masz jeszcze żadnej Playlisty. Kliknij na plusik do góry, aby dodać nową.
        </p>
      </template>
    </template>

  </ViewLayout>
</template>

<style lang="less">
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
