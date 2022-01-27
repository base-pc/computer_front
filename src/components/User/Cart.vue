<template>
  <div class="dialog">

    <v-row justify="center">
      <v-dialog
        color="rgb(255, 0, 0, 1)"
        v-model="dialog"
        persistent
        max-width="900px"
        max-height="100px"
        >

        <div class="dialog-title">

          <v-container>
            <div class="close">
              <fa icon="times" size="2x" @click="close()"

                               />
            </div>
            <div class="cart_items">
              <v-item-group align="left">
                <v-col align-self="center" v-for="item in items" :key="item.id" cols="12" md="10">
                  <v-card color="rgb(255, 255, 255, 1)" class="d-flex
                  justify-left flex-row" light height="110"
                                               >
                                               <div
                                                 class="item_img">
                                                 <v-img
                                                   max-height="80"
                                                   max-width="80"
                                                   :src="item.buyable.photo_url"
                                                   ></v-img>
                                               </div>
                                               <div
                                                 class="item_name">{{item.buyable.name}}</div>

                  </v-card>
                </v-col>

              </v-item-group>
            </div>
          </v-container>

        </div>

        <v-btn @click="getCartItems()">getItemcs</v-btn>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on">

            <fa icon="shopping-cart" size="2x"/>
            <span class="counter">{{cart_item_counter}}</span>
          </v-btn>
        </template>

      </v-dialog>
    </v-row>
  </div>
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

    close() {
      this.dialog=false;
    },

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
          this.items = res.data.items;
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

.close {
  color:black;
  margin-top:-13px;
}

.dialog-title
{
  background-color:#FBF1C7;
  color:white;
  align-items: center;
  border: 1px black solid;
}

.cart {
  margin-top:6px;
}

.cart_items {
  border: 1px black solid;
}

.item_name {
  display:flex;
  text-align:center;
  margin-left:20px;
  margin-right:20px;
  align-items:center;
  justify-content:center;
  border: 1px black solid;
}
.item_img {
  text-align: left;
  margin-left: 20px;
  padding-top: 20px;
  border: 1px black solid;
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

</style>
