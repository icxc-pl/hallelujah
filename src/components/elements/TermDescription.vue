<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  value: {
  }
});
</script>

<template>
  <template v-if="value">
    <dt>{{ name }}</dt>
    <dd>{{ value }}</dd>
  </template>
</template>

<style lang="less">
</style>
