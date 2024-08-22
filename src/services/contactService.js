import axios from 'axios';

const API_URL = 'http://localhost:3000/contacts';

export default {
  async getAll() {
    const response = await axios.get(API_URL);
    return response.data;
  },
  async create(contact) {
    const response = await axios.post(API_URL, contact);
    return response.data;
  },
  async update(contact) {
    const response = await axios.put(`${API_URL}/${contact.id}`, contact);
    return response.data;
  },
  async delete(id) {
    await axios.delete(`${API_URL}/${id}`);
  },
};
