<script lang="ts" setup>
import { ref, computed, onActivated, shallowReactive } from 'vue';
import { useRoute } from 'vue-router';
import { useModal } from 'vue-final-modal';

import { storeToRefs } from 'pinia';
import { useStateStore } from '@/stores/state';

import ViewLayout from '@/components/ViewLayout.vue';
import IconButton from '@/components/elements/IconButton.vue';
import MenuModal from '@/components/modals/MenuModal.vue';
import SelectModal from '@/components/modals/SelectModal.vue';

import { DataContainer } from '@/lib/vue/DataContainer';
import { SelectOption } from '@/lib/vue/SelectOption';

import { getSong, getPlaylist, getPlaylistsList, updatePlaylist } from '@/lib/client';
import SongVersesList from '@/lib/songs/view/SongVersesList.vue';
import SongMetaContainer from '@/lib/songs/view/SongMetaContainer.vue';
import { type ISong } from '@/lib/songs/model';
import { type IPlaylist } from '@/lib/playlists/model';

const route = useRoute();
const state = useStateStore();
const { currentSongHash } = storeToRefs(state);

const hash = ref("");
const container: DataContainer = shallowReactive(new DataContainer());

/**
 * Get the current song hash from the url
 */
function getCurrentHashFromUrl() {
  return route.params['hash'] as string;
}

/**
 * When the view is activated, load the song from the server
 */
onActivated(() => {
  hash.value = getCurrentHashFromUrl();
  
  if (hash.value === null) {
    return;
  }

  getSong(hash.value).then((data) => {
    container.setData(data);
  });

  if (currentSongHash.value != hash.value) {
    currentSongHash.value = hash.value;
  }
});

/**
 * Compute Song
 */
const song = computed((): ISong => {
  return container.data as ISong;
});

/**
 * Compute Song Title
 */
const songTitle = computed((): string => {
  return container.loading ? "" : song.value.title;
});


//#region -------------------- Menu --------------------

/**
 * Instancinate the modal with options for the playlist
 */
 const openOptionsModal = useModal({
  component: MenuModal,
  attrs: {
    buttons: [
      {
        title: 'Dodaj do playlisty',
        icon: 'Folder',
        action: choosePlaylist
      }
    ]
  }
});

//#endregion

//#region -------------------- Add song to playlist --------------------

/**
 * Instancinate the modal to change the name of the playlist
 */
 const choosePlaylistModal = useModal({
  component: SelectModal,
  attrs: {
    title: 'Wybierz playlistę',
    fetchOptions: fetchPlaylistsAsOptions,
    onSubmit: onSubmitChoosePlaylist
  }
})

/**
 * Opens a modal to choose a playlist
 */
function choosePlaylist() {
  choosePlaylistModal.open();
}

/**
 * Fetches the playlists and returns them as options
 */
async function fetchPlaylistsAsOptions() {
  const data: IPlaylist[] = await getPlaylistsList();
  const options: SelectOption[] = [];
  let select = true;
  for (let p of data) {
    if (p.id != null && !p.songsHashes.includes(hash.value)) {
      options.push(new SelectOption(`${p.id}`, p.name, select));
      select = false;
    }
  }
  return options;
}

/**
 * Submit the chosen playlist
 * @param id Id of chosen playlist
 */
async function onSubmitChoosePlaylist(id: string) {
  if (id.trim() === "") {
    throw new Error("Nie wybrano playlisty. Aby dodać playlistę, przejdź do zakładki 'Playlisty' i naciśnij plusik w górnym prawym rogu.");
  }

  const playlist = await getPlaylist(parseInt(id));
  playlist.songsHashes.push(hash.value);
  await updatePlaylist(playlist);
}

//#endregion

</script>

<template>
  <ViewLayout :title="songTitle"
    :loading-enabled="true"
    :loading-state="container.loading">

    <template #toolbar>
      <IconButton title="Opcje" icon="Menu" @click="openOptionsModal.open" />
    </template>

    <template #content>
      <SongVersesList :verses="song.verses" />
      <SongMetaContainer :meta="song.meta" />
    </template>

  </ViewLayout>
</template>

<style lang="less">
.content-view-song {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
