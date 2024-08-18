<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Tipo de Comunicación:</label>
      <input v-model="localForm.tipo_comunicacion" type="text" required />
    </div>
    <div>
      <label>Notas:</label>
      <input v-model="localForm.notas" type="text" required />
    </div>
    <!-- Agrega más campos según sea necesario -->
    <button type="submit">{{ isEditing ? 'Actualizar' : 'Agregar' }}</button>
    <button type="button" @click="$emit('cancel')">Cancelar</button>
  </form>
</template>

<script>
export default {
  props: ['form', 'isEditing'],
  data() {
    return {
      localForm: { ...this.form }
    };
  },
  watch: {
    form: {
      deep: true,
      handler(newForm) {
        this.localForm = { ...newForm };
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.localForm);
    }
  }
};
</script>
