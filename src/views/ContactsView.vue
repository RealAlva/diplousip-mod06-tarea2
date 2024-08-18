<template>
  <div>
    <h2>Gestión de Contactos</h2>
    <router-link to="/">Main</router-link>
    <ContactForm :form="form" :isEditing="isEditing" @submit="handleSubmit" @cancel="resetForm" />
    <input v-model="searchQuery" placeholder="Filtrar por nombre o email" />
    <!-- Asegúrate de que contacts es un array y no una función -->
    <ContactList
      :contacts="contacts"
      @edit="editContact"
      @delete="deleteContact"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ContactForm from '../components/ContactForm.vue';
import ContactList from '../components/ContactList.vue';

export default {
  components: {
    ContactForm,
    ContactList,
  },
  data() {
    return {
      form: {
        id: null,
        name: '',
        email: '',
        address: '',
        phone: '',
        country: '',
        city: ''
      },
      searchQuery: '',  // Esto lo usaremos para buscar contactos
    };
  },
  computed: {
    // Modificación para asegurarnos de que contacts sea un array
    contacts() {
      return this.filteredContacts(this.searchQuery);
    },
    ...mapGetters('contacts', ['filteredContacts']),
    isEditing() {
      return !!this.form.id;
    }
  },
  methods: {
    ...mapActions('contacts', ['fetchContacts', 'addContact', 'updateContact', 'deleteContact']),
    handleSubmit(contact) {
      if (this.isEditing) {
        this.updateContact(contact);
      } else {
        this.addContact(contact);
      }
      this.resetForm();
    },
    async addContact() {
    if (this.name && this.email) {
      const newContact = {
        name: this.name,
        email: this.email,
        address: this.address,
        phone: this.phone,
        country: this.country,
        city: this.city,
      };
      await this.$store.dispatch('contacts/addContact', newContact);  // Llama a la acción de Vuex
      this.resetForm();  // Limpia el formulario
    }
  },
    resetForm() {
      this.form = {
        id: null,
        name: '',
        email: '',
        address: '',
        phone: '',
        country: '',
        city: ''
      };
    },
    editContact(contact) {
      this.form = { ...contact };
    },
    deleteContact(id) {
      this.deleteContact(id);
    }
  },
  created() {
    this.fetchContacts();  // Asegúrate de cargar los contactos cuando se crea la vista
  }
};
</script>