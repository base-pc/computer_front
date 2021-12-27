<template>
  <v-container>
    <!--<UserNav></UserNav>-->
    <AdminNav></AdminNav>
    <!--<Nav></Nav>-->
    <Sidebar></Sidebar>
    <HotProducts></HotProducts>
  </v-container>
</template>

<script>
//import Nav from "../HomePage/Nav.vue";
  import Sidebar from "../HomePage/Sidebar.vue";
import HotProducts from "../HomePage/HotProducts.vue";
//import UserNav from "../LoggedIn/UserNav.vue";
import AdminNav from "../LoggedIn/AdminNav.vue";

export default {
  name: "Home",
  components: {
    Sidebar,
    // Nav,
    HotProducts,
    // UserNav,
    AdminNav,
  },
};
</script>

