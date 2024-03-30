<script setup lang="ts">
import { useRwdStore } from '@/stores/rwd';

import CurrentView from './views/CurrentView.vue';
import MainMenu from './components/menu/MainMenu.vue';
import { ModalsContainer } from 'vue-final-modal';

const rwdStore = useRwdStore();

window.onresize = () => {
  rwdStore.refresh();
};
</script>

<template>
  <MainMenu />
  <CurrentView />
  <ModalsContainer />
</template>
