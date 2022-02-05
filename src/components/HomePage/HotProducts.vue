<template>
  <div class="container">
    <div class="items">
      <v-item-group align="center">


        <v-container>

          <v-row justify="center">

            <v-col align-self="center" v-for="hot in hots" :key="hot.id" cols="12" md="10">
              <v-item
                >

                <v-card class="d-flex justify-center flex-row" light height="150"
                                                                     width="900px"
                                                                     >

                                                                     <div class="img">
                                                                       <v-img
                                                                         max-height="120"
                                                                         max-width="120"
                                                                         :src="hot.photo_url"
                                                                         ></v-img>
                                                                     </div>
                                                                     <div class="product_name">{{hot.name}}</div>

                                                                     <div class="rating">
                                                                       <v-rating  readonly background-color="black"
                                                                                           half-increments
                                                                                           :value="hot.rate"
                                                                                           color="black" x-small></v-rating>

                                                                                         {{hot.rate}}({{hot.rates_time}})

                                                                     </div>

                                                                     <div class="cart">
                                                                       <div class="price">
                                                                         <p>{{hot.price}} PLN</p>
                                                                       </div>
                                                                     </div>

                                                                     <div
                                                                       class="buttons-container">

                                                                       <div class="product-detail">
                                                                         <ProductInDetail
                                                                           :product-id="hot.id"
                                                                           />


                                                                       </div>

                                                                       <div class="add-to-cart">

                                                                         <v-btn
                                                                           class="white--text"
                                                                           color="#458588"
                                                                           :disabled=!cartPermissions x-small
                                                                           @click="handleSelectItem(hot),
                                                                           addToCart()">
                                                                           <i
                                                                             class="fab
                                                                             fa-shopping-cart
                                                                             fa-2x"></i>Dodaj

                                                                         </v-btn>


                                                                       </div>

                                                                     </div>

                                                                     <v-scroll-y-transition> </v-scroll-y-transition>
                </v-card>
              </v-item>

            </v-col>
          </v-row>
          <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            light
            centered
            elevation
            color="#FBF1C7"
            >{{text}}</v-snackbar>

        </v-container>
      </v-item-group>

    </div>
  </div>
</template>

<script>

import axios from "axios";

import ProductInDetail from '../HomePage/ProductInDetail.vue'

export default {

  name: "HotProducts",

  props:
  {
    cartPermissions: Boolean,
  },

  data: () => ({
    logged         : false,
    hots           : [],
    showProduct    : false,
    refresh_navbar : 0,
    snackbar       : false,
    text           : '',
    timeout        : 1500,

    form: {
      id           : undefined,
    },

  }),

  components: {ProductInDetail},

  methods: {

    getHotPorducts()
    {

      axios
        .get("https://icnav.online/api/product/hot")
        .then(res => {
          this.loading = false;
          this.hots    = res.data;
        })

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

    },

    addToCart()
    {

      const token = this.$cookie.get('token');

      axios({
        method: 'POST',
        url: 'https://icnav.online/api/cart/' + this.form.id + '/store',
        headers: {
          'Authorization' : `Bearer ${token}`,
          'Accept' : 'application/json'

        }

      })
        .then(() => {
          this.snackbar      = true;
          this.text = 'Produkt został dodany do koszyka';

          this.$root.$emit('refresh_item_counter', this.refresh_navbar += 1);

        })

    },

  },

  beforeMount(){
    this.getHotPorducts()
  },
}

</script>

<style scoped>

.container {
  margin-left:3em;
}
.items {
  margin-top:3em;
}

.img {
  text-align: left;
  margin-left: 1em;
  padding-top: 1em;
}

.product_name {
  display:flex;
  text-align:center;
  margin-left:1em;
  margin-right:1em;
  align-items:center;
  justify-content:center;
  flex:1;
}

.rating {
  width:20%;
  margin:auto;
  padding-top:1em;
  padding-right:1em;
  flex: 1;

}

.cart {
  display:flex;
  margin:auto;
  width: 20%;
  margin-right:1em;
  align-items:center;
  justify-content:right;

}
.buttons-container {
  display:flex;
  flex-direction:column;
  margin:auto;
  padding-right:1em;
  justify-content:space-around;

}
.price {
  display:flex;
  align-items:center;
  justify-content:center;
  padding-top:1em;
  margin:auto;
}

</style>
