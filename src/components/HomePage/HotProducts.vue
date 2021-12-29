<template>
  <div class="items">
    <v-item-group align="center">
      <v-container>
        <v-row justify="center">
          <v-col align-self="center" v-for="n in 9" :key="n" cols="12" md="10">
            <v-item v-slot="{ toggle }">
              <v-card class="d-flex justify-center flex-row" light height="150"
                                                                   width="900px" @click="toggle">
                <div class="img">
                  <v-img
                    lazy-src="https://picsum.photos/id/11/10/6"
                    max-height="150"
                    max-width="179"
                    src="https://picsum.photos/id/11/500/300"
                    ></v-img>
                </div>
                <div class="product_name">Procesor AMD Ryzen 5 5600G AM4</div>

                <div class="rating">
                  <v-rating v-model="rating" readonly background-color="black"
                                                      half-increments
                                                      color="black" x-small></v-rating>

                                                    {{rating}}({{times_rate}})

                </div>

                <div class="cart">
                  <div class="price">
                    <p>768 zł</p>
                  </div>
                  <fa icon="shopping-cart" size="2x"/>

                  <div class="addToCart">
                    <v-btn
                      color="primary" :disabled=!logged x-small>Dodaj</v-btn>

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

export default {
  name: "HotProducts",
  data: () => ({
    rating: 4.5,
    times_rate: 15,
    logged: true,
  }),

  components: {},

  methods: {

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
