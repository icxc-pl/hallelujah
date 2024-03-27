<script lang="ts" setup>
import { type PropType } from 'vue';
import { useModal } from 'vue-final-modal';

import IconButton from '@/components/elements/IconButton.vue';
import MenuModal from '@/components/modals/MenuModal.vue';
import SelectModal from '@/components/modals/SelectModal.vue';

import { SelectOption } from '@/lib/vue/SelectOption';

import { getPlaylistsListWithoutSong, addSongToPlaylist } from '@/lib/client';
import { type ISong } from '@/lib/songs/model';
import { type IPlaylist } from '@/lib/playlists/model';


const props = defineProps({
  song: {
    type: Object as PropType<ISong | null>,
    default: null
  }
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
  if (props.song == null) {
    throw new Error("Song is null");
  }

  const data: IPlaylist[] = await getPlaylistsListWithoutSong(props.song.hash);
  const options: SelectOption[] = [];
  for (let p of data) {
    if (p.id != null) {
      options.push(new SelectOption(`${p.id}`, p.name));
    }
  }
  return options;
}

/**
 * Submit the chosen playlist
 * @param id Id of chosen playlist
 */
async function onSubmitChoosePlaylist(id: string) {
  if (props.song == null) {
    throw new Error("Song is null");
  }

  if (id.trim() === "") {
    throw new Error("Nie wybrano playlisty. Aby dodać playlistę, przejdź do zakładki 'Playlisty' i naciśnij plusik w górnym prawym rogu.");
  }

  try {
    await addSongToPlaylist(parseInt(id), props.song.hash);
  } catch (e) {
    alert(e);
  }  
}

//#endregion

</script>

<template>
  <IconButton title="Opcje" icon="Menu" @click="openOptionsModal.open" />
</template>

<style lang="less">

</style>
