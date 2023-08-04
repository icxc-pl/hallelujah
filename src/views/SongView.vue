<script lang="ts">
import { defineComponent } from 'vue';
import { Song } from '@/songs/model/Song';
import SongVersesList from '@/songs/view/SongVersesList.vue';
import { useSongsStore } from '@/stores/songs';
import { useRoute } from 'vue-router';

export default defineComponent({
  components: {
    SongVersesList
  },

  data() {
    return {
      song: null as null | Song
    }
  },

  created() {
    const { setCurrent, state } = useSongsStore();
    const route = useRoute()
    setCurrent(route.params['id'] as string);
    this.song = state.song;
  }

});
</script>

<template>
  <article v-if="song">
    <h1>{{ song.title }}</h1>
    <SongVersesList :verses="song.verses" />
  </article>
</template>

<style lang="less">
  article {
    overflow: auto;

    h1, p {
      margin: var(--side-margin-h) var(--side-margin-v);
    }

    h1 {
      line-height: 1em;
    }
  }
</style>
