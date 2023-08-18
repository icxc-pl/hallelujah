<script lang="ts">
/**
 * vue-toggles
 * @author Julian <https://github.com/juliandreas>
 * @license MIT
 * @link https://github.com/juliandreas/vue-toggles
 * Modified by marverix to work with Vue.js 3 + TypeScript
 */

import { defineComponent } from 'vue';

export default defineComponent({

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    checkedText: {
      type: String,
      default: null,
    },
    uncheckedText: {
      type: String,
      default: null,
    },
    id: {
      type: String,
      default: null
    },
    width: {
      type: String,
      default: '3rem',
    },
    height: {
      type: String,
      default: '1.5rem',
    },
    uncheckedBg: {
      type: String,
      default: '#939393',
    },
    checkedBg: {
      type: String,
      default: 'var(--color-link)',
    },
    dotColor: {
      type: String,
      default: '#fff',
    },
    fontSize: {
      type: String,
      default: '0.75em',
    },
    checkedColor: {
      type: String,
      default: '#fff',
    },
    uncheckedColor: {
      type: String,
      default: '#fff',
    },
    fontWeight: {
      type: String,
      default: 'normal',
    },
  },

  emits: ['update:modelValue'],

  computed: {

    value: {
      get() {
        return this.modelValue;
      },

      set(value: boolean) {
        this.$emit('update:modelValue', value)
      }
    },

    bgStyle() {
      return {
        width: this.width,
        height: this.height,
        background: this.value ? this.checkedBg : this.uncheckedBg,
        opacity: this.disabled ? '0.5' : '1',
        cursor: !this.disabled ? 'pointer' : 'not-allowed',
      };
    },

    dotStyle() {
      const h = `calc(${this.height} - 8px)`;

      return {
        background: this.dotColor,
        width: h,
        height: h,
        'min-width': h,
        'min-height': h,
        'margin-left': this.value !== this.reverse ? `calc(${this.width} - ${this.height} + 3px)` : '5px'
      };
    },

    textStyle() {
      const opAuto = 'auto';
      const opCalc = `calc(${this.height} - 3px)`

      return {
        'font-weight': this.fontWeight,
        'font-size': this.fontSize,
        color: this.value && !this.disabled ? this.checkedColor : this.uncheckedColor,
        right: !this.value ? opCalc : opAuto,
        left: this.value === this.reverse ? opCalc : opAuto
      };
    }

  },

  methods: {
    toggle() {
      if (this.disabled) {
        return;
      }
      
      this.value = !this.value;
    }
  }

});
</script>

<template>
  <span
    class="vue-toggles"
    :style="bgStyle"
    role="switch"
    tabindex="0"
    :aria-checked="value ? 'true' : 'false'"
    :aria-readonly="disabled ? 'true' : 'false'"
    @click="toggle"
    @keyup.enter.prevent="toggle"
    @keyup.space.prevent="toggle"
  >
    <input type="checkbox" :id="id" v-model="value" />
    <span aria-hidden="true" :style="dotStyle" class="dot">
      <span v-show="checkedText && value" :style="textStyle" class="text">
        {{ checkedText }}
      </span>

      <span v-show="uncheckedText && !value" :style="textStyle" class="text">
        {{ uncheckedText }}
      </span>
    </span>
  </span>
</template>

<style>
.vue-toggles {
  display: flex;
  align-items: center;
  border-radius: 9999px;
  overflow: hidden;
  transition: background-color ease 0.2s, width ease 0.2s, height ease 0.2s;
  flex-shrink: 0;
}

.vue-toggles .dot {
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 9999px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: margin ease 0.2s;
}

.vue-toggles .text {
  position: absolute;
  font-family: inherit;
  user-select: none;
  white-space: nowrap;
}

.vue-toggles input[type="checkbox"] {
  display: none;
}

@media all and (-ms-high-contrast: none) {
  .vue-toggles .text {
    /* IE11 fix */
    top: 50%;
    transform: translateY(-50%);
  }
}

@media (prefers-reduced-motion) {
  /* disable animations if user have a reduced motion setting */
  .vue-toggles,
  .vue-toggles *,
  .vue-toggles *::before,
  .vue-toggles *::after {
    animation: none !important;
    transition: none !important;
    transition-duration: none !important;
  }
}
</style>
