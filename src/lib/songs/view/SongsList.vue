<script lang="ts" setup>
import { type ISong } from '../model';
import SongsListElement from './SongsListElement.vue';

defineProps({
  songs: {
    type: Array<ISong>,
    required: true
  }
});
</script>

<template>
  <ul>
    <SongsListElement v-for="song in songs"
      :key="song.hash"
      :song="song" />
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
