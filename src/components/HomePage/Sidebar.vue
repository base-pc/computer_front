<template>
  <v-container>
    <div class="sidebar">
      <v-tabs vertical fixed background-color="white" color="black">
        <v-tab v-for="category in categories" :key="category.id"
               @click.stop="handleSelectCategory(category)"
               @click="toggleCategoryProduct"


               >
               {{category.name}}

        </v-tab>
      </v-tabs>
      <CategoryProducts
        v-if="showCategoryProducts"
        :category-id="selectCategory"

        />
    </div>
  </v-container>
</template>


<script>

import axios from "axios";
import CategoryProducts from "../HomePage/CategoryProducts.vue"


export default {
  name: "Sidebar",

  data: () => ({
    categories: [],
    showCategoryProducts: false,
    selectCategory: null,

  }),

  components: {CategoryProducts},

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

    toggleCategoryProduct()
    {
      this.showCategoryProducts = !this.showCategoryProducts;
    },

    handleSelectCategory(category)
    {
      this.selectCategory = category.id;
      console.log(this.selectCategory);

    }






  },

  beforeMount(){
    this.getCategories()
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


