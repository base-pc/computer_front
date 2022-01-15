<template>
  <v-dialog v-model="show" max-width="600px" persistent>

    <template v-slot:activator="{on, attrs}">
      <v-btn

        color="success"
        dark
        v-bind="attrs"
        v-on="on"
        ><i class="fas fa-pen-square fa-2x"></i>Aktualizuj

      </v-btn>
    </template>

    <v-card>

      <div class="close">
        <fa icon="times" size="2x" @click="close()"

                         />
      </div>

      <div class="dialog-title-update">

        <i class="fas fa-pen-square fa-2x"></i>
        <h3>Aktualizuj produkt</h3>

      </div>




      <div class="add_product_form">
        <v-form v-model="Valid" v-for="product in products" :key="product.id" lazy-validation>

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
            :placeholder="product.name"
            v-model="name"
            :min="5"
            :counter="20"
            :value="Field_1"
            :rules="Rule_1"
            label="Nazwa produktu"
            type="text"
            ></v-text-field>
          <v-text-field
            :placeholder="product.manufacturer"
            v-model="manufacturer"
            :min="2"
            :counter="20"
            :value="Field_1"
            :rules="Rule_2"
            label="Producent"
            type="text"
            ></v-text-field>
          <v-text-field
            :placeholder="product.description"
            v-model="description"
            :min="2"
            :counter="3000"
            :value="Field_1"
            :rules="Rule_3"
            label="Opis"
            type="text"
            ></v-text-field>
          <v-text-field
            :placeholder="product.price"
            v-model="price"
            :min="1"
            :value="Field_1"
            :rules="Rule_4"
            label="Cena"
            type="numeric"
            ></v-text-field>
          <v-text-field
            :placeholder="product.quantity"
            v-model="quantity"
            :min="1"
            :value="Field_1"
            :rules="Rule_4"
            label="Ilość"
            type="text"
            ></v-text-field>

          <v-file-input
            :min="0"
            :value="Field_1"
            :rules="Rule_4"
            type="file"
            @change="handleFileUpload()"
            v-model="photo"
            placeholder="Dodaj zdjęcie"
            prepend-icon="fa-camera"
            label="Zdjęcie poglądowe"
            ></v-file-input>

        </v-form>
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="justify-center"
               color="primary"
               :loading="loading"
               :disabled="!Valid || loading"
               @click.stop=" loader='loading', addProduct()">Aktualizuj

               <template v-slot:loader>
                 <span class="custom-loader">
                   <fa icon="spinner" size="2x"/>
                 </span>
               </template>

        </v-btn>

        <v-btn @click="getProductById()">Pobierz produkt</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>

</template>

<script>

import axios from "axios";

export default {

  name: 'UpdateProduct',

  props: {
    showDialog: Boolean,
    productId  : Number,

  },

  data() {
    return {
      show               : this.showDialog,
      selectedCategoryId : '',
      loading            : false,
      loader             : null,
      refresh_category_products: 0,
      products: [],
      dbOptions          : [],


      photo        : '',
      name         : '',
      manufacturer : '',
      description  : '',
      price        : '',
      quantity     : '',

      Valid           : true,
      Field_1         : '',
      Rule_1          : [ v => v.length <= 20 && v.length >= 5 || "Możesz wpisać maksymalnie "
        + '20 znaków i minimum 5',  ],
      Rule_2          : [ v => v.length <= 20 && v.length >= 2 || "Możesz wpisać maksymalnie "
        + '20 znaków i minimum 2',  ],
      Rule_3          : [ v => v.length <= 3000 && v.length >= 2 || "Możesz wpisać maksymalnie "
        + '3000 znaków i minimum 2',  ],
      Rule_4          : [ v => !!v || "To pole jest wymagane"],

    }
  },

  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      this.loader = null
    },
  },

  mounted()
  {
    this.getProductById();
    this.fetchCategories();
  },


  methods: {
    close() {
      this.show=false;
    },

    fetchCategories()
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



    getProductById()
    {
      this.product_id = this.productId;

      axios
        .get("https://icnav.online/api/product/show/" + this.product_id)
        .then(res => {
          this.products = res.data;
          this.loading  = false;

        })

      console.log(this.products);

    },


    addProduct()
    {

      const token = this.$cookie.get('token');

      let formData = new FormData;

      formData.append('photo', this.photo);
      formData.append('name', this.name);
      formData.append('manufacturer', this.manufacturer);
      formData.append('description', this.description);
      formData.append('price', this.price);
      formData.append('quantity', this.quantity);

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
            this.loading = false;
            alert('Uzupełnij wszystkie pola')
          }

        })

    },

    handleFileUpload(){
      this.photo = this.$refs.file.files[0];
    }

  },

};

</script>

<style>

.dialog-title-update {

  display:flex;
  background-color:#47A44B;
  color:white;
  align-items: center;
}
.dialog-title-update h3
{
  color:white;
  text-align:justify;
  vertical-align:middle;
  margin-top:5px;
  flex:5;

}

.dialog-title-update i
{
  flex:1;
}


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

