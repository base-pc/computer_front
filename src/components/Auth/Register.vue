<template>

  <v-dialog v-model="register_dialog" max-width="600px" persistent>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" >Rejestracja</v-btn>
    </template>
    <v-card>

      <div class="close">
        <fa icon="times" size="2x" @click="close()"

                         />
      </div>

      <v-card-title class="justify-center">
        <p>Zarejestruj się</p>
      </v-card-title>

      <div class="register_form">
        <v-form>
          <v-text-field
            v-model="form.email"
            label="Adres email"
            type="email"
            required
            ></v-text-field>

          <v-text-field
            v-model="form.fullname"
            label="Imię i nazwisko"
            required
            ></v-text-field>

          <v-text-field
            v-model="form.password"
            label="Hasło"
            type="password"
            required
            ></v-text-field>

          <v-text-field
            v-model="form.password_confirmation"
            label="Powtórz hasło"
            type="password"
            required
            ></v-text-field>
          <v-switch
            v-model="form.is_admin"
            :label="`Uprawniania administratora`"
            ></v-switch>
        </v-form>
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="ma-2"
          :loading="loading"
          :disabled="loading"
          color="info"
          @click="loader = 'loading', submitForm()"
          >
          Rejestracja
          <template v-slot:loader>
            <span class="custom-loader">
              <fa icon="spinner" size="2x"/>
            </span>
          </template>
        </v-btn>
      </v-card-actions>

      <p v-if="loading">Trwa zakładanie konta...</p>
    </v-card>
  </v-dialog>

</template>

<script>

import axios from 'axios';

export default {

  name: 'Register',

  props: ["dialog"],

  data() {
    return {
      register_dialog: null,
      loader: null,
      loading: false,

      form: {
        email                 : '',
        fullname              : '',
        password              : '',
        password_confirmation : '',
        is_admin              : false,

      },
    }
  },


  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      this.loader = null
    },
  },

  methods: {
    close() {
      this.register_dialog=this.dialog;
    },

    submitForm()
    {
      axios.post('https://icnav.online/api/auth/register', this.form)
        .then(() => {
          this.loading = false;
          this.register_dialog=false

        })
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

.register_form {
  margin-left:30px;
  margin-right:30px;
}

.v-btn::before {
  background-color: red;
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

