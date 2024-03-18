<script lang="ts" setup>
import { type IPlaylist } from '../model';
import PlaylistsListElement from './PlaylistsListElement.vue';

const emit = defineEmits<{
  (e: 'itemupdated', playlist: IPlaylist): void
  (e: 'itemdeleted', playlist: IPlaylist): void
  (e: 'itemcreated', playlist: IPlaylist): void
}>();


defineProps({
  playlists: {
    type: Array<IPlaylist>,
    required: true
  }
});

function whenPlaylistUpdated(playlist: IPlaylist) {
  emit('itemupdated', playlist);
}

function whenPlaylistDeleted(playlist: IPlaylist) {
  emit('itemdeleted', playlist);
}

function whenPlaylistCreated(playlist: IPlaylist) {
  emit('itemcreated', playlist);
}

</script>

<template>
  <ul>
    <PlaylistsListElement v-for="playlist in playlists"
      :key="playlist.id"
      :playlist="playlist"
      @updated="whenPlaylistUpdated"
      @deleted="whenPlaylistDeleted"
      @created="whenPlaylistCreated" />
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
