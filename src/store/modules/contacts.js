import axios from 'axios';

const state = {
  contacts: []  // Debe ser un array inicialmente
};

const getters = {
  filteredContacts: (state) => (searchQuery) => {
    if (!searchQuery) return state.contacts;
    return state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
};

const actions = {
  async fetchContacts({ commit }) {
    try {
      const response = await axios.get('http://localhost:3000/contacts');
      commit('setContacts', response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  },
  async addContact({ commit }, contact) {
    // Validar que los campos no estén vacíos y que el ID sea numérico
    if (!contact.name || !contact.email || isNaN(contact.id)) {
      console.error('Error: Campos vacíos o ID inválido.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/contacts', contact);
      commit('addContact', response.data);
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  },
  async updateContact({ commit }, contact) {
    try {
      const response = await axios.put(`http://localhost:3000/contacts/${contact.id}`, contact);
      commit('updateContact', response.data);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  },
  async deleteContact({ commit }, id) {
    try {
      await axios.delete(`http://localhost:3000/contacts/${id}`);
      commit('deleteContact', id);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  }
};

const mutations = {
  setContacts(state, contacts) {
    state.contacts = contacts;
  },
  addContact(state, contact) {
    state.contacts.push(contact);
  },
  updateContact(state, updatedContact) {
    const index = state.contacts.findIndex(c => c.id === updatedContact.id);
    if (index !== -1) {
      state.contacts.splice(index, 1, updatedContact);
    }
  },
  deleteContact(state, id) {
    state.contacts = state.contacts.filter(contact => contact.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
