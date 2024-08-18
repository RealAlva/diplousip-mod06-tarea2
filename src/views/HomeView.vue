<template>
  <div style="text-align: center; margin-top: 50px;">
    <h1>Welcome to the Contact Management System</h1>
    <router-link to="/contacts">Contacts</router-link>
    <span style="margin: 0 15px;">|</span>
    <router-link to="/communication-history">Communication History</router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
};
</script>
