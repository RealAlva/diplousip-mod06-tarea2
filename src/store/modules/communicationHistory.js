import axios from 'axios';

const state = {
  communicationHistory: []  // Debe ser un array inicialmente
};

const getters = {
  filteredCommunications: (state) => (searchQuery) => {
    if (!searchQuery) return state.communicationHistory;
    return state.communicationHistory.filter(communication =>
      communication.tipo_comunicacion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      communication.notas.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
};

const actions = {
  async fetchCommunications({ commit }) {
    try {
      const response = await axios.get('http://localhost:3000/communication_history');
      commit('setCommunications', response.data);
    } catch (error) {
      console.error('Error fetching communications:', error);
    }
  },
  async addCommunication({ commit }, communication) {
    // Validar que los campos no estén vacíos y que el ID sea numérico
    if (!communication.tipo_comunicacion || !communication.notas || isNaN(communication.id)) {
      console.error('Error: Campos vacíos o ID inválido.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/communication_history', communication);
      commit('addCommunication', response.data);
    } catch (error) {
      console.error('Error adding communication:', error);
    }
  },
  async updateCommunication({ commit }, communication) {
    try {
      const response = await axios.put(`http://localhost:3000/communication_history/${communication.id}`, communication);
      commit('updateCommunication', response.data);
    } catch (error) {
      console.error('Error updating communication:', error);
    }
  },
  async deleteCommunication({ commit }, id) {
    try {
      await axios.delete(`http://localhost:3000/communication_history/${id}`);
      commit('deleteCommunication', id);
    } catch (error) {
      console.error('Error deleting communication:', error);
    }
  }
};

const mutations = {
  setCommunications(state, communications) {
    state.communicationHistory = communications;
  },
  addCommunication(state, communication) {
    state.communicationHistory.push(communication);
  },
  updateCommunication(state, updatedCommunication) {
    const index = state.communicationHistory.findIndex(c => c.id === updatedCommunication.id);
    if (index !== -1) {
      state.communicationHistory.splice(index, 1, updatedCommunication);
    }
  },
  deleteCommunication(state, id) {
    state.communicationHistory = state.communicationHistory.filter(communication => communication.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
