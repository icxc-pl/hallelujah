<script lang="ts">
import { defineComponent } from 'vue';
import { Song } from '../model/Song';
import SongsListElement from './SongsListElement.vue';
import { normalizeText } from '@/common/helpers';


export default defineComponent({
  components: {
    SongsListElement
  },

  props: {
    songs: {
      type: Array<Song>,
      required: true
    },

    search: {
      type: String,
      default: ""
    }
  },

  computed: {
    normalizedSearch(): string {
      return normalizeText(this.search);
    }
  },

  methods: {
    shouldShowSong(song: Song) {
      if (this.search == "") {
        return true;
      }

      return song.normalizedTitle.includes(this.normalizedSearch);
    }
  }
});
</script>

<template>
  <ul>
    <SongsListElement v-for="song in songs"
      :key="song.uuid"
      :song="song"
      v-show="shouldShowSong(song)" />
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
