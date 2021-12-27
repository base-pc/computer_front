<template>

  <v-dialog v-model="dialog" max-width="600px" persistent>
    <template v-slot:activator="{ on }">
      <v-button v-on="on" >Rejestracja</v-button>
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
            label="Adres email"
            type="email"
            required
            ></v-text-field>

          <v-text-field
            label="Imię i nazwisko"
            required
            ></v-text-field>

          <v-text-field
            label="Hasło"
            type="password"
            required
            ></v-text-field>

          <v-text-field
            label="Powtórz hasło"
            type="password"
            required
            ></v-text-field>
          <v-switch
            v-model="switch1"
            :label="`Uprawniania administratora`"
            ></v-switch>
        </v-form>
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="justify-center" color="primary"
                                      @click="close()">Rejestracja</v-btn>
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

.register_form {
  margin-left:30px;
  margin-right:30px;
}

.v-btn::before {
  background-color: red;
}

</style>

