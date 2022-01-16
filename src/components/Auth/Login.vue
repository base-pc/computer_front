<template>

  <v-dialog v-model="login_dialog" max-width="400px" persistent>
    <template v-slot:activator="{ on }">
      <v-btn  v-on="on">Logowanie</v-btn>
    </template>
    <v-card>

      <div class="close">
        <fa icon="times" size="2x" @click="close()"/>
      </div>

      <v-card-title class="justify-center">
        <p>Zaloguj się</p>
      </v-card-title>

      <div class="login_form">
        <v-form>
          <v-text-field
            v-model="form.email"
            label="Adres email"
            type="email"
            required
            ></v-text-field>

          <v-text-field
            v-model="form.password"
            label="Hasło"
            type="password"
            required
            ></v-text-field>
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
        <v-btn @click="getGlobal()"> <i class="fab fa-google fa-2x"></i>Google</v-btn>
        <v-spacer></v-spacer>

        <v-btn
          class="justify-center"
          :loading="loading"
          :disabled="loading"
          color="info"
          @click="loader = 'loading', onSubmit()"
          >
          Logowanie
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
import {globalStore} from '../../main.js'

export default {

  name: 'Login',

  props: ["dialog"],

  data() {
    return {
      login_dialog : null,
      snackbar     : false,
      text         : 'Błędne dane logowania',
      timeout      : 2000,

      token        : null,
      loader       : null,
      loading      : false,
      is_admin     : false,
      user_avatar  : '',

      form: {
        email    : '',
        password : '',
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
      this.login_dialog=this.dialog;
    },

    onSubmit()
    {
      axios.post('https://icnav.online/api/auth/login', this.form)

        .then((res) => {
          this.loading     = false;
          this.token       = this.$cookie.set('token', res.data.access_token)
          this.is_admin    = res.data.is_admin;
          this.user_avatar = res.data.user_avatar;

          localStorage.setItem("user", res.data.user_avatar);

          globalStore.is_admin = this.is_admin;
          globalStore.logged_in = true;

          if(this.is_admin)
          {
            this.$router.push(this.$route.query.redirect || '/admin')

          }else {
            this.$router.push(this.$route.query.redirect || '/user')

          }

        })

        .catch(err => {
          if (err.response.status == 401) {
            this.text = 'Błędne dane logowania';
            this.snackbar   = true;
            this.loading    = false;
            this.form.email = '';
            this.form.password = '';

          }else if(err.response.status==422)
          {
            this.text = 'Uzupełnij dane logowania';
            this.snackbar = true;
            this.loading = false;

          }

        })
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
