<template>
  <v-container>

    <component :is="component"
      :category-id  = "id"
      :search-input = "search_input"/>

    <Nav @searchPhase="getSearchInput($event)" @triggerSearch="getSearch($event)"></Nav>

    <Sidebar @showMsg="getData($event)" @emitId="getId($event)"></Sidebar>

  </v-container>
</template>

<script>

import Nav              from "../HomePage/Nav.vue";
import Sidebar          from "../HomePage/Sidebar.vue";
import HotProducts      from "../HomePage/HotProducts.vue";
import CategoryProducts from "../HomePage/CategoryProducts.vue";
import SearchList       from "../HomePage/SearchList.vue";

export default {

  name: 'Home',

  components: {
    Sidebar,
    Nav,
    'hot-products'      : HotProducts,
    'category-products' : CategoryProducts,
    'search-list'       : SearchList,
  },

  data(){
    return {
      result       : false,
      search       : false,
      id           : null,
      search_input : null,
    }
  },

  computed: {
    component() {

      if(this.search) {
        return 'search-list';

      } else if(this.result) {
        return 'category-products';

      }else {
        return 'hot-products';
      }
    },

  },

  methods: {

    getData(data)
    {

      this.result = data;
    },

    getId(data)
    {
      this.id = data;
    },

    getSearchInput(data)
    {
      this.search_input = data;
    },

    getSearch(data)
    {
      this.search = data;
    }
  }
};
</script>

