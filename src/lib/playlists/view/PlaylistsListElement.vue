<script lang="ts" setup>
import { computed, type PropType } from 'vue';
import { RouterLink } from 'vue-router';
import { useModal } from 'vue-final-modal';
import { type IPlaylist } from '../model/IPlaylist';
import { deletePlaylist } from '@/lib/client';
import PlaylistMenuModal from './PlaylistMenuModal.vue';

import IconButton from '@/components/elements/IconButton.vue';

const props = defineProps({
  playlist: {
    type: Object as PropType<IPlaylist>,
    required: true
  }
});

const emit = defineEmits(['deleted']);

const link = computed((): string => {
  return '/playlist/' + props.playlist.id;
});

const openMenuModal = useModal({
  component: PlaylistMenuModal,
  attrs: {
    playlist: props.playlist
  }
});

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
