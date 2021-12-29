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
        <v-app-title class="title"> BASE-PC </v-app-title>

        <div class="search">
          <v-text-field id="s"
                        fixed
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

        <v-tabs optional>
          <v-spacer></v-spacer>
          <v-tab>
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

                  v-for="(item, id) in items"
                  :key="id"
                  @click="handleSelectItem(item)"

                  @click.stop="toggleCategory(),
                  toggleProduct()"
                  >

                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>


                <Category
                  :show-dialog="true"
                  v-if="showCategory && selectItem==0"

                  />

                <Product
                  :show-dialog="true"
                  v-if="showProduct && selectItem==1"

                  />


              </v-list>
            </v-menu>



          </v-tab>
          <v-tab><v-btn>Wyloguj</v-btn>
          </v-tab>

          <div class="avatar">
            <v-tab disabled>

              <v-avatar size="37">

                <img
                  src="https://f0.pngfuel.com/png/184/113/portrait-icon-user-profile-computer-icons-profile-png-clip-art.png"
                  alt="">
              </v-avatar>
            </v-tab>
          </div>


        </v-tabs>
      </template>
    </v-app-bar>
  </v-container>
</template>

<script>

import Category from "../LoggedIn/AddCategory.vue";
import Product from "../LoggedIn/AddProduct.vue";



export default {

  name: "AdminNav",
  data: () => ({
    showCategory: false,
    showProduct: false,
    selectItem: null,



    items: [
      { message: 'Foo', title:'Dodaj kategorię', id:0},
      { message: 'Foo', title:'Dodaj produkt', id:1},
    ]

  }),

  components: {
    Category,
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


    handleSelectItem(item)
    {
      this.selectItem = item.id;

    }
  }
};

</script>

<style>
.title {
  width: 200px !important;
}
#s {
  width: 400px;
  color:white;
}

.search {
  padding-top:20px;
  padding-left:10px
}

.counter {
  height: 17px;
  width: 17px;
  margin-bottom:17px;
  margin-left:2px;
  margin-top:10px;
  background-color: #bbb;
  color:black;
  border-radius: 50%;
  display: inline-block;
}

.avatar {
  padding-top:4px;
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


