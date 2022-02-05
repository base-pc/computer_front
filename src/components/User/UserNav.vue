<template>
  <v-container>
    <v-app-bar
      fixed
      dense
      color="##B57614"

      height="14px"
      title="BASE-PC"
      elevation="0"
      dark
      >

      <template v-slot:extension>
        <v-app-title id="title"> BASE-PC </v-app-title>

        <div id="search">
          <v-text-field id="s"
                        v-model="search_product"
                        @keyup.enter="getSearchInput(), clearSearchField()"
                        fixed
                        dense
                        background-color="#5c7067"
                        color="white"
                        prepend-inner-icon="fa-search"
                        outlined
                        presistent-hint
                        solo
                        label="Szukaj"
                        ></v-text-field>
        </div>


        <v-spacer></v-spacer>

        <div class="logout">
          <v-btn @click="logout()">Wyloguj</v-btn>


        </div>


        <div class="cart">
          <Cart />

        </div>

        <div class="avatar">

          <v-avatar size="37">

            <img
              :src="user_avatar"
              alt="">

          </v-avatar>


        </div>
      </template>
    </v-app-bar>
  </v-container>
</template>

<script>

import axios from 'axios';
import {globalStore} from '../../main.js';
import Cart from './Cart.vue';

export default {
  name: "UserNav",

  data() {
    return {
      search_product    : '',
      user_avatar       : localStorage.getItem('user'),
    }
  },
  components: {Cart},

  methods: {

    getSearchInput()
    {

      this.$emit('searchPhase', this.search_product);
      this.$emit('triggerSearch', true)
    },

    clearSearchField()
    {
      this.search_product = null;
    },

    logout()
    {
      this.$cookie.delete('token');
      localStorage.removeItem('user');
      globalStore.is_admin = false;
      globalStore.logged_in = false;

      this.$router.push(this.$route.query.redirect || '/home')

    },

    cartItemCounter()
    {

      const token = this.$cookie.get('token');

      return axios.get('https://icnav.online/api/cart/counter', {

        headers: {
          'Authorization' : `Bearer ${token}`,
        }
      })

        .then((res) => {

          this.cart_item_counter = res.data;

        })
    }

  },

};

</script>

<style>

#title {
  width:7em;
  font-size:23px;
}
#s {
  width: 400px;
  color:white;
  font-weight:bold;
  font-size:20px;
}

#search {
  padding-top:20px;
  padding-left:0.5em;
}


.counter {
  height: 17px;
  width: 20px;
  margin-bottom:17px;
  margin-left:2px;
  margin-top:10px;
  background-color: #458588;
  color:white;
  border-radius: 50%;
  display: inline-block;
}
.avatar {
  padding-left:1.5em;
  padding-bottom:5px;
}
.cart {
  padding-left:0.65em;
}
</style>


