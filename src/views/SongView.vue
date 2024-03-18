<script lang="ts" setup>
import { computed, onActivated, shallowReactive } from 'vue';
import { useRoute } from 'vue-router';
import { useModal } from 'vue-final-modal';

import { storeToRefs } from 'pinia';
import { useStateStore } from '@/stores/state';

import ViewLayout from '@/components/ViewLayout.vue';
import IconButton from '@/components/elements/IconButton.vue';
import MenuModal from '@/components/modals/MenuModal.vue';

import { DataContainer } from '@/lib/vue/DataContainer';

import { getSong } from '@/lib/client';
import SongVersesList from '@/lib/songs/view/SongVersesList.vue';
import SongMetaContainer from '@/lib/songs/view/SongMetaContainer.vue';
import type { ISong } from '@/lib/songs/model/ISong';

const route = useRoute();
const state = useStateStore();
const { currentSongIndex } = storeToRefs(state);

const container: DataContainer = shallowReactive(new DataContainer());

/**
 * Get the current song id from the url
 */
function getCurrentIdFromUrl() {
  const pid = route.params['id'] as string;
  const id = parseInt(pid);
  if (isNaN(id)) {
    return null;
  }
  return id;
}

/**
 * When the view is activated, load the song from the server
 */
onActivated(() => {
  const idFromUrl = getCurrentIdFromUrl();
  
  if (idFromUrl === null) {
    return;
  }

  getSong(idFromUrl).then((data) => {
    container.setData(data);
  });

  if (currentSongIndex.value != idFromUrl) {
    currentSongIndex.value = idFromUrl;
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
      }
    ]
  }
});

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
