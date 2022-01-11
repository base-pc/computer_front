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
        <v-form v-model="Valid" lazy-validation ref="form">
          <v-text-field
            clearable
            v-model="form.email"
            label="Adres email"
            :min="3"
            :counter="30"
            :value="Field_1"
            :rules="Rule_1"
            type="email"
            required
            @change="validateEmail(form.email)"
            ></v-text-field>

          <v-text-field
            clearable
            v-model="form.fullname"
            :min="2"
            :counter="25"
            :value="Field_1"
            :rules="Rule_2"
            label="Imię i nazwisko"
            required
            ></v-text-field>

          <v-text-field
            clearable
            v-model="form.password"
            :min="2"
            :counter="25"
            :value="Field_1"
            :rules="Rule_3"
            label="Hasło"
            type="password"
            required
            ></v-text-field>

          <v-text-field
            clearable
            v-model="form.password_confirmation"
            :min="2"
            :counter="25"
            :value="Field_1"
            :rules="Rule_4"
            label="Powtórz hasło"
            type="password"
            required
            ></v-text-field>
          <v-switch
            v-model="form.is_admin"
            :label="`Uprawniania administratora`"
            ></v-switch>
        </v-form>
        <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
          light
          centered
          elevation
          color="#FBF1C7"
          >{{text}}</v-snackbar>
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="ma-2"
          :loading="loading"
          :disabled="!Valid || loading"

          color="info"
          @click="loader = 'loading', submitForm(), clearForm()"
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
      register_dialog : null,
      snackbar        : false,
      text            : 'Podany adres email jest zajęty : (',
      timeout         : 1500,

      loader          : null,
      loading         : false,
      valid_email     : '',
      Valid           : false,
      Field_1         : '',
      Rule_1          : [ v=>!!v || 'To pole jest wymagane', v =>
        /.+@.+/.test(v) || 'Błędny adres email', v=> !!v],

      Rule_2          : [ v=>!!v || 'To pole jest wymagane', v => v.length <= 25
        || 'Możesz wpisać maksymalnie 25 znaków', v=>v.length>=2 ||
        'Musisz wpisać minumum 2 znaki'],

      Rule_3 : [ v => !!v || 'To pole jest wymagane', v=> v.length >= 6||
        'Hasło musi posiadać minimum 6 znaków' ],

      Rule_4: [ v => !!v || 'Potwierdź hasło', v => v === this.form.password ||
        'Hasła nie są jednakowe'],

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

    register_dialog() {
      this.$refs.form.reset()
    }
  },

  methods: {
    close() {
      this.register_dialog=this.dialog;
    },

    validateEmail(email) {

      var re = /^[^\s@]+@[^\s@]+$/;

      if (re.test(email)) {

        console.log(email + " is a valid email address");
        this.valid_email = true;
      }

      else {
        console.log(email + " is an invalid email address");
        this.valid_email = false;
      }
    },

    submitForm()
    {
      axios.post('https://icnav.online/api/auth/register', this.form)
        .then(() => {
          this.loading         = false;
          this.register_dialog = false

        })

        .catch(err => {
          if (err.response.status == 422) {
            this.snackbar   = true;
            this.loading    = false;
            this.form.email = '';

          }

        })
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

