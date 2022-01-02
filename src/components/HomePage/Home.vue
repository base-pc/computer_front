<template>
  <v-container>
    <component v-bind:is="component"></component>
    <Nav></Nav>
    <Sidebar @showMsg="getData($event)"></Sidebar>
    <v-btn>{{result}}</v-btn>
  </v-container>
</template>

<script>
import Nav from "../HomePage/Nav.vue";
import Sidebar from "../HomePage/Sidebar.vue";
import HotProducts from "../HomePage/HotProducts.vue";
import CategoryProducts from "../HomePage/CategoryProducts.vue";

export default {


  props: {
    category: Boolean,
  },

  name: 'Home',
  components: {
    Sidebar,
    Nav,
    'form-one' : HotProducts,
    'elo'      : CategoryProducts,
  },

  data(){
    return {
      test: false,
      result: '',
    }
  },

  computed: {
    component() {
      if(this.result) {
        return 'elo';
      } else {
        return 'form-one';
      }
    }
  },

  methods: {

    getData(data)
    {

      this.result = data;


    },
  }
};
</script>

