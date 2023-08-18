<script lang="ts" setup>
import { useRoute } from 'vue-router';
import SongVersesList from '@/songs/view/SongVersesList.vue';
import { useSongsStore } from '@/stores/songs';
import { storeToRefs } from 'pinia';

const store = useSongsStore();
const { id, current } = storeToRefs(store);

const route = useRoute();

function getCurrentIdFromUrl() {
  const pid = route.params['id'] as string;
  const id = parseInt(pid);
  if (isNaN(id)) {
    return null;
  }
  return id;
}

const idFromUrl = getCurrentIdFromUrl();
if (id.value != idFromUrl) {
  id.value = idFromUrl;
}

</script>

<template>
  <article v-if="current">
    <h1>{{ current.title }}</h1>
    <SongVersesList :verses="current.verses" />
  </article>
</template>

<style lang="less">
  article {
    overflow: auto;

    section {
      margin: var(--side-margin-h) var(--side-margin-v);

      p {
        font-size: 110%;
      }
    }
  }
</style>
