<template>

  <v-dialog v-model="register_dialog" max-width="600px" ref="reset" persistent>
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

        <vue-recaptcha sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
        "
                       @verify="verify()"
                       @error="errorMessage()"
                       >
        </vue-recaptcha>

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
          class="white--text"
          :loading="loading"
          :disabled="!Valid || loading || !enable_form || !verify_captcha"

          color="#458588"
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
import { VueRecaptcha } from 'vue-recaptcha';

export default {

  name: 'Register',

  data() {
    return {
      register_dialog : null,
      snackbar        : false,
      text            : '',
      timeout         : 1500,
      enable_form     : false,
      verify_captcha  : false,
      siteKey: process.env.VUE_APP_CAPCHA,

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

  components: {
    VueRecaptcha
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
    },

    register_dialog() {
      this.$refs.form.reset()
    }
  },

  methods: {
    close() {
      this.register_dialog = this.dialog;

    },

    setShowTimeout() {
      setTimeout(() => {
        this.close();
      }, 2000);
    },


    verify()
    {
      this.verify_captcha = true;
    },

    errorMessage()
    {
      this.snackbar = true;
      this.text('Jesteś robotem :(');
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
          this.loading  = false;
          this.snackbar = true;
          this.text     = "Konto zostało założone"
          this.setShowTimeout();

        })

        .catch(err => {
          if (err.response.status == 422) {
            this.snackbar                 = true;
            this.text                     = 'Podany adres email jest zajęty';
            this.loading                  = false;
            this.$refs.recaptcha.reset();
            this.form.email               = '';

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

