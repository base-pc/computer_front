<template>
  <v-container>
    <v-app-bar
      fixed
      dense
      color="##B57614"


      height="14px"
      title="BASE-PC"
      elevation="0"
      dark
      >
      <template v-slot:extension>
        <v-app-title class="title"> BASE-PC </v-app-title>

        <div class="search">
          <v-text-field id="s"
                        fixed
                        dense
                        background-color="white"
                        color="black"
                        append-outer-icon="fa-search"
                        ></v-text-field>
        </div>

        <v-tabs optional>
          <v-spacer></v-spacer>
          <v-tab><Register /></v-tab>
          <v-tab><Login /></v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
  </v-container>
</template>

<script>

import Register from "../Auth/Register.vue";
import Login from "../Auth/Login.vue";

export default {
  name: "Nav",
  components: {Register, Login},
};
</script>

<style>
.title {
  width: 200px !important;
}
#s {
  width: 400px;
  color:black;
}

.search {
  padding-top:20px;
  padding-left:10px
}

</style>
