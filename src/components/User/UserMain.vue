<template>
  <v-container>
    <UserNav></UserNav>
    <Sidebar></Sidebar>
    <HotProducts></HotProducts>
  </v-container>
</template>

<script>
import Sidebar from "../HomePage/Sidebar.vue";
import HotProducts from "../HomePage/HotProducts.vue";
import UserNav from "../User/UserNav.vue";

export default {
  name: "Home",
  components: {
    Sidebar,
    HotProducts,
    UserNav,
  },
};
</script>

