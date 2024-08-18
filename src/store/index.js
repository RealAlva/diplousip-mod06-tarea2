import { createStore } from 'vuex';
import contacts from './modules/contacts';
import communicationHistory from './modules/communicationHistory';

export default createStore({
  modules: {
    contacts,
    communicationHistory
  }
});
