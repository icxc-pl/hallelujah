<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useModal } from 'vue-final-modal';
// import SearchBar from '@/components/SearchBar.vue';
import PlaylistsList from '@/lib/playlists/view/PlaylistsList.vue';
import { getPlaylistsList } from '@/lib/client';
import { type IPlaylist } from '@/lib/playlists/model';
import { DataContainer } from '@/lib/vue/DataContainer';

import ViewLayout from '@/components/ViewLayout.vue';
import ToolbarButton from '@/components/toolbar/ToolbarButton.vue';
import CreatePlaylistModal from '@/lib/playlists/view/CreatePlaylistModal.vue';


const createPlaylistModal = useModal({
  component: CreatePlaylistModal,
  attrs: {
    onCreated: () => {
      refresh();
    }
  }
});

const container: DataContainer = reactive(new DataContainer());

const areItems = computed(() => {
  return container.data instanceof Array && container.data.length > 0;
});

function refresh() {
  container.setLoading(true);
  getPlaylistsList().then((data: Array<IPlaylist>) => {
    container.setData(data);
  });
}

function whenPlaylistDeleted(playlist: IPlaylist) {
  const idx = (container.data as IPlaylist[]).indexOf(playlist);
  if (idx >= 0) {
    (container.data as IPlaylist[]).splice(idx, 1);
  }
}

refresh();

</script>

<template>
  <ViewLayout title="Playlisty"
    :loading-enabled="true"
    :loading-state="container.loading">

    <template #toolbar>
      <ToolbarButton title="Dodaj nową Playlistę" icon="Plus" color="green" @click="createPlaylistModal.open" />
    </template>

    <template #content>
      <!-- <SearchBar @input="setSearch" /> -->
      <template v-if="!container.loading">
        <PlaylistsList v-if="areItems"
          :playlists="(container.data as Array<IPlaylist>)"
          @itemdeleted="whenPlaylistDeleted"  />
        
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
