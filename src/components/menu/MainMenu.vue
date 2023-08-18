<script lang="ts" setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import MenuItem from './MenuItem.vue';
import { useSongsStore } from '@/stores/songs';

const songs = useSongsStore();
const { id } = storeToRefs(songs);

const songLink = computed((): string => {
  if (id.value == null) {
    return '/';
  }
  return '/song/' + id.value;
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
  background: linear-gradient(
    0deg,
    var(--navigation-background) 92%,
    var(--navigation-background-shadow) 100%
  );
  position: relative;

  ul {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: stretch;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
