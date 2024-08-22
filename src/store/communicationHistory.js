import communicationService from '../services/communicationService';

export default {
  namespaced: true,
  state: {
    communications: [],
  },
  getters: {
    filteredCommunications: (state) => (query) => {
      return state.communications.filter(comm =>
        comm.tipo_comunicacion.toLowerCase().includes(query.toLowerCase())
      );
    },
  },
  actions: {
    async fetchCommunications({ commit }) {
      const communications = await communicationService.getAll();
      commit('setCommunications', communications);
    },
    async addCommunication({ commit }, communication) {
      const newCommunication = await communicationService.create(communication);
      commit('addCommunication', newCommunication);
    },
    async updateCommunication({ commit }, communication) {
      const updatedCommunication = await communicationService.update(communication);
      commit('updateCommunication', updatedCommunication);
    },
    async deleteCommunication({ commit }, id) {
      await communicationService.delete(id);
      commit('deleteCommunication', id);
    },
  },
  mutations: {
    setCommunications(state, communications) {
      state.communications = communications;
    },
    addCommunication(state, communication) {
      state.communications.push(communication);
    },
    updateCommunication(state, communication) {
      const index = state.communications.findIndex(comm => comm.id === communication.id);
      if (index !== -1) {
        state.communications.splice(index, 1, communication);
      }
    },
    deleteCommunication(state, id) {
      state.communications = state.communications.filter(comm => comm.id !== id);
    },
  },
};
