<template>
  <div>
    <h2>Historial de Comunicación</h2>
    <CommunicationForm :form="form" :isEditing="isEditing" @submit="handleSubmit" @cancel="resetForm" />
    <input v-model="searchQuery" placeholder="Filtrar por tipo de comunicación" />
    <CommunicationList :communications="filteredCommunications" @edit="editCommunication" @delete="deleteCommunication" />
  </div>
</template>

<script>
import CommunicationForm from '../components/CommunicationForm.vue';
import CommunicationList from '../components/CommunicationList.vue';
import { useStore } from 'vuex';
import { computed, reactive } from 'vue';

export default {
  components: {
    CommunicationForm,
    CommunicationList,
  },
  setup() {
    const store = useStore();
    const form = reactive({ id: null, contact_id: '', tipo_comunicacion: '', fecha: '', notas: '' });
    const isEditing = computed(() => !!form.id);
    const searchQuery = reactive('');

    const filteredCommunications = computed(() =>
      store.getters['communicationHistory/filteredCommunications'](searchQuery)
    );

    const handleSubmit = (communication) => {
      if (isEditing.value) {
        store.dispatch('communicationHistory/updateCommunication', communication);
      } else {
        store.dispatch('communicationHistory/addCommunication', communication);
      }
      resetForm();
    };

    const resetForm = () => {
      Object.assign(form, { id: null, contact_id: '', tipo_comunicacion: '', fecha: '', notas: '' });
    };

    const editCommunication = (communication) => {
      Object.assign(form, communication);
    };

    const deleteCommunication = (id) => {
      store.dispatch('communicationHistory/deleteCommunication', id);
    };

    return {
      form,
      isEditing,
      handleSubmit,
      resetForm,
      editCommunication,
      deleteCommunication,
      searchQuery,
      filteredCommunications,
    };
  },
  mounted() {
    this.$store.dispatch('communicationHistory/fetchCommunications');
  },
};
</script>
