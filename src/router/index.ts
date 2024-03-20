import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import SongView from '@/views/SongView.vue';
import SongsListView from '@/views/SongsListView.vue';
import PlaylistsView from '@/views/PlaylistsView.vue';
import OptionsView from '@/views/OptionsView.vue';
import PlaylistView from '@/views/PlaylistView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/song/:hash',
      name: 'song',
      component: SongView
    },
    {
      path: '/songs',
      name: 'songs',
      component: SongsListView
    },
    {
      path: '/playlist/:id',
      name: 'playlist',
      component: PlaylistView
    },
    {
      path: '/playlists',
      name: 'playlists',
      component: PlaylistsView
    },
    {
      path: '/options',
      name: 'options',
      component: OptionsView
    }
  ]
});

export default router;
