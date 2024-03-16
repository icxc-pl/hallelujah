<script lang="ts" setup>
import { computed } from 'vue';
import * as entypo from '@iconify-prerendered/vue-entypo';

const props = defineProps({
  name: {
    type: String,
    required: true
  }
});

const iconComponent = computed(() => entypo['Icon' + props.name]);
</script>

<template>
  <component :is="iconComponent" />
</template>

<style lang="less">
</style>
