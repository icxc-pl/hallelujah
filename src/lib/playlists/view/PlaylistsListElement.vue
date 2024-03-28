<script lang="ts" setup>
import { computed, type PropType } from 'vue';
import { RouterLink } from 'vue-router';
import { useModal } from 'vue-final-modal';

import IconButton from '@/components/elements/IconButton.vue';
import MenuModal from '@/components/modals/MenuModal.vue';
import PromptModal from '@/components/modals/PromptModal.vue';
import ConfirmModal from '@/components/modals/ConfirmModal.vue';

import { type IPlaylist } from '../model';
import { createPlaylist, updatePlaylist, deletePlaylist } from '@/lib/client';
import { normalizePlaylistTitle, duplicatePlaylistObject } from '../controller/PlaylistFactory';

const props = defineProps({
  playlist: {
    type: Object as PropType<IPlaylist>,
    required: true
  }
});

const emit = defineEmits<{
  (e: 'deleted', playlist: IPlaylist): void
  (e: 'updated', playlist: IPlaylist): void
  (e: 'created', playlist: IPlaylist): void
}>();

const link = computed((): string => {
  return '/playlist/' + props.playlist.id;
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
        title: 'Zmień nazwę',
        icon: 'Edit',
        action: promptChangeName
      },
      {
        title: 'Duplikuj',
        icon: 'Copy',
        action: promptDuplicate
      },
      {
        title: 'Usuń',
        icon: 'Trash',
        color: 'red',
        action: confirmDelete
      }
    ]
  }
});

//#endregion

//#region -------------------- Change name --------------------

/**
 * Instancinate the modal to change the name of the playlist
 */
const promptChangeNameModal = useModal({
  component: PromptModal,
  attrs: {
    title: 'Nowa nazwa playlisty',
    placeholder: 'Wpisz nową nazwę playlisty',
    startValue: props.playlist.name,
    submitButtonTitle: 'Zapisz',
    submitButtonIcon: 'Save',
    onSubmit: onSubmitChangeName
  }
})

/**
 * Opens a modal to change the name of the playlist
 */
function promptChangeName() {
  promptChangeNameModal.open();
}


/**
 * Updates the name of the playlist
 * @param val New name of the playlist
 */
async function onSubmitChangeName(val: any) {
  const newName = normalizePlaylistTitle(val)

  if (props.playlist.id == null) {
    return;
  }

  const updated = await updatePlaylist(props.playlist.id, {
    name: newName
  });
  promptChangeNameModal.patchOptions({
    // @ts-ignore
    attrs: {
      startValue: updated.name
    }
  });
  promptDuplicateModal.patchOptions({
    // @ts-ignore
    attrs: {
      startValue: updated.name + " Kopia"
    }
  })
  emit('updated', updated);
}

//#endregion

//#region -------------------- Delete --------------------

/**
 * Instancinate the modal to delete the playlist
 */
 const confirmDeleteModal = useModal({
  component: ConfirmModal,
  attrs: {
    question: 'Czy na pewno chcesz usunąć playlistę?',
    confirmButtonTitle: 'Usuń',
    confirmButtonIcon: 'Trash',
    confirmButtonColor: 'red',
    onConfirm: onConfirmDelete
  }
})

/**
 * Opens a modal to confirm the deletion of the playlist
 */
function confirmDelete() {
  confirmDeleteModal.open();
}

/**
 * Execute when used confirmed the deletion of the playlist
 */
async function onConfirmDelete() {
  if(props.playlist.id == null) {
    throw new Error('Ta playlista nie ma id...');
  }

  await deletePlaylist(props.playlist.id);
  emit('deleted', props.playlist)
}

//#endregion

//#region -------------------- Duplicate --------------------

/**
 * Instancinate the modal to change the name of the playlist
 */
 const promptDuplicateModal = useModal({
  component: PromptModal,
  attrs: {
    title: 'Nazwa nowej playlisty',
    placeholder: 'Wpisz nazwę nowej playlisty',
    startValue: props.playlist.name + " Kopia",
    submitButtonTitle: 'Duplikuj',
    submitButtonIcon: 'Copy',
    onSubmit: onSubmitDuplicate
  }
})

/**
 * Opens a modal to change the name of the playlist
 */
function promptDuplicate() {
  promptDuplicateModal.open();
}


/**
 * Updates the name of the playlist
 * @param val New name of the playlist
 */
async function onSubmitDuplicate(val: any) {
  let duplicat: IPlaylist = duplicatePlaylistObject(props.playlist, val);
  await createPlaylist(duplicat);
  emit('created', duplicat);
}

//#endregion

</script>

<template>
  <li class="playlists-list-element">
    <RouterLink :to="link">
      <strong>{{ playlist.name }}</strong>
    </RouterLink>
    <IconButton title="Podmenu" icon="Menu" @click.stop="openOptionsModal.open" />
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
      font-size: 1.1rem;
    }
  }

  button {
    flex-shrink: 0;
    flex-grow: 0;
  }
}
</style>
