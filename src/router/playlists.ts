import { type Router } from 'vue-router';

import PlaylistsView from '@/views/PlaylistsView.vue';
import PlaylistView from '@/views/PlaylistView.vue';
import PlaylistSongView from '@/views/PlaylistSongView.vue';

function addRoutes(router: Router) {
  router.addRoute({
    path: '/playlists',
    name: 'playlists',
    component: PlaylistsView
  });

  router.addRoute({
    path: '/playlist/:playlistId',
    name: 'playlist',
    component: PlaylistView
  });
  router.addRoute({

    path: '/playlist/:playlistId/song/:songHash',
    name: 'playlistSong',
    component: PlaylistSongView
  });
}

export function configure(router: Router) {
  addRoutes(router);
}
