<script lang="ts" setup>
import { useOptionsStore } from '@/stores/options';
import { SongVerse } from '../model/SongVerse';

const options = useOptionsStore();

defineProps({
  verse: {
    type: SongVerse,
    required: true
  }
});
</script>

<template>
  <table>
    <tr v-for="line in verse.lines"
      :key="line.uuid">
      <td>{{ line.text }}</td>
      <td v-if="options.showChords">{{ line.chord }}</td>
    </tr>
  </table>
</template>
