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
        <v-btn class="justify-center" type="submit" color="primary"
                                                    @click="submitForm()">Rejestracja</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>

</template>

<script>

import axios from 'axios';

export default {

  name: 'Register',

  data() {
    return {
      register_dialog: null,

      form: {
        email                 : '',
        fullname              : '',
        password              : '',
        password_confirmation : '',
        is_admin              : false,

      },
    }
  },

  props: ["dialog"],

  methods: {
    close() {
      this.register_dialog=this.dialog;
    },

    submitForm()
    {
      axios.post('https://icnav.online/api/auth/register', this.form)
        .then(() => {

          this.dialog=false
          this.$router.push(this.$route.query.redirect || '/home')

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

</style>

