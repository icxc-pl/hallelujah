import { type Router } from 'vue-router';

import OptionsView from '@/views/OptionsView.vue';

function addRoutes(router: Router) {
  router.addRoute(    {
    path: '/options',
    name: 'options',
    component: OptionsView
  });
}

export function configure(router: Router) {
  addRoutes(router);
}
