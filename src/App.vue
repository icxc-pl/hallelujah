<script setup lang="ts">
import CurrentView from './views/CurrentView.vue';
import MainMenu from './components/menu/MainMenu.vue';
import { ModalsContainer } from 'vue-final-modal';
</script>

<template>
  <MainMenu />
  <CurrentView />
  <ModalsContainer />
</template>
