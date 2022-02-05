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
        <v-app-title id="title"> BASE-PC </v-app-title>

        <div id="search">
          <v-text-field id="s"
                        v-model="search_product"
                        @keyup.enter="getSearchInput(), clearSearchField()"
                        fixed
                        dense
                        background-color="#5c7067"
                        prepend-inner-icon="fa-search"
                        outlined
                        persistent-hint
                        solo
                        label="Szukaj"
                        ></v-text-field>
        </div>

        <v-spacer></v-spacer>
        <Register />
        <Login />
      </template>
    </v-app-bar>
  </v-container>
</template>

<script>

import Register from "../Auth/Register.vue";
import Login    from "../Auth/Login.vue";

export default {

  name: "Nav",

  data() {
    return {
      search_product : '',
    }
  },

  components: {Register, Login},

  methods: {

    getSearchInput()
    {
      console.log(this.search_product);

      this.$emit('searchPhase', this.search_product);
      this.$emit('triggerSearch', true)
    },

    clearSearchField()
    {
      this.search_product = null;
    },

  },
};
</script>

<style>

#title {
  width:7em;
  font-size:23px;
}
#s {
  width: 400px;
  color:white;
  font-weight:bold;
  font-size:20px;
}

#search {
  padding-top:20px;
  padding-left:0.5em;
}

</style>
