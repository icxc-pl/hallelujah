<script setup lang="ts">
import { ref, reactive, type PropType, onMounted } from 'vue';

import { DataContainer } from '@/lib/vue/DataContainer';

import StandardModal from './StandardModal.vue';
import BasicButton from '../elements/BasicButton.vue';
import { SelectOption } from '@/lib/vue/SelectOption';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  fetchOptions: {
    type: Function as PropType<() => Promise<SelectOption[]>>,
    required: true
  },

  onSubmit: {
    type: Function as PropType<(val: any) => Promise<any>>,
    required: true
  },
  submitButtonTitle: {
    type: String,
    default: 'OK'
  },
  submitButtonIcon: {
    type: String,
    default: 'Check'
  },
  submitButtonColor: {
    type: String,
    default: 'green'
  }
});

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()

const val = ref('');
const container: DataContainer = reactive(new DataContainer());

function submit() {
  props.onSubmit(val.value.trim()).then(() => {
    emit('update:modelValue', false)
  }).catch((e: any) => {
    alert("Wystąpił błąd: " + e.message);
  });
}

onMounted(async () => {
  let options: SelectOption[] = [];
  try {
    options = await props.fetchOptions();
  } catch (e) {
    // ignored
  }

  container.setData(options);

  if (options.length > 0) {
    val.value = options[0].value;
  }

});

</script>

<template>
  <StandardModal
    close-text="Anuluj"
    @update:model-value="val => emit('update:modelValue', val)">

    <p class="input-container">
      <label for="input-select">{{ props.title }}</label>
      <select id="input-select" v-model="val">
        <option v-for="option in (container.data as SelectOption[])"
          :key="option.label"
          :value="option.value"
          :selected="option.selected"
          :disabled="option.disabled">{{ option.label }}</option>
      </select>
    </p>

    <template #footer>
      <BasicButton
        :main="true"
        :title="props.submitButtonTitle"
        :icon="props.submitButtonIcon"
        :color="submitButtonColor"
        @click.prevent="submit" />
    </template>

  </StandardModal>
</template>
