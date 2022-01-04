<template>

  <v-dialog v-model="show" max-width="1080" persistent>
    <v-card v-for="product in products" :key="product.id">

      <div class="close">
        <fa icon="times" size="2x" @click="close()"

                         />
      </div>

      <div class="title">
        <p>{{product.name}}</p>
      </div>

      <div class="flex-container">

        <div class="img">
          <v-img
            max-height="400"
            max-width="400"
            :src="product.photo_url"
            ></v-img>
        </div>

        <div class="product-detail">

          <h2>Cena: {{product.price}} PLN</h2>
          <p style="font-weight:bold">Producent: {{product.manufacturer}}</p>
          <p>{{product.description}}</p>

        </div>
      </div>

      <div class="flex-container2">

        <div class="datail-rating">

          <v-rating  readonly background-color="black"
                              half-increments
                              size="27"
                              :value="product.rate"
                              color="black"></v-rating>

                            {{product.rate}}({{product.rates_time}})

        </div>

        <div class="cart-button">

          <v-btn> <i class="fab fa-shopping-cart fa-2x"></i> Dodaj do koszyka</v-btn>

        </div>

      </div>

      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>

    </v-card>
  </v-dialog>

</template>

<script>

import axios from "axios";

export default {

  props: {
    showDialog : Boolean,
    productId  : Number,
  },

  data() {
    return {
      show     : this.showDialog,
      products : [],
      product_id : null,
    }
  },

  methods: {

    close() {
      this.show=false;
    },

    getProductById()
    {
      this.product_id = this.productId;

      axios
        .get("https://icnav.online/api/product/show/" + this.product_id)
        .then(res => {
          this.loading  = false;
          this.products = res.data;
        })

      console.log(this.products);

    },

  },

  beforeMount(){
    this.getProductById();
  },

}

</script>

<style>

.close {
  text-align:right;
  padding-right:10px;
  padding-top:10px;
}

.add_category_form {
  margin-left:30px;
  margin-right:30px;
}

.product-detail {
  margin-left:5%;
  margin-top:10px;
  margin-right:2%;
  text-align:left;

}

.flex-container {
  display:flex;

}

.img {
  margin-left: 7%;
}

.title {
  margin:auto;

}

p.title{
  font-size: 1.3em;
}

.flex-container2 {
  display:flex;
}

.datail-rating {

  padding-top: 10px;
  margin-left:15%;

}

.cart-button {
  margin:auto;
}
</style>

