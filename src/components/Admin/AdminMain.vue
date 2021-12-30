<template>
  <v-container>
    <AdminNav></AdminNav>
    <Nav></Nav>
    <Sidebar></Sidebar>
    <HotProducts></HotProducts>
  </v-container>
</template>

<script>
import Sidebar from "../HomePage/Sidebar.vue";
import HotProducts from "../HomePage/HotProducts.vue";
import AdminNav from "../Admin/AdminNav.vue";

export default {
  name: "Home",
  components: {
    Sidebar,
    HotProducts,
    AdminNav,
  },
};
</script>

