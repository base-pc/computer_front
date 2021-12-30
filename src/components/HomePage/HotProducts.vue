<template>
  <div class="items">
    <v-item-group align="center">
      <v-container>
        <v-row justify="center">

          <p v-if="loading">Ładowanie strony...</p>

          <v-col align-self="center" v-for="hot in hots" :key="hot.id" cols="12" md="10">
            <v-item v-slot="{ toggle }">
              <v-card class="d-flex justify-center flex-row" light height="150"
                                                                   width="900px" @click="toggle">
                <div class="img">
                  <v-img
                    max-height="150"
                    max-width="179"
                    :src="hot.photo_url"
                    ></v-img>
                </div>
                <div class="product_name">{{hot.name}}</div>

                <div class="rating">
                  <v-rating v-model="rating" readonly background-color="black"
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
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "HotProducts",
  data: () => ({
    rating: 4.5,
    times_rate: 15,
    logged: true,
    hots: [],
    loading: false,
  }),

  components: {},

  methods: {

    async getHotPorducts()
    {

      axios
        .get("https://icnav.online/api/product/hot")
        .then(res => {
          this.loading = false;
          this.hots = res.data;
        })

      console.log(this.hots);

    }
  },

  beforeMount(){
    this.getHotPorducts()
  },
}


</script>

<style scoped>
.items {
  margin-top: -10%;
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
