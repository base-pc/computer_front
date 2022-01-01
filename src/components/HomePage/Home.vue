<template>
  <v-container>
    <component v-bind:is="component"></component>
    <Nav></Nav>
    <Sidebar></Sidebar>
  </v-container>
</template>

<script>
import Nav from "../HomePage/Nav.vue";
import Sidebar from "../HomePage/Sidebar.vue";
import HotProducts from "../HomePage/HotProducts.vue";
import CategoryProducts from "../HomePage/CategoryProducts.vue";

export default {
  name: "Home",

  props: {
    categoryProduct: Boolean,
  },


  components: {
    Sidebar,
    Nav,
    'form-one' : HotProducts,
    'elo' : CategoryProducts,
  },

  data(){
    return {
    }
  },

  computed: {
    component() {
      if(this.categoryProduct) {
        return 'elo';
      } else {
        return 'form-one';
      }
    }
  },
};
</script>

