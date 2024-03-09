import './assets/main.css';

import { createApp } from 'vue';
import { createVfm } from 'vue-final-modal';
import App from './App.vue';
import router from './router';

import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPersist);

const vfm = createVfm()

app.use(pinia);
app.use(router);
app.use(vfm);

app.mount('#app');
