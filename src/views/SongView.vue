<script lang="ts" setup>
import { onActivated, shallowReactive } from 'vue';
import { useRoute } from 'vue-router';
import SongVersesList from '@/songs/view/SongVersesList.vue';
import { useStateStore } from '@/stores/state';
import { storeToRefs } from 'pinia';
import { getSong } from '@/client';
import type { ISong } from '@/songs/model/ISong';

const state = useStateStore();
const { currentSongIndex } = storeToRefs(state);

const current = shallowReactive({
  id: null as number | null,
  song: null as ISong | null, 
});

const route = useRoute();

function getCurrentIdFromUrl() {
  const pid = route.params['id'] as string;
  const id = parseInt(pid);
  if (isNaN(id)) {
    return null;
  }
  return id;
}

onActivated(() => {
  const idFromUrl = getCurrentIdFromUrl();
  
  if (idFromUrl === null) {
    return;
  }

  getSong(idFromUrl).then((data) => {
    current.song = data;
  });

  // if (currentSongIndex.value != idFromUrl) {
  //   currentSongIndex.value = idFromUrl;
  // }
});
</script>

<template>
  <article>
    <h1>{{ current.song ? current.song.title : "Ładuję..." }}</h1>
    <SongVersesList v-if="current.song"
      :verses="current.song.verses" />
  </article>
</template>

<style lang="less">
  article {
    overflow: auto;

    table {
      width: calc(100% - 2 * var(--side-margin-v));
      margin: var(--side-margin-h) var(--side-margin-v);

      td {
        font-size: 110%;
      }
    }
  }
</style>
