<template>
  <div class="items">
    <v-item-group align="center">
      <v-container>

        <v-row justify="center">

          <v-col align-self="center" v-for="product in products" :key="product.id" cols="12" md="10">
            <v-item
              >

              <v-card class="d-flex justify-center flex-row" light height="150"
                                                                   width="900px"
                                                                   @click="handleSelectItem(product)"
                                                                   @click.native.stop="
                                                                   toggleProduct()"
                                                                   >

                                                                   <div class="img">
                                                                     <v-img
                                                                       height="120"
                                                                       width="120"
                                                                       :src="product.photo_url"
                                                                       ></v-img>
                                                                   </div>
                                                                   <div
                                                                     class="product_name">{{product.name}}</div>

                                                                   <div class="rating">
                                                                     <v-rating readonly background-color="black"
                                                                                        half-increments
                                                                                        :value="product.rate"
                                                                                        color="black" x-small></v-rating>

                                                                                      {{product.rate}}({{product.rates_time}})

                                                                   </div>

                                                                   <div class="cart">
                                                                     <div class="price">
                                                                       <p>{{product.price}} PLN</p>
                                                                     </div>
                                                                     <fa icon="shopping-cart" size="2x"/>

                                                                     <div class="addToCart">
                                                                       <v-btn
                                                                         color="primary"
                                                                         :disabled=!cartPermissions x-small
                                                                         @click="getProducts()">Dodaj</v-btn>

                                                                     </div>

                                                                   </div>
                                                                   <v-scroll-y-transition> </v-scroll-y-transition>
              </v-card>
            </v-item>

          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
    <ProductInDetail
      v-if="showProduct"
      :show-dialog="true"
      :product-id="form.id"

      />
  </div>
</template>

<script>

import axios from "axios";

import ProductInDetail from '../HomePage/ProductInDetail.vue'

export default {

  name: "SearchList",

  props:
  {
    categoryId      : Number,
    cartPermissions : Boolean,
    searchInput     : String,
  },

  watch : {
    searchInput() {

      console.log('Zmiana wartosci');
      this.getSearchProducts();

    },

    categoryId() {

      console.log('Zmiana wartosci');
      this.getProducts();

    }

  },

  data: () => ({
    logged      : false,
    showProduct : false,
    products    : [],

    form: {
      id           : undefined,
    },

    searchform: {
      search: ''
    },

  }),

  components: {ProductInDetail},

  methods: {

    getSearchProducts()
    {

      this.searchform.search = this.searchInput;

      axios.post("https://icnav.online/api/product/search", this.searchform)

        .then(res => {
          this.products    = res.data;
          console.log(this.searchform.search);
        })

    },

    getProducts()
    {

      axios
        .get("https://icnav.online/api/category/show/" + this.categoryId)
        .then(res => {
          this.products    = res.data[0].products;
        })

      console.log(this.products);

    },

    toggleProduct()
    {
      this.showProduct = !this.showProduct;
    },

    toggle()
    {
      this.toggleProduct();
    },

    handleSelectItem(product)
    {
      this.form.id   = product.id;
      this.form.name = product.name;

    },

  },

  beforeMount()
  {
    this.getSearchProducts();
  }

}

</script>

<style scoped>
.items {
  margin-top: -5%;
  margin-left:7%;
}

.img {
  text-align: left;
  margin-left: 20px;
  padding-top: 20px;
}

.product_name {
  display:flex;
  text-align:center;
  margin-left:20px;
  margin-right:20px;
  align-items:center;
  justify-content:center;
}

.rating {
  width:20%;
  margin:auto;
}

.cart {
  display:flex;
  width: 20%;
  padding-right:15px;
  margin-right:50px;
  align-items:center;
  justify-content:right;

}
.addToCart {
  display:flex;
  width:3px;
  height:20px;

}
.price {
  display:flex;
  margin-right:20px;
  align-items:center;
  justify-content:center;
  margin:auto;
  padding-top:10px;
}

</style>
