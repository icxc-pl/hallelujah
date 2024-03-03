<script lang="ts" setup>
import { computed, onActivated, shallowReactive } from 'vue';
import { useRoute } from 'vue-router';
import SongVersesList from '@/lib/songs/view/SongVersesList.vue';
import { useStateStore } from '@/stores/state';
import { storeToRefs } from 'pinia';
import { getSong } from '@/lib/client';
import type { ISong } from '@/lib/songs/model/ISong';
import { DataContainer } from '@/lib/vue/DataContainer';

import ViewLayout from '@/components/ViewLayout.vue';

const state = useStateStore();
const { currentSongIndex } = storeToRefs(state);

const container: DataContainer = shallowReactive(new DataContainer());

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
    container.setData(data);
  });

  if (currentSongIndex.value != idFromUrl) {
    currentSongIndex.value = idFromUrl;
  }
});

const songTitle = computed((): string => {
  return container.loading ? "" : (container.data as ISong).title;
});
</script>

<template>
  <ViewLayout :title="songTitle"
    :loading-enabled="true"
    :loading-state="container.loading">
    <template #content>
      <SongVersesList
        :verses="(container.data as ISong).verses" />
    </template>

  </ViewLayout>
</template>

<style lang="less">

</style>
