<script lang="ts" setup>
import type { ISongVerse } from '../model';
import SongVerseElement from './SongVerseElement.vue';

defineProps({
  verses: {
    type: Array<ISongVerse>,
    required: true
  }
});
</script>

<template>
  <div class="song-verses">
    <SongVerseElement v-for="verse of verses"
      :key="verse.uuid"
      :verse="verse" />
  </div>
</template>
