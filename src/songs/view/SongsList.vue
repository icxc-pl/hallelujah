<script lang="ts" setup>
import { computed } from 'vue';
import { Song } from '../model/Song';
import SongsListElement from './SongsListElement.vue';
import { normalizeText } from '@/common/helpers';

const props = defineProps({
  songs: {
    type: Array<Song>,
    required: true
  },

  search: {
    type: String,
    default: ""
  }
});

const normalizedSearch = computed((): string => {
  return normalizeText(props.search);
});

function shouldShowSong(song: Song) {
  if (props.search == "") {
    return true;
  }

  return song.normalizedTitle.includes(normalizedSearch.value);
}
</script>

<template>
  <ul>
    <SongsListElement v-for="song in songs"
      :key="song.uuid"
      :song="song"
      v-show="shouldShowSong(song)" />
  </ul>
</template>

<style lang="less">
  ul {
    overflow: auto;
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
