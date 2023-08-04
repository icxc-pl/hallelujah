<script setup lang="ts">
import { computed } from 'vue';
import MenuItem from './MenuItem.vue';
import { useSongsStore } from '@/stores/songs';

const { state } = useSongsStore();
const songLink = computed((): string => {
  if (state.id == null) {
    return '/';
  }
  return '/song/' + state.id;
});
</script>

<template>
  <nav>
    <ul>
      <MenuItem :link="songLink" text="Pieśń" icon="Note" />
      <MenuItem link="/list" text="Lista" icon="List" />
      <MenuItem link="/settings" text="Ustawienia" icon="Tools" />
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
