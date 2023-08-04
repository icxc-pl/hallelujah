<script lang="ts">
import { defineComponent } from 'vue';
import { IconMagnifyingGlass } from '@iconify-prerendered/vue-entypo';
import { filoTimeGate } from '@/common/time-gate/index';

let gate: Function
let lastPhrase = "";

export default defineComponent({
  components: {
    IconMagnifyingGlass
  },

  data() {
    return {
      phrase: "" as string
    }
  },

  emits: ["input"],

  watch: {
    phrase: {
      handler() {
        gate(this.phrase);
      }
    }
  },

  created() {
    gate = filoTimeGate(500, (phrase: string) => {
      if (lastPhrase == phrase) {
        return;
      }
      lastPhrase = phrase;

      this.$emit("input", phrase);
    });
   }
});
</script>

<template>
  <form @submit.prevent>
    <label for="search-input" aria-label="Szukaj">
      <IconMagnifyingGlass />
    </label>
    <input type="text" v-model="phrase" placeholder="Czego szukasz?" id="search-input"/>
  </form>
</template>

<style lang="less" scoped>
form {
  background: white;
  position: relative;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.45);

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
    padding: 1rem 1rem 1rem 3rem;
    outline: 1px solid white;
    border: 0;
    font-size: 1rem;
    background: transparent;
    line-height: 100%;
    display: block;
    width: 100%;
  }
}
</style>
