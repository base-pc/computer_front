<template>
  <v-dialog v-model="show" max-width="600px" persistent>
    <v-card>

      <div class="close">
        <fa icon="times" size="2x" @click="close()"

                         />
      </div>

      <v-card-title class="justify-center">
        <p>Dodaj produkt</p>
      </v-card-title>

      <div class="add_product_form">
        <v-form>
          <v-select
            :items="dbOptions"
            v-model="selectedCategoryId"
            item-text="name"
            item-value="id"
            label="Kategoria"
            >
          </v-select>
          <v-text-field
            label="Nazwa produktu"
            type="text"
            required
            ></v-text-field>
          <v-text-field
            label="Producent"
            type="text"
            required
            ></v-text-field>
          <v-text-field
            label="Opis"
            type="text"
            required
            ></v-text-field>
          <v-text-field
            label="Cena"
            type="text"
            required
            ></v-text-field>
          <v-text-field
            label="Ilość"
            type="text"
            required
            ></v-text-field>

          <v-file-input
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Dodaj zdjęcie"
            prepend-icon="fa-camera"
            label="Zdjęcie poglądowe"
            ></v-file-input>

        </v-form>
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="justify-center" color="primary"
                                      @click.stop="close()">Dodaj</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>

</template>

<script>

import axios from "axios";


export default {

  props: {
    showDialog: Boolean,
  },

  data() {
    return {
      show               : this.showDialog,
      selectedCategoryId : '',
      dbOptions          : [],
    }
  },

  mounted()
  {
    axios.get('https://icnav.online/api/category/all')

      .then(r => {
        for (let i = 0; i < r.data.length; i++) {
          this.dbOptions.push(r.data[i])
        }
      },
        error => {
          console.error(error)
        })
  },


  methods: {
    close() {
      this.show=false;
    },

  },

};

</script>


<style>

.close {
  text-align:right;
  padding-right:10px;
  padding-top:10px;
}

.add_product_form {
  margin-left:30px;
  margin-right:30px;
}

</style>

