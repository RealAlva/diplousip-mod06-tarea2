import contactService from '../services/contactService';

export default {
  namespaced: true,
  state: {
    contacts: [],
  },
  getters: {
    filteredContacts: (state) => (query) => {
      return state.contacts.filter(contact =>
        contact.name.toLowerCase().includes(query.toLowerCase())
      );
    },
  },
  actions: {
    async fetchContacts({ commit }) {
      const contacts = await contactService.getAll();
      commit('setContacts', contacts);
    },
    async addContact({ commit }, contact) {
      const newContact = await contactService.create(contact);
      commit('addContact', newContact);
    },
    async updateContact({ commit }, contact) {
      const updatedContact = await contactService.update(contact);
      commit('updateContact', updatedContact);
    },
    async deleteContact({ commit }, id) {
      await contactService.delete(id);
      commit('deleteContact', id);
    },
  },
  mutations: {
    setContacts(state, contacts) {
      state.contacts = contacts;
    },
    addContact(state, contact) {
      state.contacts.push(contact);
    },
    updateContact(state, contact) {
      const index = state.contacts.findIndex(c => c.id === contact.id);
      if (index !== -1) {
        state.contacts.splice(index, 1, contact);
      }
    },
    deleteContact(state, id) {
      state.contacts = state.contacts.filter(contact => contact.id !== id);
    },
  },
};
