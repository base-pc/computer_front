<template>

  <v-dialog v-model="show" max-width="1080" persistent>
    <v-card v-for="product in products" :key="product.id">


      <div class="close">
        <fa icon="times" size="2x" @click="close()"

                         />
      </div>

      <!--<v-card-title class="justify-center">-->
      <!--</v-card-title>-->

      <div class="title">
        <p>{{product.name}}</p>
      </div>




      <div class="flex-container">


        <div class="img">
          <v-img
            max-height="250"
            max-width="250"
            src="https://img.pccomponentes.com/articles/8/83028/msi-geforce-gtx970-oc-4gb-gddr5-negra-blanca-4.jpg"
            ></v-img>
        </div>

        <div class="product-detail">

          <h2>Cena: {{product.price}} PLN</h2>
          <p style="font-weight:bold">Producent: {{product.manufacturer}}</p>
          <p>Opis: GeForce GTX 970 to przedstawiciel najnowszej serii kart graficznych Nvidia. Karta dzięki nowemu rdzeniowi Maxwell cechuje się świetną relacją ceny do wydajności. Wysoka wydajność nie oznacza dużego poboru prądu i wyjącego wentylatora. Podobnie, jak inne najnowsze produkty firmy Nvidia, odznacza się niskim poborem prądu i sporymi możliwościami w podkręcaniu. Mały minus za poziom szumu powietrza pod obciążeniem. Karta wyposażona jest w najnowsze technologie: G-sync, DSR i DirectX 12 </p>

        </div>
      </div>

      <div class="flex-container2">


        <div class="datail-rating">

          <v-rating  readonly background-color="black"
                              half-increments
                              size="27"
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


.flex-container {
  display:flex;
  border: 1px black solid;

}

.img {
  border: 1px black solid;
  margin-left: 7%;
}


.title {
  width: auto;
  margin:auto;

}

.title p {
  border: 1px black solid;
  font-size: 1.8em;
}



.flex-container2 {
  display:flex;
}

.datail-rating {

  border: 1px black solid;
  padding-top: 10px;
  margin-left:8%;

}

.cart-button {
  border: 1px black solid;
  margin:auto;
}
</style>

