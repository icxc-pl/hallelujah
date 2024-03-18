<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const router = useRoute();

const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  loadingEnabled: {
    type: Boolean,
    default: false
  },
  loadingState: {
    type: Boolean,
    default: false
  }
});

const shouldShow = computed((): boolean => {
  return !props.loadingEnabled || !props.loadingState;
});

const viewTitle = computed((): string => {
  return shouldShow.value ? props.title : "Ładowanie...";
});

const contentClass = computed((): string[] => {
  const classes = [];
  
  // Add to classes current page name from vue router
  const currentRouteName = router.name;
  if (currentRouteName) {
    classes.push(`content-view-${currentRouteName.toString()}`);
  }

  // Add loading class
  if (props.loadingEnabled && props.loadingState) {
    classes.push('content-loading');
  }

  return classes;
});

</script>

<template>
  <div id="toolbar">
    <h1>{{ viewTitle }}</h1>
    <slot v-if="shouldShow" name="toolbar"></slot>
  </div>
  <div id="content" :class="contentClass">
    <slot v-if="shouldShow" name="content"></slot>
  </div>
</template>

<style lang="less">
#toolbar {
  background: #f7f7f7;
  display: flex;
  justify-content: flex-end;

  & > * {
    flex-shrink: 0;
  }

  & > h1 {
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-basis: 100%;
    flex-shrink: 1;
  }

  .icon-button {
    margin: 0;
    width: 3rem;
    height: 3rem;
  }
}

#content {
  overflow: auto;

  &.is-loading {
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
