<script lang="ts" setup>
import { computed } from 'vue';
import * as entypo from '@iconify-prerendered/vue-entypo';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
});

const iconComponent = computed(() => entypo['Icon' + props.icon]);

const toolbarClass = computed(() => {
  return `toolbar-button toolbar-button-${props.color}`;
});

</script>

<template>
  <button :class="toolbarClass" type="button" :title="title">
    <component :is="iconComponent" />
  </button>
</template>

<style lang="less">
.toolbar-button {
  display: block;
  border: 0;
  outline: 0;
  margin: 0;
  padding: 0;
  background: transparent;
  width: 3rem;
  height: 3rem;
  cursor: pointer;

  &:link,
  &:visited {
    color: var(--navigation-button-text);
  }

  &.active {
    background: var(--navigation-button-active-background);
    color: var(--navigation-button-active-text);
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0.45rem;
  }

  &-green {
    color: green;
  }
}

</style>
