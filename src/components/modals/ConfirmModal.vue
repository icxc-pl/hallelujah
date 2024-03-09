<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

defineProps({
  question: {
    type: String,
    required: true
  }
});

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'confirm'): void
}>()
</script>

<template>
  <VueFinalModal
    :click-to-close="false"
    :esc-to-close="false"
    overlay-transition="vfm-fade"
    content-transition="vfm-slide-down"
    @update:model-value="val => emit('update:modelValue', val)"
  >
    <p>{{ question }}</p>>
    <button class="mt-1 ml-auto px-2 border rounded-lg" @click="emit('confirm')">
      Confirm
    </button>
  </VueFinalModal>
</template>
