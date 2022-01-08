<template>
  <v-container>

    <component :is="component"
      :category-id="id"
      :search-input = "search_input"
      :cart-permissions="false" />

    <AdminNav @searchPhase="getSearchInput($event)"
      @triggerSearch="getSearch($event)"></AdminNav>

    <Sidebar @showMsg="getData($event)" @emitId="getId($event)"
      ></Sidebar>

  </v-container>
</template>

<script>

import {globalStore} from '../../main.js'


import Sidebar          from "../HomePage/Sidebar.vue";
import HotProducts      from "../HomePage/HotProducts.vue";
import AdminNav         from "../Admin/AdminNav.vue";
import CategoryProducts from "../HomePage/CategoryProducts.vue";
import AdminSearchList  from "../Admin/AdminSearchList.vue";

export default {

  name: "AdminMain",

  components: {
    Sidebar,
    AdminNav,
    'hot-products'      : HotProducts,
    'category-products' : CategoryProducts,
    'search-list'       : AdminSearchList,

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
      } else if(this.result){
        return 'category-products';
      }else {
        return 'hot-products';
      }
    }
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
    },

    forceRerender() {

      if(globalStore.refresh)

        this.$forceUpdate();
    }

  }

};
</script>

