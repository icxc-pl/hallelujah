<script lang="ts" setup>
import { type IPlaylist } from '../model/IPlaylist';
import PlaylistsListElement from './PlaylistsListElement.vue';

defineProps({
  playlists: {
    type: Array<IPlaylist>,
    required: true
  }
});
</script>

<template>
  <ul>
    <PlaylistsListElement v-for="playlist in playlists"
      :key="playlist.uuid"
      :playlist="playlist" />
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
