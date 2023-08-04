<script lang="ts">
import { defineComponent } from 'vue';
import { SongVerse } from '../model/SongVerse';
import SongVerseElement from './SongVerseElement.vue';

export default defineComponent({
  components: {
    SongVerseElement
  },

  props: {
    verses: {
      type: Array<SongVerse>,
      required: true
    }
  }
});
</script>

<template>
<SongVerseElement v-for="verse of verses"
  :key="verse.uuid"
  :verse="verse" />
</template>
