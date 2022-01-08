<template>
  <v-container>
    <div class="sidebar">
      <v-tabs vertical fixed background-color="white" color="black">
        <v-tab v-for="category in categories" :key="category.id"
               @click.stop="emitId(category)"

               >
               {{category.name}}

        </v-tab>
      </v-tabs>
    </div>

  </v-container>

</template>

<script>

import axios from "axios";

export default {
  name: "Sidebar",

  data: () => ({
    categories: [],
    showCategoryProducts : false,
    selectCategory       : null,
    refresh              : 0,

  }),

  watch: {
    refresh()
    {
      this.getCategories();
    }
  },

  components: {},

  methods: {

    getCategories()
    {
      axios
        .get("https://icnav.online/api/category/all")
        .then(res=> {
          this.categories = res.data;
        })

      console.log(this.categories);

    },

    showData()
    {
      this.$emit('showMsg', true);
    },

    emitId(category)
    {
      this.$emit('emitId', category.id);
      this.showData();
    },

  },

  mounted: function () {
    this.$root.$on('myEvent', (text) => {
      this.refresh = text;
    })
  },

  beforeMount(){
    this.getCategories();
  },

};
</script>

<style>
.sidebar {
  height: 100%;
  width: auto;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding-top: 63px;
  margin-top: 10px;
  background-color: white;
  border: 3px black solid;
}

</style>

