<script lang="ts" setup>
import { computed, type PropType } from 'vue';
import { RouterLink } from 'vue-router';
import { useModal } from 'vue-final-modal';
import { type IPlaylist, Playlist } from '../model';
import { deletePlaylist, updatePlaylist } from '@/lib/client';

import IconButton from '@/components/elements/IconButton.vue';
import MenuModal from '@/components/modals/MenuModal.vue';
import PromptModal from '@/components/modals/PromptModal.vue';
import { duplicatePlaylist } from '../model';

const props = defineProps({
  playlist: {
    type: Object as PropType<IPlaylist>,
    required: true
  }
});

const emit = defineEmits<{
  (e: 'deleted', playlist: IPlaylist): void
  (e: 'updated', playlist: IPlaylist): void
}>();

const link = computed((): string => {
  return '/playlist/' + props.playlist.id;
});

/**
 * Instancinate the modal with options for the playlist
 */
const openMenuModal = useModal({
  component: MenuModal,
  attrs: {
    buttons: [
      {
        title: 'Zmień nazwę',
        icon: 'Edit',
        action: promptChangeName
      },
      {
        title: 'Duplikuj',
        icon: 'Copy'
      },
      {
        title: 'Usuń',
        icon: 'Trash',
        color: 'red',
        action: confirmDeletePlaylist
      }
    ]
  }
});

/**
 * Instancinate the modal to change the name of the playlist
 */
const promptChangeNameModal = useModal({
  component: PromptModal,
  attrs: {
    title: 'Nowa nazwa playlisty',
    placeholder: 'Wpisz nową nazwę playlisty',
    startValue: props.playlist.name,
    onSubmit: submitChangeName
  }
})

/**
 * Updates the name of the playlist
 * @param val New name of the playlist
 */
async function submitChangeName(val: any) {
  let updated: IPlaylist = duplicatePlaylist(props.playlist, val).toObject();
  updated.id = props.playlist.id
  await updatePlaylist(updated);
  promptChangeNameModal.patchOptions({
    // @ts-ignore
    attrs: {
      startValue: updated.name
    }
  });
  emit('updated', updated);
}

/**
 * Opens a modal to change the name of the playlist
 */
function promptChangeName() {
  promptChangeNameModal.open();
}

function confirmDeletePlaylist() {
  if (confirm("Czy na pewno chcesz usunąć Playlistę?")) {
    if (props.playlist.id == null) {
      return;
    }

    deletePlaylist(props.playlist.id).then(() => {
      emit('deleted', props.playlist);
    });
  }
}

</script>

<template>
  <li class="playlists-list-element">
    <RouterLink :to="link">
      <strong>{{ playlist.name }}</strong>
    </RouterLink>
    <IconButton title="Menu" icon="Menu" @click.stop="openMenuModal.open" />
  </li>
</template>

<style lang="less">
li.playlists-list-element {
  display: flex;
  overflow: hidden;
  margin: 0.5rem;
  border: 1px solid #eee;
  border-radius: 3px;
  align-items: center;

  a {
    display: block;
    color: var(--color-link);
    text-decoration: none;
    margin: var(--side-margin-h) var(--side-margin-v);
    flex-basis: 100%;
    flex-shrink: 1;

    strong {
      display: block;
      font-size: 1.1em;
    }
  }

  button {
    flex-shrink: 0;
    flex-grow: 0;
  }
}
</style>
