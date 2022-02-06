<template>

  <v-dialog v-model="dialog" max-width="400px" persistent>
    <v-card>

      <div class="close">
        <fa icon="times" size="2x" @click="close(), dialog=false"/>
      </div>

      <v-card-title class="justify-center">
        <p>Resetuj hasło</p>
      </v-card-title>

      <div class="login_form">
        <v-form  v-model="Valid" lazy-validation>
          <v-text-field
            v-model="form.email"
            label="Adres email"
            type="email"
            :value="Field_1"
            :rules="Rule_1"

            required
            @change="validateEmail(form.email)"

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






        </v-form>
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          class="white--text"
          :loading="loading"
          :disabled="!Valid || loading "
          color="#458588"
          @click="loader = 'loading', onSubmit()"
          >
          Resetuj hasło
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
//import axios from 'axios';

  export default {

    name: 'ResetPasswordRequest',

    props: ["dialog"],

    data() {
      return {
        snackbar    : false,
        text        : '',
        timeout     : 2000,
        enable_form : false,
        valid_email : '',
        Valid       : false,
        Field_1     : '',

        loader       : null,
        loading      : false,

        Rule_1          : [ v=>!!v || 'To pole jest wymagane', v =>
          /.+@.+/.test(v) || 'Błędny adres email', v=> !!v],
        Rule_3 : [ v => !!v || 'To pole jest wymagane', v=> v.length >= 6||
          'Hasło musi posiadać minimum 6 znaków' ],
        Rule_4: [ v => !!v || 'Potwierdź hasło', v => v === this.form.password ||
          'Hasła nie są jednakowe'],


        form: {
          email                 : '',
          password              : '',
          password_confirmation : '',
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
        this.dialog = false;
        this.$router.push(this.$route.query.redirect || '/home')
      },

      validateEmail(email) {

        var re = /^[^\s@]+@[^\s@]+$/;

        if (re.test(email)) {

          this.valid_email = true;
        }

        else {
          this.valid_email = false;
        }
      },

      onSubmit()
      {
        this.snackbar = true;
        this.text = "Na sprawdź swoją pocztę"
      }

    }
  };

</script>

<style>

.close {
  text-align:right;
  padding-right:10px;
  padding-top:10px;
}

.login_form {
  margin-left:30px;
  margin-right:30px;
}

i {
  margin-left:8px;
  padding-right:10px;
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
