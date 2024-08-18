<template>
  <div>
    <h1>Historial de Comunicación</h1>
    <form @submit.prevent="addCommunication">
      <div>
        <label for="tipo_comunicacion">Tipo de Comunicación:</label>
        <input v-model="tipo_comunicacion" id="tipo_comunicacion" />
      </div>
      <div>
        <label for="notas">Notas:</label>
        <input v-model="notas" id="notas" />
      </div>
      <button type="submit">Agregar</button>
      <button @click="resetForm">Cancelar</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>Tipo de Comunicación</th>
          <th>Fecha</th>
          <th>Notas</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="communication in communications" :key="communication.id">
          <td>{{ communication.tipo_comunicacion }}</td>
          <td>{{ communication.fecha }}</td>
          <td>{{ communication.notas }}</td>
          <td>
            <button @click="editCommunication(communication)">Editar</button>
            <button @click="deleteCommunication(communication.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      tipo_comunicacion: '',
      notas: '',
      fecha: new Date().toISOString().split('T')[0],  // Fecha por defecto a hoy
      communications: []
    };
  },
  methods: {
    async addCommunication() {
      // Validaciones para campos vacíos
      if (!this.tipo_comunicacion || !this.notas) {
        alert("Por favor, completa todos los campos requeridos.");
        return;
      }

      const newCommunication = {
        id: Date.now(),  // Generar un ID único
        tipo_comunicacion: this.tipo_comunicacion,
        fecha: this.fecha,
        notas: this.notas,
        contact_id: 1  // Supongamos que estamos vinculando al contacto con ID 1 por defecto
      };

      try {
        await this.$store.dispatch('communicationHistory/addCommunication', newCommunication);
        this.resetForm();
      } catch (error) {
        console.error('Error al agregar la comunicación:', error);
      }
    },
    resetForm() {
      this.tipo_comunicacion = '';
      this.notas = '';
      this.fecha = new Date().toISOString().split('T')[0];
    },
    async fetchCommunications() {
      try {
        await this.$store.dispatch('communicationHistory/fetchCommunications');
        this.communications = this.$store.state.communicationHistory.communicationHistory;
      } catch (error) {
        console.error('Error al obtener las comunicaciones:', error);
      }
    },
    async deleteCommunication(id) {
      try {
        await this.$store.dispatch('communicationHistory/deleteCommunication', id);
        await this.fetchCommunications();
      } catch (error) {
        console.error('Error al eliminar la comunicación:', error);
      }
    },
  },
  created() {
    this.fetchCommunications();
  }
};
</script>
