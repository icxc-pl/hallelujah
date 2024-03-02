<script lang="ts" setup>
import { computed, type PropType } from 'vue';
import { RouterLink } from 'vue-router';
import { type IPlaylist } from '../model/IPlaylist';


const props = defineProps({
  playlist: {
    type: Object as PropType<IPlaylist>,
    required: true
  }
});

const link = computed((): string => {
  return '/playlist/' + props.playlist.id;
});

</script>

<template>
  <li>
    <RouterLink :to="link">
      <strong>{{ playlist.title }}</strong>
    </RouterLink>
  </li>
</template>

<style lang="less" scoped>
li {
  display: block;
  overflow: auto;

  a {
    display: block;
    color: var(--color-link);
    text-decoration: none;
    margin: var(--side-margin-h) var(--side-margin-v);
    position: relative;

    strong {
      display: block;
      font-size: 1.1em;
    }

    &::after {
      display: block;
      content: '';
      border-top: 2px solid var(--separator-color);
      position: relative;
      bottom: calc(-1 * var(--side-margin-h));
    }
  }
}
</style>
