<template>

  <v-dialog v-model="show" max-width="600px" persistent>

    <v-card>

      <div class="close">
        <fa icon="times" size="2x" @click="close()"

                         />
      </div>

      <v-card-title class="justify-center">
        <p>Dodaj kategorię</p>
      </v-card-title>

      <div class="add_category_form">
        <v-form v-model="Valid" lazy-validation ref="form">
          <v-text-field
            v-model="form.name"
            label="Nazwa kategorii"
            :min="3"
            :counter="30"
            :value="Field_1"
            :rules="Rule_1"
            type="text"
            required
            ></v-text-field>

        </v-form>
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          class="justify-center"
          :loading="loading"
          :disabled="!Valid || loading || !enable_form"

          color="info"
          @click="loader = 'loading', addCategory()"
          >
          Dodaj
          <template v-slot:loader>
            <span class="custom-loader">
              <fa icon="spinner" size="2x"/>
            </span>
          </template>
        </v-btn>

      </v-card-actions>

    </v-card>
  </v-dialog>

</template>

<script>

import axios from 'axios';

export default {

  props: {
    showDialog: Boolean,
  },

  data() {
    return {
      show            : this.showDialog,
      loader          : null,
      loading         : false,
      refresh_sidebar : 0,
      enable_form     : false,
      Valid           : true,
      Field_1         : '',
      Rule_1          : [ v => v.length <= 30 && v.length >= 3 || "Możesz wpisać maksymalnie "
        + '10 znaków i minimum 3',  ],

      form: {
        name: '',
      },
    }
  },

  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      this.loader = null
    },

    show() {
      this.$refs.form.reset();
    },

    form: {
      deep: true,

      handler()
      {
        this.enable_form = true
      }
    }

  },

  methods: {

    close() {
      this.show=false;
    },

    addCategory()
    {
      const token = this.$cookie.get('token');

      axios.post('https://icnav.online/api/category/store', this.form, {

        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

        .then(() => {
          this.loading = false;
          this.$root.$emit('myEvent', this.refresh_sidebar += 1);

        })
    },

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

