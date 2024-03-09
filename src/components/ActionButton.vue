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

const actionClass = computed(() => {
  return `action-button action-button-${props.color}`;
});

</script>

<template>
  <button :class="actionClass" type="button" :title="title">
    <component :is="iconComponent" />
  </button>
</template>

<style lang="less">
.action-button {
  display: block;
  border: 0;
  outline: 0;
  margin: 0.5rem;
  padding: 0;
  background: transparent;
  width: 2.5rem;
  height: 2.5rem;
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
    color: var(--c-positive-green);
  }

  &-red {
    color: var(--c-danger-red);
  }

  &-blue {
    color: blue;
  }
}

@media screen and (min-resolution: 2dppx) {
  .action-button {
    width: 2.1rem;
    height: 2.1rem;
  }
}

</style>
