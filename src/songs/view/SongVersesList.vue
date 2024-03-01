<script lang="ts" setup>
// import { } from 'vue';
import type { ISongVerse } from '../model/ISongVerse';
import SongVerseElement from './SongVerseElement.vue';

defineProps({
  verses: {
    type: Array<ISongVerse>,
    required: true
  }
});
</script>

<template>
  <SongVerseElement v-for="verse of verses"
    :key="verse.uuid"
    :verse="verse" />
</template>
