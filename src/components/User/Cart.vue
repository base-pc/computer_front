<template>
  <div class="dialog">

    <v-row justify="center">
      <v-dialog
        color="rgb(255, 0, 0, 1)"
        v-model="dialog"
        persistent
        max-width="800px"
        >

        <div class="dialog-title">

          <div class="cart-title-icon">

            <fa icon="shopping-cart" size="2x"/>

          </div>
          <div class="cart-label">
            <h3>Koszyk</h3>

          </div>

          <div class="close">
            <fa icon="times" size="2x" @click="close()"

                             />
          </div>

        </div>

        <div class="dialog-content">

          <v-container>
            <div class="cart_items">
              <v-item-group align="left">
                <v-col align-self="center" v-for="item in items" :key="item.id"
                                           cols="13" md="15">
                  <v-card elevation="2" class="d-flex
                  justify-centered flex-row" light height="110"
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
                                                     class="item_name">

                                                     {{item.buyable.name}}

                                                   </div>

                                                   <div class="cart-rating">
                                                     <v-rating  readonly background-color="black"
                                                                         half-increments
                                                                         size="13"
                                                                         :value="item.buyable.rate"
                                                                         color="black"></v-rating>

                                                                       {{item.buyable.rate}}({{item.buyable.rates_time}})

                                                   </div>

                                                   <div class="item-quantity">

                                                     <p>Ilość</p>

                                                     <p>{{item.quantity}} szt</p>

                                                   </div>

                                                   <div class="item-price">

                                                     <p>Cena</p>
                                                     <p>{{item.buyable.price}} PLN</p>

                                                   </div>

                                                   <div class="buttons-containter">

                                                     <div class="item-button">
                                                       <v-btn
                                                         @click="handleSelectItem(item),
                                                         updateCartItemQuantity()" color="success"
                                                                                   small>Dodaj</v-btn></div>

                                                     <div class="item-button">
                                                       <v-btn
                                                         @click="handleSelectItem(item),
                                                         deleteCartItem()"
                                                         color="error"
                                                         small>Usuń</v-btn></div>

                                                   </div>

                  </v-card>
                  <v-divider class="mx-10"></v-divider>
                </v-col>

              </v-item-group>

              <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
                light
                centered
                elevation
                color="#FBF1C7"
                >{{text}}</v-snackbar>


            </div>
            <v-divider class="mx-10"></v-divider>
            <div class="total-price">

              <h3>Koszt zakupów: {{total_cost}} PLN </h3>

            </div>
          </v-container>

        </div>

        <v-btn color="primary" @click="getCartItems()">Zapłać</v-btn>
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
      this.getCartItems();
      this.getTotalItemsPrice();
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
      item_id           : undefined,
      total_cost        : 0,
      snackbar          : false,
      text              : '',
      timeout           : 1700,
      item_quantity     : 0,

      form: {
        quantity         : 0,

      },


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

    handleSelectItem(item)
    {
      this.item_id   = item.id;
      console.log(this.item_id);
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
          console.log(res);
        })

    },

    deleteCartItem()
    {
      const token = this.$cookie.get('token');

      axios.delete('https://icnav.online/api/cart/destroy/' + this.item_id, {

        headers: {
          'Authorization' : `Bearer ${token}`,
        }
      })

        .then(() => {
          this.refresh += 1;
          this.snackbar = true;
          this.text="Usunięto przedmiot z koszyka";
        })

    },

    updateCartItemQuantity()
    {
      this.form.quantity += 1;

      const token = this.$cookie.get('token');

      axios.post('https://icnav.online/api/cart/update/' + this.item_id,
        this.form,{

          headers: {
            'Authorization' : `Bearer ${token}`,
          }
        })

        .then(() => {
          this.refresh += 1;
          this.snackbar = true;
          this.text="Ilość zwiększono zamówienie o 1 szt";
          this.form.quantity = 0;
        })









    },

    getTotalItemsPrice()
    {
      const token = this.$cookie.get('token');

      axios.get('https://icnav.online/api/cart/total', {

        headers: {
          'Authorization' : `Bearer ${token}`,
        }
      })

        .then((res) => {
          this.total_cost = res.data;
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
    this.getCartItems();
    this.getTotalItemsPrice();
  },

}
</script>

<style>

.dialog-title {
  display:flex;
  padding-left:6px;
  background-color:#ff7733;
}

.close {
  flex:2;
  color:black;
  margin-top:-8px;

}

.cart-label {
  padding-left:10px;
  flex:1;

}

.dialog-content
{
  background-color:#FBF1C7;
  color:white;
}

.cart_items {
  align-self:center;

}

.item_name {
  display:flex;
  flex: 2;
  align-content: center;
  text-align:center;
  margin-left:20px;
  align-items:center;
  justify-content:center;
}
.item_img {
  text-align: left;
  margin-left: 20px;
  padding-top: 20px;
}

.cart-rating {
  margin:auto;
  text-align:center;
  flex: 2;

}

.item-quantity {
  margin:auto;
  flex:2;
  text-align:center;
}

.item-price {
  text-align:center;
  flex:2;
  margin:auto;

}

.buttons-containter {

  text-align:center;

}

.item-button {
  margin:auto;
  margin-top:15px;
  margin-bottom:10px;
  margin-right:15px;
}

.total-price  h3{
  border-top: 2px black solid;
  margin-top:10px;
  color:black;
  text-align:right;
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
