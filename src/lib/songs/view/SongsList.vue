<script lang="ts" setup>
import "@/assets/components/SongsList.less";

import { type ISong } from '../model';
import SongsListElement from './SongsListElement.vue';

defineProps({
  songs: {
    type: Array<ISong>,
    required: true
  },
  searchingActive: {
    type: Boolean,
    default: false
  },
  searchingPhrase: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <ul class="songs-list">
    <SongsListElement v-for="song in songs"
      :key="song.hash"
      :song="song"
      :searching-active="searchingActive"
      :searching-phrase="searchingPhrase" />
  </ul>
</template>

<style lang="less">
</style>
