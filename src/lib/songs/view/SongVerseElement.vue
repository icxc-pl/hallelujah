<script lang="ts" setup>
import { useOptionsStore } from '@/stores/options';
import type { PropType } from 'vue';
import type { ISongVerse } from '../model';

const options = useOptionsStore();

defineProps({
  verse: {
    type: Object as PropType<ISongVerse>,
    required: true
  }
});
</script>

<template>
  <table class="song-verse">
    <tr v-for="line in verse.lines"
      :key="line.uuid">
      <td v-if="options.showChords">{{ line.chord }}</td>
      <td>{{ line.text }}</td>
      
    </tr>
  </table>
</template>

<style lang="less">
.song-verse {
  width: calc(100% - 2 * var(--side-margin-v));
  margin: var(--side-margin-h) var(--side-margin-v);

  td {
    font-size: 110%;

    // &:first-child {
    //   width: 30%;
    //   white-space: nowrap;
    //   text-align: right;
    //   padding-right: 1rem;
    // }
  }
}
</style>
