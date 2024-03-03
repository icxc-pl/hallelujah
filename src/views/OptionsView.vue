<script lang="ts" setup>
import { computed } from 'vue';
import { storeToRefs } from "pinia";
import { useOptionsStore } from '@/stores/options';

import ViewLayout from '@/components/ViewLayout.vue';

const store = useOptionsStore();
const options = storeToRefs(store);

function b2s(val: boolean) {
  return val ? "1" : "0";
}

function s2b(val: string) {
  return val === "1";
}

const functionsShowChords = computed({
  get() {
    return b2s(options.showChords.value);
  },

  set(v: string) {
    options.showChords.value = s2b(v);
  }
});

const functionsShowLeaderTools = computed({
  get() {
    return b2s(options.showLeaderTools.value);
  },

  set(v: string) {
    options.showLeaderTools.value = s2b(v);
  }
});
</script>

<template>
  <ViewLayout title="Opcje">
    <template #content>
      <h2>Funkcje</h2>
      <ul>
        <li>
          <label for="function-show-chords">Akordy</label>
          <select id="function-show-chords" v-model="functionsShowChords">
            <option value="0">Ukryj</option>
            <option value="1">Pokaż</option>
          </select>
        </li>
        <li>
          <label for="function-show-leader-tools">Narzędzia prowadzącego</label>
          <select id="function-show-leader-tools" v-model="functionsShowLeaderTools">
            <option value="0">Ukryj</option>
            <option value="1">Pokaż</option>
          </select>
        </li>
      </ul>

    </template>
  </ViewLayout>
</template>

<style scoped lang="less">
  ul {
    margin: var(--side-margin-h) var(--side-margin-v);

    li {
      display: flex;
      align-items: center;
      padding: 0.25rem 0;

      label {
        font-size: 1rem;
        flex-grow: 1;
        margin-right: calc(var(--side-margin-v) / 2);
      }

      select {
        flex-shrink: 0;
      }
    }
  }
</style>
