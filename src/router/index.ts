import { createRouter, createWebHistory } from 'vue-router';

import { configure as configureSongs } from './songs';
import { configure as configurePlaylists } from './playlists';
import { configure as configureOptions } from './options';

import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
});

configureSongs(router);
configurePlaylists(router);
configureOptions(router);

export default router;
