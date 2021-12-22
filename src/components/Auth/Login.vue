<template>

  <v-dialog v-model="dialog" max-width="400px" overlay-color="white" persistent>
    <template v-slot:activator="{ on }">
      <v-btn  v-on="on" class="success">Logowanie</v-btn>
    </template>
    <v-card>

      <div class="close">
        <fa icon="times" size="1x" @click="close()"/>
      </div>

      <v-card-title class="justify-center">
        <p>Zaloguj się</p>
      </v-card-title>

      <div class="login_form">
        <v-form>
          <v-text-field
            label="Adres email"
            type="email"
            required
            ></v-text-field>

          <v-text-field
            label="Hasło"
            type="password"
            required
            ></v-text-field>
        </v-form>
      </div>

      <v-card-actions>
        <v-btn> <i class="fab fa-google fa-2x"></i>Google</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="justify-center" color="primary" @click="close()">Logowanie
        </v-btn>
      </v-card-actions>


    </v-card>
  </v-dialog>

</template>

<script>

export default {

  data() {
    return {
      switch1: false
    }
  },

  props: ["dialog"],
  methods: {
    close() {
      this.dialog=false;
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

.login_form {
  margin-left:30px;
  margin-right:30px;
}

i {
  margin-left:8px;
  padding-right:10px;
}

</style>
