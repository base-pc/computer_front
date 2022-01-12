<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="400"
      >

      <div class="dialog-title">

        <i class="fas fa-trash-alt fa-2x"></i>
        <h3>Usuń kategorię</h3>

      </div>

      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="error"
          dark
          v-bind="attrs"
          v-on="on"
          ><i class="fas fa-trash-alt fa-2x"></i>
          Usuń
        </v-btn>
      </template>
      <v-card>
        <v-card-text class="text-h5">Na pewno chcesz usunąć tą kategorię
          produktów?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
            >
            Nie
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="deleteCategory()"
            >
            Tak
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

import axios from "axios";

export default {

  props: ['categoryId'],

  data () {
    return {
      dialog          : false,
      category_id     : this.categoryId,
      refresh_sidebar : 0,
      enable          : false,
    }
  },

  beforeMount()
  {
    this.checkIfCategoryIsEmpty();
  },

  methods: {

    closeDialog()
    {
      this.$emit('close-dialog')
    },

    checkIfCategoryIsEmpty()
    {
      if(this.categoryId.length == 0)
      {
        this.enable = false;
      }
    },

    deleteCategory()
    {
      const token = this.$cookie.get('token');

      axios.delete('https://icnav.online/api/category/' + this.categoryId +
        '/destroy'
        , {

          headers: {
            'Authorization' : `Bearer ${token}`,
          }
        })

        .then(() => {
          this.$root.$emit('myEvent', this.refresh_sidebar += 1);
          this.closeDialog();
          this.dialog = false;

        })

    },

  }

}
</script>

<style>

.dialog-title
{
  display:flex;
  background-color:#FF6060;
  color:white;
  align-items: center;
}

.dialog-title h3
{
  color:white;
  text-align:justify;
  vertical-align:middle;
  margin-top:5px;
  flex:5;
}

.dialog-title i
{
  flex:1;
}

</style>
