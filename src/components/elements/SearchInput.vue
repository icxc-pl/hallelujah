<script lang="ts" setup>
import { ref, watch } from 'vue';
import { v4 as uuid } from 'uuid';
import { IconMagnifyingGlass } from '@iconify-prerendered/vue-entypo';
import { filoTimeGate } from '@/common/time-gate/index';
import IconButton from './IconButton.vue';

let lastPhrase = "";
const elementId = ref("search-input-" + uuid());
const phrase = ref("");
const showErase = ref(false);

const emit = defineEmits<{
  (e: 'input', phrase: string): void
}>()

const gate = filoTimeGate(500, (phrase: string) => {
  if (lastPhrase == phrase) {
    return;
  }
  lastPhrase = phrase;

  emit("input", phrase);
});

function erase() {
  phrase.value = "";
}

watch(phrase, (phrase) => {
  showErase.value = phrase.length > 0;
  gate(phrase);
});
</script>

<template>
  <form class="search-input" @submit.prevent>
    <label :for="elementId" aria-label="Szukaj">
      <IconMagnifyingGlass />
    </label>
    <input type="text" v-model="phrase" placeholder="Czego szukasz?" :id="elementId"/>
    <IconButton v-show="showErase" icon="Erase" title="Wykasuj" @click="erase" />
  </form>
</template>

<style lang="less">
form.search-input {
  position: relative;

  label {
    svg {
      width: 1rem;
      height: 1rem;
      position: absolute;
      top: 1rem;
      left: 1rem;
    }
  }

  input[type="text"] {
    padding: 1rem 3rem;
    border: 0;
    font-size: 1rem;
    background: transparent;
    line-height: 100%;
    display: block;
    width: 100%;
  }

  & > button.icon-button {
    position: absolute;
    top: 0;
    right: 0;

    & > svg {
      padding: 0.85rem;
    }
  }
}
</style>
