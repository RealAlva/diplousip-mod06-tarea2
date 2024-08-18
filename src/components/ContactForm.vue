<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Nombre:</label>
      <input v-model="localForm.name" type="text" required />
    </div>
    <div>
      <label>Email:</label>
      <input v-model="localForm.email" type="email" required />
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
