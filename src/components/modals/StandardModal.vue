<script setup lang="ts">
import { ref, computed, type TransitionProps } from 'vue';
import { VueFinalModal } from 'vue-final-modal'

const props = defineProps({
  title: {
    type: String,
    required: false
  },
  closeText: {
    type: String,
    default: 'OK'
  },
  extraWindowClass: {
    type: String
  }
});

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()

const ModalWindowTransition = ref<TransitionProps>({
  name: 'modal-window',
  css: true
});

const contentClass = computed(() => {
  const classes = ['modal-window'];
  if (typeof props.extraWindowClass == "string" && props.extraWindowClass.length > 0) {
    classes.push(props.extraWindowClass);
  }
  return classes;
});

</script>

<template>
  <VueFinalModal
    class="modal"
    :click-to-close="false"
    :esc-to-close="false"
    overlay-transition="vfm-fade"
    overlay-class="modal-backdrop"
    :content-transition="ModalWindowTransition"
    :content-class="contentClass"
    @update:model-value="val => emit('update:modelValue', val)">

    <div v-if="props.title" class="modal-header">
      <h1>{{ props.title }}</h1>
    </div>

    <div class="modal-content">
      <slot></slot>
    </div>

    <div class="modal-footer">
      <slot name="footer"></slot>
      <button @click="$emit('update:modelValue', false)">{{ props.closeText }}</button>
    </div>

  </VueFinalModal>
</template>
