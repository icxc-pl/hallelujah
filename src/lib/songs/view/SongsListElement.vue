<script lang="ts" setup>
import { computed, type PropType } from 'vue';
import { RouterLink } from 'vue-router';
import { type ISong } from '../model';

const props = defineProps({
  song: {
    type: Object as PropType<ISong>,
    required: true
  }
});

const link = computed((): string => {
  return '/song/' + props.song.id;
});

const shouldRenderMeta = computed((): boolean => {
  return props.song.meta.author != null;
});
</script>

<template>
  <li>
    <RouterLink :to="link">
      <strong>{{ song.title }}</strong>
      <dl v-if="shouldRenderMeta">
        <dt>Author</dt>
        <dd>{{ song.meta.author }}</dd>
      </dl>
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

    dl {
      color: var(--color-inferior-text);
      margin-block: 0;

      dt {
        position: absolute !important;
        height: 1px;
        width: 1px;
        overflow: hidden;
        clip: rect(1px, 1px, 1px, 1px);
      }
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
