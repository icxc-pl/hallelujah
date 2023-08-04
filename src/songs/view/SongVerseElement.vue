<script lang="ts">
import { defineComponent } from 'vue';
import { SongVerse } from '../model/SongVerse';

export default defineComponent({
  props: {
    verse: {
      type: SongVerse,
      required: true
    }
  },

  computed: {
    text() {
      let text = "";
      for (const line of this.verse.lines) {
        if (text.length > 0) {
          text += '<br>';
        }
        text += line.text;
      }
      return text;
    }
  }
});
</script>

<template>
  <p v-html="text"></p>
</template>
