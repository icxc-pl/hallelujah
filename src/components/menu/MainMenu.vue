<script lang="ts" setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import MenuItem from './MenuItem.vue';
import { useStateStore } from '@/stores/state';

const state = useStateStore();
const { currentSongIndex } = storeToRefs(state);

const songLink = computed((): string => {
  if (currentSongIndex.value == null) {
    return '/';
  }
  return '/song/' + currentSongIndex.value;
});
</script>

<template>
  <nav>
    <ul>
      <MenuItem :link="songLink" text="Pieśń" icon="Note" />
      <MenuItem link="/list" text="Lista" icon="List" />
      <MenuItem link="/options" text="Opcje" icon="DotsThreeHorizontal" />
    </ul>
  </nav>
</template>

<style lang="less" scoped>
nav {
  grid-area: navigation;
  background: var(--navigation-background);
  position: relative;

  ul {
    display: flex nowrap;
    flex-flow: column;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
