<script setup lang="ts">
import { ref } from 'vue';
import { createPlaylist } from '@/lib/client';
import { type IPlaylist, Playlist } from '@/lib/playlists/model';

import StandardModal from '@/components/modals/StandardModal.vue';

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'created', newId: number): number,
}>()

const title = ref('');

function create() {
  const val = title.value.trim();

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
      <label for="input-title">Tytuł</label>
      <input type="text" id="input-title" v-model="title" placeholder="Wpisz tytuł playlisty" />
    </p>

    <template #footer>
      <button type="submit" class="positive" @click.prevent="create">Dodaj</button>
    </template>

  </StandardModal>
</template>
