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
        <v-app-title class="title"> BASE-PC </v-app-title>

        <div class="search">
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

        <v-tabs optional>

          <v-spacer></v-spacer>

          <v-tab>
            <v-btn @click="logout()">Wyloguj</v-btn>
          </v-tab>

          <div class="cart">
            <v-tab>
              <fa icon="shopping-cart" size="2x"/>
              <span class="counter">3</span>
            </v-tab>

          </div>

          <div class="avatar">
            <v-tab  light readonly>

              <v-avatar size="37">

                <img
                  :src="user_avatar"
                  alt="">

              </v-avatar>

            </v-tab>

          </div>
        </v-tabs>
      </template>
    </v-app-bar>
  </v-container>
</template>

<script>

import {globalStore} from '../../main.js'


export default {
  name: "UserNav",

  data() {
    return {
      search_product : '',
      user_avatar: localStorage.getItem('user'),
    }
  },

  methods: {

    getSearchInput()
    {
      console.log(this.search_product);

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
      globalStore.is_admin = null;
      globalStore.logged_in = false;


      this.$router.push(this.$route.query.redirect || '/home')

    }

  },
};

</script>

<style>
.title {
  width: 200px !important;
}
#s {
  width: 400px;
  color:black;
}

.search {
  padding-top:20px;
  padding-left:10px
}

.counter {
  height: 17px;
  width: 17px;
  margin-bottom:17px;
  margin-left:2px;
  margin-top:10px;
  background-color: #bbb;
  color:black;
  border-radius: 50%;
  display: inline-block;
}

.avatar {

  padding-top:4px;
}


</style>

<style lang="scss">
$input-font-size: 72px;
</style>

