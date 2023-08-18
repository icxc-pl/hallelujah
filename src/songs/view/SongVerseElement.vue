<script lang="ts" setup>
// import { } from 'vue';
import { SongVerse } from '../model/SongVerse';

defineProps({
  verse: {
    type: SongVerse,
    required: true
  }
});
</script>

<template>
  <section>
    <p v-for="line in verse.lines"
      :key="line.uuid">{{ line.text }}</p>
  </section>
</template>
