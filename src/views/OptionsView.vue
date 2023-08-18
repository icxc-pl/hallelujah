<script lang="ts" setup>
import { computed } from 'vue';
import { useOptionsStore } from '@/stores/options';

const { functions } = useOptionsStore();

const functionsShowChords = computed({
  get() {
    return functions.showChords ? "1" : "0";
  },

  set(v: string) {
    functions.showChords = v === "1";
  }
});

const functionsShowLeaderTools = computed({
  get() {
    return functions.showLeaderTools ? "1" : "0";
  },

  set(v: string) {
    functions.showLeaderTools = v === "1";
  }
});
</script>

<template>
  <div>
    <h1>Opcje</h1>

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

  </div>
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
