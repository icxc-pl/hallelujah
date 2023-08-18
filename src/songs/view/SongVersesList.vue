<script lang="ts" setup>
// import { } from 'vue';
import { SongVerse } from '../model/SongVerse';
import SongVerseElement from './SongVerseElement.vue';

defineProps({
  verses: {
    type: Array<SongVerse>,
    required: true
  }
});
</script>

<template>
  <SongVerseElement v-for="verse of verses"
    :key="verse.uuid"
    :verse="verse" />
</template>
