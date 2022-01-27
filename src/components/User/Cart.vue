<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="400"
      >

      <div class="dialog-title">

        <div class="cart-icon">

          <fa icon="shopping-cart" size="2x"/>

        </div>


        <h3>Koszyk</h3>

      </div>

      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on">

          <fa icon="shopping-cart" size="2x"/>
          <span class="counter">{{cart_item_counter}}</span>

        </v-btn>

      </template>
      <v-card>
        <v-card-text class="text-h5">Na pewno chcesz usunąć tą kategorię
          produktów?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
            >
            Nie
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="getCartItems()"
            >
            Pobierz itemy z koszyka
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

import axios from "axios";

export default {
  name: "Cart",

  watch : {

    refresh()
    {
      this.cartItemCounter();
    }
  },

  data () {
    return {
      dialog            : false,
      category_id       : this.categoryId,
      refresh_sidebar   : 0,
      enable            : false,
      cart_item_counter : 0,
      refresh           : 0,
      items             : [],
    }
  },

  methods: {

    closeDialog()
    {
      this.$emit('close-dialog')
    },

    cartItemCounter()
    {

      const token = this.$cookie.get('token');

      axios.get('https://icnav.online/api/cart/counter', {

        headers: {
          'Authorization' : `Bearer ${token}`,
        }
      })

        .then((res) => {

          this.cart_item_counter = res.data;

        })
    },

    getCartItems()
    {

      const token = this.$cookie.get('token');

      axios.get('https://icnav.online/api/cart/get', {

        headers: {
          'Authorization' : `Bearer ${token}`,
        }
      })

        .then((res) => {
          this.items = res.data;
          console.log(this.items);
        })

    }

  },

  mounted: function () {
    this.$root.$on('refresh_item_counter', (text) => {
      this.refresh += text;
    })
  },

  beforeMount(){
    this.cartItemCounter();
  },

}
</script>

<style>

.cart {
  margin-top:6px;
}

.counter {
  height: 17px;
  width: 20px;
  margin-bottom:17px;
  margin-left:2px;
  margin-top:10px;
  background-color: #bbb;
  color:black;
  border-radius: 50%;
  display: inline-block;
}

.dialog-title
{
  display:flex;
  background-color:#7cd;
  color:white;
  align-items: center;
}

.dialog-title h3
{
  color:white;
  text-align:justify;
  vertical-align:middle;
  margin-top:5px;
  margin-left:10px;
  flex:5;
}


.dialog-title i
{
  flex:1;
}

</style>
