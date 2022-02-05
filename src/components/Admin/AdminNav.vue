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
                        fixed
                        v-model="search_product"
                        @keyup.enter="getSearchInput(), clearSearchField()"
                        dense
                        background-color="#5c7067"
                        color="white"
                        prepend-inner-icon="fa-search"
                        outlined
                        persistent-hint
                        solo
                        label="Szukaj"
                        ></v-text-field>
        </div>

        <v-spacer></v-spacer>
        <v-menu
          top
          close-on-content-click
          >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              v-bind="attrs"
              v-on="on"
              ><i class="arrow down"></i>

              Zarządzaj
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              @click.stop="toggleCategory(),
              toggleProduct(), toggleDeleteCategory()"

              v-for="(item, id) in items"
              :key="id"
              @click="handleSelectItem(item)"

              >

              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>

            <Category
              :show-dialog="true"
              v-if="selectItem==0"

              />

            <DeleteCategory
              :show-dialog="true"
              v-if="showDeleteCategory && selectItem==1"
              />

            <Product
              :show-dialog="true"
              v-if="showProduct && selectItem==2"

              />

          </v-list>
        </v-menu>

        <v-btn @click="logout()">Wyloguj
        </v-btn>

        <div class="avatar">

          <v-avatar size="37">

            <img
              src="https://www.qatarliving.com/sites/all/themes/qatarliving_v3/images/avatar.jpeg"
              alt="">
          </v-avatar>
        </div>

      </template>
    </v-app-bar>
  </v-container>
</template>

<script>

import Category from "../Admin/AddCategory.vue";
import Product  from "../Admin/AddProduct.vue";
import DeleteCategory  from "../Admin/DeleteCategory.vue";
import {globalStore} from '../../main.js'

export default {

  name: "AdminNav",

  data: () => ({
    showCategory       : false,
    showProduct        : false,
    showDeleteCategory : false,
    selectItem         : null,
    search_product     : '',

    items: [
      { message: 'Foo', title:'Dodaj kategorię', id:0},
      { message: 'Foo', title:'Usuń kategorię', id:1},
      { message: 'Foo', title:'Dodaj produkt', id:2},
    ]

  }),

  components: {
    Category,
    DeleteCategory,
    Product
  },

  methods: {

    toggleCategory()
    {
      this.showCategory = !this.showCategory;
    },

    toggleProduct()
    {
      this.showProduct = !this.showProduct;
    },

    toggleDeleteCategory()
    {
      this.showDeleteCategory = !this.showDeleteCategory;
    },

    handleSelectItem(item)
    {
      this.selectItem = item.id;

    },

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

    logout()
    {
      this.$cookie.delete('token');
      globalStore.logged_in = false;
      localStorage.removeItem('user');
      localStorage.removeItem('permissions');
      this.$router.push(this.$route.query.redirect || '/home')

    }

  }
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

.avatar {
  padding-left:1.5em;
  padding-bottom:5px;
}

.arrow {
  border: solid yellow;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}

.down {
  transform: rotate(45deg);
  margin-right:10px;

  -webkit-transform: rotate(45deg);
}

</style>

