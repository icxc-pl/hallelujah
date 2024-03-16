<script lang="ts" setup>
import { computed } from 'vue';
import EntypoIcon from './EntypoIcon.vue';

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
    type: String
  }
});

const _class = computed(() => {
  const _class = ["icon-button"];

  if (props.color != null) {
    _class.push(`icon-button-${props.color}`);
  }

  return _class;
});

</script>

<template>
  <button :class="_class" type="button" :title="title">
    <EntypoIcon :name="icon" />
  </button>
</template>

<style lang="less">
.icon-button {
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
  .icon-button {
    width: 2.1rem;
    height: 2.1rem;
  }
}

</style>
