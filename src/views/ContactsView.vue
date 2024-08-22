<template>
  <div>
    <h2>Contactos</h2>
    <ContactForm :form="form" :isEditing="isEditing" @submit="handleSubmit" @cancel="resetForm" />
    <input v-model="searchQuery" placeholder="Filtrar por nombre" />
    <ContactList :contacts="filteredContacts" @edit="editContact" @delete="deleteContact" />
  </div>
</template>

<script>
import ContactForm from '../components/ContactForm.vue';
import ContactList from '../components/ContactList.vue';
import { useStore } from 'vuex';
import { computed, reactive } from 'vue';

export default {
  components: {
    ContactForm,
    ContactList,
  },
  setup() {
    const store = useStore();
    const form = reactive({ id: null, name: '', email: '', address: '', phone: '', country: '', city: '' });
    const isEditing = computed(() => !!form.id);
    const searchQuery = reactive('');

    const filteredContacts = computed(() =>
      store.getters['contacts/filteredContacts'](searchQuery)
    );

    const handleSubmit = (contact) => {
      if (isEditing.value) {
        store.dispatch('contacts/updateContact', contact);
      } else {
        store.dispatch('contacts/addContact', contact);
      }
      resetForm();
    };

    const resetForm = () => {
      Object.assign(form, { id: null, name: '', email: '', address: '', phone: '', country: '', city: '' });
    };

    const editContact = (contact) => {
      Object.assign(form, contact);
    };

    const deleteContact = (id) => {
      store.dispatch('contacts/deleteContact', id);
    };

    return {
      form,
      isEditing,
      handleSubmit,
      resetForm,
      editContact,
      deleteContact,
      searchQuery,
      filteredContacts,
    };
  },
  mounted() {
    this.$store.dispatch('contacts/fetchContacts');
  },
};
</script>
