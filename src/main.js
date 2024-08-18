import { createApp } from 'vue';
import App from './App.vue';
import store from './store';  // Importa la tienda de Vuex
import router from './router';

createApp(App)
  .use(store)  // Usa la tienda de Vuex en la aplicación
  .use(router)
  .mount('#app');
