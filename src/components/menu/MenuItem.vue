<script lang="ts" setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import * as entypo from '@iconify-prerendered/vue-entypo';

const props = defineProps({
  link: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

const iconComponent = computed(() => entypo['Icon' + props.icon]);
</script>

<template>
  <li>
    <RouterLink :to="link" active-class="active">
      <component :is="iconComponent" />
      <span>{{ text }}</span>
    </RouterLink>
  </li>
</template>

<style lang="less" scoped>
li {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 6.5rem;
  text-align: center;

  a {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;

    &:link,
    &:visited {
      color: var(--navigation-button-text);
    }

    &.active {
      background: var(--navigation-button-active-background);
      color: var(--navigation-button-active-text);
    }

    svg {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      margin-top: 0.75rem;
    }

    span {
      display: block;
      width: 100%;
    }
  }
}
</style>
