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
        <v-form v-model="Valid" lazy-validation>
          <v-select
            :items="dbOptions"
            v-model="selectedCategoryId"
            :min="0"
            :value="Field_1"
            :rules="Rule_4"

            item-text="name"
            item-value="id"
            label="Kategoria"
            >
          </v-select>

          <v-text-field
            v-model="form.name"
            :min="5"
            :counter="20"
            :value="Field_1"
            :rules="Rule_1"
            label="Nazwa produktu"
            type="text"
            ></v-text-field>
          <v-text-field
            v-model="form.manufacturer"
            :min="2"
            :counter="20"
            :value="Field_1"
            :rules="Rule_2"
            label="Producent"
            type="text"
            ></v-text-field>
          <v-textarea
            v-model="form.description"
            :min="2"
            filled
            :counter="3000"
            :value="Field_1"
            :rules="Rule_3"
            label="Opis"
            type="text"
            ></v-textarea>
          <v-text-field
            v-model="form.price"
            :value="Field_1"
            :rules="Rule_4"
            label="Cena"
            type="number"
            ></v-text-field>

          <v-file-input
            :min="0"
            :value="Field_1"
            :rules="Rule_4"
            type="file"
            @change="handleFileUpload()"
            v-model="form.photo"
            placeholder="Dodaj zdjęcie"
            prepend-icon="fa-camera"
            label="Zdjęcie poglądowe"
            ></v-file-input>

        </v-form>
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="white--text"
               color="#458588"
               :loading="loading"
               :disabled="!Valid || loading || !enable_form ||
               !selectedCategoryId || form.photo.length<1"
                                                         @click.stop=" loader='loading', addProduct()">Dodaj

                                                         <template v-slot:loader>
                                                           <span class="custom-loader">
                                                             <fa icon="spinner" size="2x"/>
                                                           </span>
                                                         </template>

        </v-btn>

      </v-card-actions>

    </v-card>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      light
      centered
      elevation
      color="#FBF1C7"
      >{{text}}</v-snackbar>

  </v-dialog>

</template>

<script>

import axios from "axios";

export default {

  name: 'AddProduct',

  props: {
    showDialog: Boolean,
  },



  data() {
    return {
      show               : this.showDialog,
      selectedCategoryId : '',
      dbOptions          : [],
      loading            : false,
      loader             : null,
      refresh_category_products: 0,

      snackbar     : false,
      text         : '',
      timeout      : 1500,
      enable_form: false,

      form : {
        photo        : [],
        name         : [],
        manufacturer : [],
        description  : [],
        price        : [],

      },

      Valid           : true,
      Field_1         : '',
      Rule_1          : [ v => v.length <= 20 && v.length >= 5 || "Możesz wpisać maksymalnie "
        + '20 znaków i minimum 5',  ],
      Rule_2          : [ v => v.length <= 20 && v.length >= 2 || "Możesz wpisać maksymalnie "
        + '20 znaków i minimum 2',  ],
      Rule_3          : [ v => v.length <= 3000 && v.length >= 2 || "Możesz wpisać maksymalnie "
        + '3000 znaków i minimum 2',  ],
      Rule_4          : [ v => !!v || "To pole musi być liczbą"],

    }
  },

  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      this.loader = null
    },

    form: {
      deep: true,

      handler()
      {
        this.enable_form = true
      }
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
        }),

      this.handleFileUpload();
  },

  methods: {
    close() {
      this.show=false;
    },

    addProduct()
    {

      const token = this.$cookie.get('token');

      let formData = new FormData;

      formData.append('photo', this.form.photo);
      formData.append('name', this.form.name);
      formData.append('manufacturer', this.form.manufacturer);
      formData.append('description', this.form.description);
      formData.append('price', this.form.price);

      axios.post('https://icnav.online/api/product/store/category/' +
        this.selectedCategoryId, formData, {

          headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type'  : "multipart/form-data"
          }
        })

        .then(() => {
          this.$root.$emit('refreshCategory', this.refresh_category_products += 1);
          this.loading = false;

        })

        .catch(err => {
          if (err.response.status == 422) {
            this.loading  = false;
            this.snackbar = true;
            this.text = 'Uzupełnij wszystkie pola';
            this.Valid = false;
          }

        })

    },

    handleFileUpload(){
      this.form.photo = this.$refs.file.files[0];
    }

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

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>

