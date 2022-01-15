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

  name: "CategoryProducts",

  props:
  {
    categoryId      : Number,
    cartPermissions : Boolean,
  },

  watch : {
    categoryId() {

      console.log('Zmiana wartosci');
      this.getProducts();

    },

    refresh()
    {
      this.getProducts();
    }
  },

  data: () => ({
    logged      : false,
    products    : [],
    showProduct : false,
    refresh     : 0,

    form: {
      id           : undefined,
    },

  }),

  components: {ProductInDetail},

  methods: {

    getProducts()
    {

      axios
        .get("https://icnav.online/api/category/show/" + this.categoryId)
        .then(res => {
          this.products    = res.data[0].products;
        })

      console.log(this.products);

    },

    getHotName(hotName)
    {
      console.log(hotName);
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

  mounted: function () {
    this.$root.$on('refreshCategory', (text) => {
      this.refresh += text;
    })
  },

  beforeMount()
  {
    this.getProducts();
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
  flex:1;
}

.rating {
  width:20%;
  margin:auto;
  padding-right:15px;
  flex: 1;
}

.cart {
  display:flex;
  width: 20%;
  padding-right:15px;
  margin-right:50px;
  align-items:center;
  justify-content:right;
  flex: 1;

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
