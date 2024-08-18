<template>
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
          <button @click="$emit('edit', communication)">Editar</button>
          <button @click="$emit('delete', communication.id)">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    communications: {
      type: Array,
      required: true
    }
  }
};
</script>
