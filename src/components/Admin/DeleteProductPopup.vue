<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="400"
      >

      <div class="dialog-title">

        <i class="fas fa-trash-alt fa-2x"></i>
        <h3>Usuń produkt</h3>

      </div>

      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="error"
          dark
          v-bind="attrs"
          v-on="on"
          ><i class="fas fa-trash-alt fa-2x"></i>
          Usuń
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5"></v-card-title>
        <v-card-text class="text-h5">Na pewno chcesz usunąć ten produkt?</v-card-text>
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
            @click="checkId(), deleteProduct()"
            >
            Tak
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

import axios from "axios";

export default {

  props: {
    productId  : Number,
  },

  data () {
    return {
      dialog     : false,
      product_id : this.productId,
      refresh_category_products: 0,
    }
  },

  methods: {

    closeDialog()
    {
      this.$emit('close-dialog')
    },

    checkId()
    {
      console.log(this.product_id);
    },

    deleteProduct()
    {
      const token = this.$cookie.get('token');

      axios.delete('https://icnav.online/api/product/' + this.product_id +
        '/destroy'
        , {

          headers: {
            'Authorization' : `Bearer ${token}`,
          }
        })

        .then(() => {
          this.$root.$emit('refreshCategory', this.refresh_category_products += 1);
          this.closeDialog();
          this.dialog = false;

        })

    },

  }

}
</script>

<style>

.dialog-title
{
  display:flex;
  background-color:#FF6060;
  color:white;
  align-items: center;
}

.dialog-title h3
{
  color:white;
  text-align:justify;
  vertical-align:middle;
  margin-top:5px;
  flex:5;
}

.dialog-title i
{
  flex:1;
}

</style>
