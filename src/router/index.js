import { createRouter, createWebHistory } from 'vue-router';
import ContactsView from '../views/ContactsView.vue';
import CommunicationHistoryView from '../views/CommunicationHistoryView.vue';
import HomeView from '../views/HomeView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/contacts', component: ContactsView },
  { path: '/communication-history', component: CommunicationHistoryView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
