<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  loadingEnabled: {
    type: Boolean,
    default: false
  },
  loadingState: {
    type: Boolean,
    default: false
  }
});

const contentClass = computed((): string[] => {
  const classes = ['content'];
  if (props.loadingEnabled && props.loadingState) {
    classes.push('content-loading');
  }
  return classes;
});

</script>

<template>
  <div class="toolbar">
    <slot name="toolbar"></slot>
  </div>
  <div :class="contentClass">
    <template v-if="loadingEnabled">
      <slot v-if="!loadingState" name="content"></slot>
    </template>
    <template v-else>
      <slot name="content"></slot>
    </template>
  </div>
</template>

<style lang="less">
.toolbar {
  display: flex;
}

.content {

  &-loading {
    height: 100%;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 3rem;
      height: 3rem;
      border: 0.5rem solid var(--color-link);
      border-radius: 3px;
      animation: spinner 3s infinite;
    }
  }

}
</style>
