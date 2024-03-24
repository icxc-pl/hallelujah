<script lang="ts" setup>
import { computed } from 'vue';
import EntypoIcon from './EntypoIcon.vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String
  }
});
</script>

<template>
  <div class="info-screen">
    <EntypoIcon :name="icon" :color="color" />
    <h1>{{ title }}</h1>
    <p v-if="text">{{ text }}</p>
  </div>
</template>

<style lang="less">
.info-screen {
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-inferior-text);

  h1 {
    margin-bottom: 0;
    font-size: 1.75rem;
  }

  p {
    font-size: 1.1rem;
  }

  svg {
    width: 4rem;
    height: 4rem;
    margin: 0 auto;
  }
}
</style>
