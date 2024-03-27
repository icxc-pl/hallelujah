import { type Ref } from 'vue';
import { type Router } from 'vue-router';

import { storeToRefs } from 'pinia';
import { useStateStore } from '@/stores/state';

import SongsListView from '@/views/SongsListView.vue';
import SongView from '@/views/SongView.vue';

const songPathRegex = /\/song\/(?<songHash>[a-z0-9]+)/;
let _lastSongPath: Ref<string | null>;

function getLastSongPath() {
  if (_lastSongPath == null) {
    const state = useStateStore();
    const { lastSongPath } = storeToRefs(state);
    _lastSongPath = lastSongPath;
  }
  return _lastSongPath;
}

function addRoutes(router: Router) {
  router.addRoute({
    path: '/songs',
    name: 'songs',
    component: SongsListView
  });
  
  router.addRoute({
    path: '/song/:songHash',
    name: 'song',
    component: SongView
  });
}

function addGuards(router: Router) {
  router.beforeEach((to, from, next) => {
    const m = to.path.match(songPathRegex);
    if (m?.groups?.songHash) {
      getLastSongPath().value = to.path;
    }
    next();
  });
}

export function configure(router: Router) {
  addRoutes(router);
  addGuards(router);
}
