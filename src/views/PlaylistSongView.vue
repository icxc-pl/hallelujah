<script lang="ts" setup>
import { ref, computed, onActivated, shallowReactive } from 'vue';
import { useRoute } from 'vue-router';

import ViewLayout from '@/components/ViewLayout.vue';

import { DataContainer } from '@/lib/vue/DataContainer';

import { getSong } from '@/lib/client';
import { type ISong } from '@/lib/songs/model';
import { type IPlaylist } from '@/lib/playlists/model';
import SongDetailsMenuButton from '@/lib/songs/view/SongDetailsMenuButton.vue';
import SongDetails from '@/lib/songs/view/SongDetails.vue';

const route = useRoute();

const songHash = ref("");
const container: DataContainer = shallowReactive(new DataContainer());

/**
 * When the view is activated, load the song from the server
 */
onActivated(() => {
  songHash.value = route.params.songHash as string;
  
  if (songHash.value == null) {
    container.setData(null)
    return;
  }

  getSong(songHash.value).then((data) => {
    container.setData(data);
  });
});

/**
 * Compute Song
 */
const song = computed((): ISong | null => {
  return container.data as ISong;
});

/**
 * Compute Song Title
 */
const songTitle = computed((): string => {
  return container.loading || song.value == null ? "" : song.value.title;
});

</script>

<template>
  <ViewLayout :title="songTitle"
    :loading-enabled="true"
    :loading-state="container.loading">

    <template #toolbar>
      <SongDetailsMenuButton :song="song" />
    </template>

    <template #content>
      <SongDetails :song="song" />
    </template>

  </ViewLayout>
</template>

<style lang="less">

</style>
