<script lang="ts" setup>
import '@/assets/components/SongsList.less';

import { type PropType } from 'vue';

import { type IPlaylist, type IPlaylistSong } from '@/lib/playlists/model';
import PlaylistSongsListElement from './PlaylistSongsListElement.vue';

defineProps({
  playlist: {
    type: Object as PropType<IPlaylist>,
    required: true
  },
  songs: {
    type: Array as PropType<IPlaylistSong[]>,
    required: true
  },
  allowRemove: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits<{
  (e: 'itemremoved', song: IPlaylistSong): void
}>();

function whenSongRemoved(song: IPlaylistSong) {
  emit('itemremoved', song);
}
</script>

<template>
  <ul class="playlist-songs-list songs-list">
    <PlaylistSongsListElement v-for="song in songs"
      :key="song.hash"
      :playlist="playlist"
      :song="song"
      :allow-remove="allowRemove"
      @removed="whenSongRemoved" />
  </ul>
</template>

<style lang="less">
</style>
