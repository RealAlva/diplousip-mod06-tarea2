<template>
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Email</th>
        <th>Dirección</th>
        <th>Teléfono</th>
        <th>País</th>
        <th>Ciudad</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="contact in contacts" :key="contact.id">
        <td>{{ contact.name }}</td>
        <td>{{ contact.email }}</td>
        <td>{{ contact.address }}</td>
        <td>{{ contact.phone }}</td>
        <td>{{ contact.country }}</td>
        <td>{{ contact.city }}</td>
        <td>
          <button @click="$emit('edit', contact)">Editar</button>
          <button @click="$emit('delete', contact.id)">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    contacts: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
/* Estilos adicionales para el listado */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

button {
  margin-right: 5px;
}
</style>
