<script lang="ts" setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import MenuItem from './MenuItem.vue';
import { useStateStore } from '@/stores/state';

const state = useStateStore();
const { lastSongPath } = storeToRefs(state);

const songLink = computed((): string => {
  return lastSongPath.value == null ? '/' : lastSongPath.value;
});
</script>

<template>
  <nav id="main-menu">
    <ul>
      <MenuItem :link="songLink" text="Pieśń" icon="Note" />
      <MenuItem link="/songs" text="Przeglądaj" icon="List" />
      <MenuItem link="/playlists" text="Playlisty" icon="FolderMusic" active-match-path="\/playlist(?:s|\/[0-9]+)?$" />
      <MenuItem link="/options" text="Opcje" icon="DotsThreeHorizontal" />
    </ul>
  </nav>
</template>

<style lang="less">
#main-menu {
  grid-area: navigation;
  background: var(--navigation-background);
  position: relative;
  font-size: 0.9rem;

  & > ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
}

@media screen and (orientation: landscape) {
  #main-menu > ul {
    flex-flow: column nowrap;
    justify-content: flex-start;
  }
}

@media screen and (orientation: portrait) {
  #main-menu > ul {
    flex-flow: row nowrap;
    justify-content: center;
  }
}
</style>
