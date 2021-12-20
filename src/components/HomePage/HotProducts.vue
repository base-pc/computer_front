<template>
  <div class="items">
    <v-item-group>
      <v-container>
        <v-row>
          <v-col v-for="n in 9" :key="n" cols="12" md="10">
            <v-item v-slot="{ toggle }">
              <v-card class="d-flex flex-row" light height="150" @click="toggle" title="ELOMORDO">
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
                  <v-rating
                    v-model="rating"
                    background-color="black"
                    color="yellow accent-4"
                    dense
                    half-increments
                    hover
                    size="18"
                    ></v-rating>
                </div>

                <div class="cart">
                  <div class="price">
                    <p>768 zł</p>
                  </div>
                  <fa icon="shopping-cart" size="2x"/>

                  <div class="addToCart">
                    <v-btn
                      color="primary" x-small>Dodaj</v-btn>

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
    rating: 4.3,
  }),
  components: {},
};
</script>

<style scoped>
.items {
  margin-top: -10%;
  margin-left: 13%;
}

.img {
  text-align: left;
  margin-left: 20px;
  padding-top: 20px;
  border: 1px black dashed;
}

.product_name {
  display:flex;
  text-align:center;
  border: 1px black dashed;
  margin-left:20px;
  align-items:center;
  justify-content:center;
}

.rating {
  border: 1px black dashed;
  width:20%;
}

.cart {
  display:flex;
  border: 1px black dashed;
  width: 20%;
  padding-right:15px;
  margin-right:50px;
  align-items:center;
  justify-content:right;

}
.addToCart {
  display:flex;
  border: 1px black dashed;
  width:3px;
  height:20px;

}
.price {
  display:flex;
  margin-right:20px;
  border: 1px black dashed;
  align-items:center;
  justify-content:center;
  margin:auto;
  padding-top:10px;
}


</style>
