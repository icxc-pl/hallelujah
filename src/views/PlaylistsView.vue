<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useModal } from 'vue-final-modal';
// import SearchBar from '@/components/SearchBar.vue';
import PlaylistsList from '@/lib/playlists/view/PlaylistsList.vue';
import { getPlaylistsList, createPlaylist } from '@/lib/client';
import { type IPlaylist } from '@/lib/playlists/model';
import { createPlaylistObject } from '@/lib/playlists/controller/PlaylistFactory';
import { DataContainer } from '@/lib/vue/DataContainer';

import ViewLayout from '@/components/ViewLayout.vue';
import PromptModal from '@/components/modals/PromptModal.vue';
import IconButton from '@/components/elements/IconButton.vue';
import InfoScreen from '@/components/elements/InfoScreen.vue';

const container: DataContainer = reactive(new DataContainer());

const areItems = computed(() => {
  return container.data instanceof Array && container.data.length > 0;
});

//#region -------------------- Create playlist --------------------

const createPlaylistModal = useModal({
  component: PromptModal,
  attrs: {
    title: "Nazwa nowej Playlisty",
    placeholder: "Wpisz nazwę nowej Playlisty",

    submitButtonTitle: "Dodaj",
    submitButtonColor: "green",
    submitButtonIcon: "Plus",

    onSubmit: submitCreatePlaylist
  }
});

async function submitCreatePlaylist(val: any) {
  let playlist: IPlaylist;
  playlist = createPlaylistObject(val);
  whenPlaylistCreated(await createPlaylist(playlist));
}

function whenPlaylistCreated(playlist: IPlaylist) {
  (container.data as IPlaylist[]).push(playlist);
}

//#endregion

//#region -------------------- Update playlist --------------------

function whenPlaylistUpdated(playlist: IPlaylist) {
  const idx = (container.data as IPlaylist[]).findIndex((p) => p.id === playlist.id);
  if (idx >= 0) {
    (container.data as IPlaylist[])[idx] = playlist;
  }
}

//#endregion

//#region -------------------- Delete playlist --------------------

function whenPlaylistDeleted(playlist: IPlaylist) {
  const idx = (container.data as IPlaylist[]).indexOf(playlist);
  if (idx >= 0) {
    (container.data as IPlaylist[]).splice(idx, 1);
  }
}

//#endregion

function refresh() {
  container.setLoading(true);
  getPlaylistsList().then((data: Array<IPlaylist>) => {
    container.setData(data);
  });
}

refresh();

</script>

<template>
  <ViewLayout title="Playlisty"
    :loading-enabled="true"
    :loading-state="container.loading">

    <template #toolbar>
      <IconButton title="Dodaj nową Playlistę" icon="Plus" color="green" @click="createPlaylistModal.open" />
    </template>

    <template #content>
      <!-- <SearchBar @input="setSearch" /> -->
      <template v-if="!container.loading">
        <PlaylistsList v-if="areItems"
          :playlists="(container.data as Array<IPlaylist>)"
          @itemupdated="whenPlaylistUpdated"
          @itemdeleted="whenPlaylistDeleted"
          @itemcreated="whenPlaylistCreated" />
        
        <InfoScreen v-else
          icon="InfoWithCircle"
          title="Brak Playlist"
          text="Nie masz jeszcze żadnej Playlisty. Kliknij na plusik do góry, aby dodać nową." />
      </template>
    </template>

  </ViewLayout>
</template>

<style lang="less">

</style>
