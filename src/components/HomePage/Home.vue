<template>
  <v-container>

    <component :is="component"
      :category-id  = "id"
      :search-input = "search_input"/>

    <Nav @searchPhase="getSearchInput($event)" @triggerSearch="getSearch($event)"></Nav>

    <Sidebar @showMsg="getData($event)" @emitId="getId($event)"></Sidebar>

    <ResetPasswordRequest :dialog="dialog"></ResetPasswordRequest>
    <ResetPassword        :dialog="dialog2"></ResetPassword>

  </v-container>
</template>

<script>

import Nav                  from "../HomePage/Nav.vue";
import Sidebar              from "../HomePage/Sidebar.vue";
import HotProducts          from "../HomePage/HotProducts.vue";
import CategoryProducts     from "../HomePage/CategoryProducts.vue";
import SearchList           from "../HomePage/SearchList.vue";
import ResetPasswordRequest from "../Auth/ResetPasswordRequest.vue";
import ResetPassword        from "../Auth/ResetPassword.vue";

export default {

  name: 'Home',

  components: {
    Sidebar,
    Nav,
    ResetPasswordRequest,
    ResetPassword,
    "hot-products"      : HotProducts,
    "category-products" : CategoryProducts,
    "search-list"       : SearchList,
  },

  data(){
    return {
      result       : false,
      search       : false,
      id           : null,
      search_input : null,
      dialog       : false,
      dialog2      : false,
    }
  },

  watch : {
    $route()
    {
      this.checkModal();
    },
  },

  created()
  {
    this.checkModal();
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
    },

    checkModal()
    {
      if(this.$route.params.path == 'reset_password_request')
      {
        this.dialog = true;
      }
      else if(this.$route.params.path == 'password_reset')
      {
        this.dialog2 = true;
      }

      else {
        this.dialog = false;
        this.dialog2 = false;
      }

    }
  },

};
</script>

