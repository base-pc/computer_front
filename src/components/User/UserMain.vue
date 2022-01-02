<template>
  <v-container>

    <component v-bind:is="component"
               :category-id="id"
               :cart-permissions="true"
               ></component>

    <UserNav></UserNav>

    <Sidebar @showMsg="getData($event)" @emitId="getId($event)"></Sidebar>



  </v-container>
</template>

<script>
import Sidebar from "../HomePage/Sidebar.vue";
import HotProducts from "../HomePage/HotProducts.vue";
import UserNav from "../User/UserNav.vue";
import CategoryProducts from "../HomePage/CategoryProducts.vue";

export default {

  props: {
    category: Boolean,
  },

  name: "UserMain",

  components: {
    Sidebar,
    UserNav,
    'form-one' : HotProducts,
    'elo'      : CategoryProducts,
  },

  data(){
    return {
      test: false,
      result: false,
      id: null,
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

    getId(data)
    {
      this.id = data;
    }
  }

};
</script>

