<template>
  <div class="items">
    <v-item-group align="center">
      <v-container>
        <v-row justify="center">

          <v-col align-self="center" v-for="hot in hots" :key="hot.id" cols="12" md="10">
            <v-item
              >

              <v-card class="d-flex justify-center flex-row" light height="150"
                                                                   width="900px"
                                                                   @click="handleSelectItem(hot)"
                                                                   @click.native.stop="
                                                                   toggleProduct()"
                                                                   >

                                                                   <div class="img">
                                                                     <v-img
                                                                       max-height="150"
                                                                       max-width="179"
                                                                       :src="hot.photo_url"
                                                                       ></v-img>
                                                                   </div>
                                                                   <div class="product_name">{{hot.name}}</div>

                                                                   <div class="rating">
                                                                     <v-rating  readonly background-color="black"
                                                                                         half-increments
                                                                                         color="black" x-small></v-rating>

                                                                                       {{hot.rate}}({{hot.rates_time}})

                                                                   </div>

                                                                   <div class="cart">
                                                                     <div class="price">
                                                                       <p>{{hot.price}} PLN</p>
                                                                     </div>
                                                                     <fa icon="shopping-cart" size="2x"/>

                                                                     <div class="addToCart">
                                                                       <v-btn
                                                                         color="primary" :disabled=!logged x-small
                                                                         @click="getHotPorducts()">Dodaj</v-btn>

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
      :product-name="form.name"
      :product-manufacturer="form.manufacturer"
      :product-price="form.price"
      :product-desc="form.desc"
      :product-rate="form.rate"
      :product-rates-time="form.rates_time"
      :product-photo="form.photo"

      />
  </div>
</template>

<script>

import axios from "axios";

import ProductInDetail from '../HomePage/ProductInDetail.vue'

export default {

  name: "HotProducts",

  data: () => ({
    logged      : false,
    hots        : [],
    loading     : false,
    showProduct : false,

    form: {
      id           : undefined,
      name         : '',
      manufacturer : '',
      price        : '',
      desc         : undefined,
      rate         : 0,
      rates_time   : 0,
      photo        : ''

    },

  }),

  components: {ProductInDetail},

  methods: {

    async getHotPorducts()
    {

      axios
        .get("https://icnav.online/api/product/hot")
        .then(res => {
          this.loading = false;
          this.hots    = res.data;
        })

      console.log(this.hots);

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

    handleSelectItem(hot)
    {
      this.form.id   = hot.id;
      this.form.name = hot.name;

      console.log(this.form.id);
      console.log(this.form.name);

    }

  },

  beforeMount(){
    this.getHotPorducts()
  },
}

</script>

<style scoped>
.items {
  margin-top: -3%;
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
