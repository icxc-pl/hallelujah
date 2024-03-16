<script setup lang="ts">
import { ref } from 'vue';
import { createPlaylist } from '@/lib/client';
import { type IPlaylist, Playlist } from '@/lib/playlists/model';

import StandardModal from '@/components/modals/StandardModal.vue';
import BasicButton from '@/components/elements/BasicButton.vue';

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'created', newId: number): number,
}>()

const name = ref('');

function create() {
  const val = name.value.trim();

  let playlist: IPlaylist;
  try {
    playlist = new Playlist(val);
  } catch (e: any) {
    alert("Wystąpił błąd podczas tworzenia Playlisty: " + e.message);
    return;
  }

  createPlaylist(playlist).then((newId: number) => {
    emit('update:modelValue', false)
    emit('created', newId);
  });
}

</script>

<template>
  <StandardModal
    close-text="Anuluj"
    @update:model-value="val => emit('update:modelValue', val)">

    <p class="input-container">
      <label for="input-name">Nazwa</label>
      <input type="text" id="input-name" v-model="name" placeholder="Wpisz nazwę playlisty" />
    </p>

    <template #footer>
      <BasicButton :main="true" title="Dodaj" icon="Plus" color="green" @click.prevent="create" />
    </template>

  </StandardModal>
</template>
