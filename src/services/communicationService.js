import axios from 'axios';

const API_URL = 'http://localhost:3000/communication_history';

export default {
  async getAll() {
    const response = await axios.get(API_URL);
    return response.data;
  },
  async create(communication) {
    const response = await axios.post(API_URL, communication);
    return response.data;
  },
  async update(communication) {
    const response = await axios.put(`${API_URL}/${communication.id}`, communication);
    return response.data;
  },
  async delete(id) {
    await axios.delete(`${API_URL}/${id}`);
  },
};
