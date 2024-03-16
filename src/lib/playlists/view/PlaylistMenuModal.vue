<script setup lang="ts">
import { ref, type PropType } from 'vue';
import { type IPlaylist, Playlist } from '@/lib/playlists/model';

import StandardModal from '@/components/modals/StandardModal.vue';
import BasicButton from '@/components/elements/BasicButton.vue';

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'created', newId: number): number,
}>()

const props = defineProps({
  playlist: {
    type: Object as PropType<IPlaylist>,
    required: true
  }
});

</script>

<template>
  <StandardModal
    id="playlist-menu-modal"
    close-text="Zamknij"
    @update:model-value="val => emit('update:modelValue', val)">

    <BasicButton icon="Edit" title="Zmień nazwę"/>
    <BasicButton icon="Copy" title="Duplikuj" />
    <BasicButton icon="Trash" title="Usuń" color="red" />

  </StandardModal>
</template>

<style lang="less">
#playlist-menu-modal {
  .modal-window {
    width: 15rem;

    button {
      width: 100%;
      
      & + button {
        margin-left: 0;
        margin-top: 0.5rem;
      }
    }
  }
}

</style>
