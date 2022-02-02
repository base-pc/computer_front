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
                                                                   </div>

                                                                   <div
                                                                     class="buttons-container">

                                                                     <div class="product-detail">
                                                                       <ProductInDetail
                                                                         :product-id="product.id"
                                                                         />

                                                                     </div>

                                                                     <div class="add-to-cart">

                                                                       <v-btn
                                                                         color="primary"
                                                                         :disabled=!cartPermissions x-small
                                                                         @click="handleSelectItem(product),
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
</template>

<script>

import axios from "axios";

import ProductInDetail from '../HomePage/ProductInDetail.vue'

export default {

  name: "UserSearchList",

  props:
  {
    categoryId      : Number,
    cartPermissions : Boolean,
    searchInput     : String,
  },

  watch : {
    searchInput() {

      this.getSearchProducts();

    },

    refresh()
    {
      this.getProducts();
    },

    categoryId() {

      this.getProducts();

    }

  },

  data: () => ({
    logged      : false,
    showProduct : false,
    products    : [],
    refresh     : 0,
    refresh_navbar : 0,
    snackbar       : false,
    text           : '',
    timeout        : 1500,

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

    addToCart()
    {
      event.cancelBubble = true;

      if(event.stopPropagation) event.stopPropagation();

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

  mounted: function () {
    this.$root.$on('refreshCategory', (text) => {
      this.refresh = text;
    })
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
  margin:auto;
  width: 20%;
  padding-right:15px;
  margin-right:50px;
  align-items:center;
  justify-content:right;

}
.buttons-container {
  display:flex;
  flex-direction:column;
  margin:auto;
  padding-right:20px;
  justify-content:space-around;

}
.price {
  display:flex;
  margin-right:20px;
  align-items:center;
  justify-content:center;
  margin:auto;
}

</style>
