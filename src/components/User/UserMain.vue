<template>
  <v-container>

    <component :is="component"
      :category-id="id"
      :search-input = "search_input"
      :cart-permissions="true" />

    <UserNav @searchPhase="getSearchInput($event)" @triggerSearch="getSearch($event)"></UserNav>

    <Sidebar @showMsg="getData($event)" @emitId="getId($event)"></Sidebar>

  </v-container>
</template>

<script>

import Sidebar          from "../HomePage/Sidebar.vue";
import HotProducts      from "../HomePage/HotProducts.vue";
import UserNav          from "../User/UserNav.vue";
import CategoryProducts from "../HomePage/CategoryProducts.vue";
import  UserSearchList  from "../User/UserSearchList.vue";

export default {

  name: "UserMain",

  components: {
    Sidebar,
    UserNav,
    'hot-products'      : HotProducts,
    'category-products' : CategoryProducts,
    'search-list'       : UserSearchList,
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
    }

  }

};
</script>

