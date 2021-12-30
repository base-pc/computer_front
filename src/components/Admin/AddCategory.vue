
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
        <v-form>
          <v-text-field
            label="Nazwa kategorii"
            type="text"
            required
            ></v-text-field>

        </v-form>
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="justify-center" color="primary"
                                      @click="close()">Dodaj</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>

</template>

<script>

export default {

  props: {
    showDialog: Boolean,
  },

  data() {
    return {
      switch1: false,
      show: this.showDialog,
    }
  },

  methods: {

    close() {
      this.show=false;
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

</style>

