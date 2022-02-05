<template>
  <div class="container">
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
                                                                           class="white--text"
                                                                           color="#458588"
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

      this.getProducts();

    },

    refresh()
    {
      this.getProducts();
    },

  },

  data: () => ({
    logged         : false,
    products       : [],
    showProduct    : false,
    refresh        : 0,
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

    getProducts()
    {

      axios
        .get("https://icnav.online/api/category/show/" + this.categoryId)
        .then(res => {
          this.products    = res.data[0].products;
        })

    },

    toggleProduct()
    {
      this.showProduct = !this.showProduct;
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

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>
