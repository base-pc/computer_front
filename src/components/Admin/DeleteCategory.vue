
<template>

  <v-dialog v-model="show" max-width="600px" persistent>

    <v-card>

      <div class="close">
        <fa icon="times" size="2x" @click="closeDialog()"

                         />
      </div>

      <v-card-title class="justify-center">
        <p>Usuń kategorię</p>
      </v-card-title>

      <div class="delete_category_form">
        <v-form ref="form">

          <v-select
            :items="dbOptions"
            v-model="selectedCategoryId"
            item-text="name"
            item-value="id"
            label="Kategoria"
            >
          </v-select>

        </v-form>
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>

        <div class="delete-category">

          <DeleteCategoryPopup

            :category-id="selectedCategoryId"
            @close-dialog="closeDialog"
            @click="showSelected()"

            />

        </div>

      </v-card-actions>

    </v-card>
  </v-dialog>

</template>

<script>

import axios from 'axios';

import DeleteCategoryPopup from './DeleteCategoryPopup.vue';

export default {

  props: {
    showDialog: Boolean,
  },

  data() {
    return {
      show            : this.showDialog,
      selectedCategoryId : '',
      dbOptions          : [],

      loader          : null,
      loading         : false,
      refresh_sidebar : 0,

    }
  },

  components: {DeleteCategoryPopup},

  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      this.loader = null
    },

    show() {
      this.$refs.form.reset();
    },
  },

  mounted()
  {
    axios.get('https://icnav.online/api/category/all')

      .then(r => {
        for (let i = 0; i < r.data.length; i++) {
          this.dbOptions.push(r.data[i])
        }
      },
        error => {
          console.error(error)
        })
  },

  methods: {

    closeDialog() {
      this.show=false;
    },
  },
}

</script>

<style>

.delete-category{
  margin-bottom:10px;
  margin-right:10px;
}

.close {
  text-align:right;
  padding-right:10px;
  padding-top:10px;
}

.delete_category_form {
  margin-left:30px;
  margin-right:30px;
}

</style>

