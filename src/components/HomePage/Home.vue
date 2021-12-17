<template>

  <v-container>
    <Nav></Nav>
    <Sidebar></Sidebar>









  </v-container>



</template>

<script>

import Nav from '../HomePage/Nav.vue'
import Sidebar from '../HomePage/Sidebar.vue'

export default {
  name: 'Home',
  components: {
    Sidebar,
    Nav
  },
}
</script>

