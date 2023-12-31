import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SongView from '../views/SongView.vue';
import SongsListView from '../views/SongsListView.vue';
import OptionsView from '../views/OptionsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/song/:id',
      name: 'song',
      component: SongView
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    },
    {
      path: '/list',
      name: 'songs-list',
      component: SongsListView
    },
    {
      path: '/options',
      name: 'options',
      component: OptionsView
    }
  ]
});

export default router;
