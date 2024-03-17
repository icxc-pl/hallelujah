<script setup lang="ts">
import { type PropType } from 'vue';

import StandardModal from './StandardModal.vue';
import BasicButton from '../elements/BasicButton.vue';

const props = defineProps({
  question: {
    type: String,
    required: true
  },

  onConfirm: {
    type: Function as PropType<() => Promise<any>>,
    required: true
  },
  confirmButtonTitle: {
    type: String,
    default: 'Potwierdzam'
  },
  confirmButtonIcon: {
    type: String,
    default: 'Check'
  },
  confirmButtonColor: {
    type: String,
    default: 'green'
  }
});

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()

function confirm() {
  props.onConfirm().then(() => {
    emit('update:modelValue', false)
  }).catch((e: any) => {
    alert("Wystąpił błąd: " + e.message);
  });
}

</script>

<template>
  <StandardModal
    close-text="Anuluj"
    @update:model-value="val => emit('update:modelValue', val)">

    <p>
      {{ props.question  }}
    </p>

    <template #footer>
      <BasicButton
        :main="true"
        :title="props.confirmButtonTitle"
        :icon="props.confirmButtonIcon"
        :color="confirmButtonColor"
        @click.prevent="confirm" />
    </template>

  </StandardModal>
</template>
