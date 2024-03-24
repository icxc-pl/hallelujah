<script lang="ts" setup>
import { computed } from 'vue';
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

const showChordsOnLeft = computed(() => options.showChords === -1);
const showChordsOnRight = computed(() => options.showChords === 1);

</script>

<template>
  <table class="song-verse">
    <tr v-for="line in verse.lines"
      :key="line.uuid">
      <td class="chord" v-if="showChordsOnLeft">{{ line.chord }}</td>
      <td>{{ line.text }}</td>
      <td class="chord" v-if="showChordsOnRight">{{ line.chord }}</td>
    </tr>
  </table>
</template>

<style lang="less">
.song-verse {
  width: calc(100% - 2 * var(--side-margin-v));
  margin: var(--side-margin-h) var(--side-margin-v);

  td {
    font-size: 110%;

   &.chord {
    width: 20%;
    min-width: 7rem;
    color: var(--color-inferior-text);

    &:first-child {
      text-align: right;
      padding-right: 1rem;
    }

    &:last-child {
      text-align: left;
      padding-left: 1rem;
    }
   }
  }
}
</style>
