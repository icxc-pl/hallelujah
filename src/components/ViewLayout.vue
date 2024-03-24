<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const router = useRoute();

const props = defineProps({
  title: {
    type: String
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

const hasTitle = computed((): boolean => {
  return props.title != null;
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
  <div id="toolbar" :data-show-elements="shouldShow">
    <h1 v-if="hasTitle">{{ shouldShow ? props.title : "Ładowanie..." }}</h1>
    <slot name="toolbar"></slot>
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

  &[data-show-elements="false"] {
    .icon-button {
      visibility: hidden;
    }
  }

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

  form.search-input {
    flex-basis: 100%;
  }
}

#content {
  overflow: auto;

  &.content-loading {
    height: 100%;
    position: relative;

    @size: 3rem;

    &::after {
      content: '';
      position: absolute;
      top: calc(50% ~"-" @size/2);
      left: calc(50% ~"-" @size/2);
      width: @size;
      height: @size;
      border: 0.5rem solid var(--color-link);
      border-radius: 3px;
      opacity: 0.25;
      animation: spinner 3s infinite;
    }
  }
}

</style>
