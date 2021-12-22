<template>
  <v-container>
    <v-app-bar
      fixed
      dense
      color="#1d4647"
      height="14px"
      title="BASE-PC"
      elevation="0.2"
      dark
      >
      <template v-slot:extension>
        <v-app-title class="title"> BASE-PC </v-app-title>

        <div class="search">
          <v-text-field
            fixed
            dense
            background-color="yellow"
            color="black"
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
</style>

<style lang="scss">
$input-font-size: 72px;
</style>

