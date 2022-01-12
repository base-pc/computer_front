<template>

  <v-dialog v-model="show" max-width="1080" persistent>
    <v-card v-for="product in products" :key="product.id">

      <div class="close">
        <fa icon="times" size="2x" @click="close()"

                         />
      </div>

      <div class="title">
        <p>{{product.name}}</p>
      </div>

      <div class="flex-container">

        <div class="img">
          <v-img
            max-height="400"
            max-width="400"
            :src="product.photo_url"
            ></v-img>
        </div>

        <div class="product-detail">

          <h2 style="color:red">Cena: {{product.price}} PLN</h2>
          <p style="font-weight:bold">Producent: {{product.manufacturer}}</p>
          <p>{{product.description}}</p>

        </div>
      </div>

      <div class="flex-container2">

        <div class="datail-rating">

          <v-rating  readonly background-color="black"
                              half-increments
                              size="27"
                              :value="product.rate"
                              color="black"></v-rating>

                            {{product.rate}}({{product.rates_time}})

        </div>

        <div class="cart-button" v-if="!admin && admin!=null">

          <v-btn color="primary"> <i class="fab fa-shopping-cart fa-2x"></i> Dodaj do koszyka</v-btn>

        </div>

        <div class="update-button" v-if="admin">

          <v-btn color="success"> <i class="fas fa-pen-square
          fa-2x"></i>Aktualizuj</v-btn>

        </div>

        <div class="delete-button" v-if="admin">

          <DeleteProductPopup

            :product-id="product_id"
            @close-dialog="closeDialog"

            />

        </div>

      </div>

      <div class="store-comment" v-if="!admin && admin!=null">

        <div class="comment-input">

          <v-form lazy-validation v-model="Valid" ref="Form">
            <v-container class="text-center">
              <v-textarea
                v-model="form.opinion"
                filled
                height=100
                label="Dodaj komentarz i wystaw ocenę"
                :min="2"
                :counter="250"
                :value="Field_1"
                :rules="Rule_1"
                ></v-textarea>

            </v-container>
          </v-form>

        </div>

        <div class="comment-submit">
          <div class="set-rate">
            <v-rating @click.stop="test()" background-color="black"
                                           size="12"
                                           clearable

                                           hover
                                           v-model="form1.rate"
                                           color="black"></v-rating>

          </div>

          <v-btn
            :loading="loading"
            :disabled="!Valid || loading"

            @click="loader = 'loading',addRate(), addComment()"
            color="success">Dodaj komentarz

            <template v-slot:loader>
              <span class="custom-loader">
                <fa icon="spinner" size="2x"/>
              </span>
            </template>

          </v-btn>

        </div>

      </div>

      <v-btn
        :loading="loading"
        @click="loader = 'loading', checkIfCommentsExist() ,loadComments()" color="normal" block>Załaduj komentarze

        <template v-slot:loader>
          <span class="custom-loader">
            <fa icon="spinner" size="2x"/>
          </span>
        </template>

      </v-btn>
      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        light
        centered
        elevation
        color="#FBF1C7"
        >{{text}}</v-snackbar>

      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>

      <div v-if="toggle_comments" class="comment-main">

        <div class="comment-form" v-for="comment in comments" :key="comment.id">

          <div class="comment-avatar">

            <v-avatar size="55">

              <img
                :src="comment.author_avatar"
                alt="">

            </v-avatar>

          </div>

          <div class="comment-content">

            <h4>{{comment.comment_author}}</h4>

            <p>{{comment.opinion}}</p>
          </div>

          <div class="my-rate">
            <v-rating  readonly background-color="black"
                                half-increments
                                size="12"
                                :value="comment.myrate"
                                color="black"></v-rating>

          </div>
        </div>
      </div>

    </v-card>

  </v-dialog>

</template>

<script>

import axios from "axios";
import {globalStore} from '../../main.js'
import DeleteProductPopup from '../Admin/DeleteProductPopup.vue'

export default {

  props: {
    showDialog : Boolean,
    productId  : Number,
  },

  data() {
    return {
      show  : this.showDialog,
      admin : globalStore.is_admin,

      refresh_category                   : 0,
      products                           : [],
      comments                           : [],
      comments_exist                     : true,
      snackbar                           : false,
      text                               : '',
      timeout                            : 1500,
      product_id                         : null,
      toggle_comments                    : false,
      loader                             : null,
      loading                            : false,
      Valid                              : true,
      Field_1                            : '',
      Rule_1                             : [ v => v.length <= 250 && v.length >= 2 || "Możesz wpisać maksymalnie"
        + ' 250 znaków i minimum 2',  ],

      form: {
        opinion         : '',

      },

      form1: {
        rate: null,
      },

    }
  },


  components: {DeleteProductPopup},

  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      this.loader = null
    },
  },

  methods: {

    closeDialog()
    {
      this.show = false;
    },

    close() {
      this.show=false;
      this.$root.$emit('refreshCategory', this.refresh_category += 1);

    },

    getProductById()
    {
      this.product_id = this.productId;

      axios
        .get("https://icnav.online/api/product/show/" + this.product_id)
        .then(res => {
          this.products = res.data;
          this.comments = res.data[0].comments;
          this.loading  = false;

        })

      console.log(this.comments);

    },

    loadComments()
    {
      this.toggle_comments = !this.toggle_comments;
      this.getProductById();
    },

    checkIfCommentsExist()
    {

      if(this.comments.length == 0)
      {
        this.comments_exist = false;
        this.text = 'Ten produkt nie posiada jeszcze komentarzy';
        this.snackbar = true;
      }
    },

    addComment()
    {
      const token = this.$cookie.get('token');

      axios.post('https://icnav.online/api/product/comment/' +
        this.product_id + '/' + 'store', this.form, {

          headers: {
            'Authorization' : `Bearer ${token}`,
          }
        })

        .then(() => {

          this.getProductById();
          this.form.opinion = "";
          this.loading      = false;

        })

        .catch(err => {
          if (err.response.status == 422) {
            this.text = 'Uzupełnij pole jeżeli chcesz dodać komentarz';
            this.snackbar = true;
          }
        })

    },

    addRate()
    {
      const token = this.$cookie.get('token');

      axios.post('https://icnav.online/api/product/rate/' +
        this.product_id, this.form1, {

          headers: {
            'Authorization' : `Bearer ${token}`,
          }
        })

        .then((res) => {

          this.myrate     = res.rate;
          this.form1.rate = null;

        })

        .catch(err => {
          if (err.response.status == 422) {
            this.text = 'Wymagana ocena produktu';
            this.snackbar = true;
          } else if(err.response.status == 403)
          {
            this.text = 'Oceniłeś ten produkt wcześniej';
            this.snackbar = true;
          }

        })

    },

  },

  mounted: function () {
    this.$root.$on('close-dialog', (text) => {
      this.show = text;
    })
  },


  beforeMount(){
    this.getProductById();
  },

}

</script>

<style>

.update-button
{
  margin-left:20%;
  flex:4;
}

.delete-button
{

  flex: 2;
}


.store-comment {
  display:flex;
}

.comment-input {

  flex:1;

}

.comment-submit {
  margin:auto;
  padding-bottom:35px;
  padding-right:20px;
}

.set-rate {
  margin-bottom:5%;

}

.comment-form {
  display:flex;
  text-align: left;
  background-color:#FBF1C7;
  border-bottom: 2px black solid;
}

.comment-avatar {
  margin:auto;
  padding-left:15px;

}

.comment-content {
  font-style:italic;
  text-align:left;
  flex:2;
  margin-left:2%;

}

.comment-content h4 {

  font-style:normal;

}

.my-rate {
  margin:auto;
  padding-right:20px;
}

.close {
  text-align:right;
  padding-right:10px;
  padding-top:10px;
}

.product-detail {
  text-align:left;
  margin:auto;
  padding-right:20px;
  text-align:justify;

}

.flex-container {
  display:flex;

}

.img {
  margin-left: 7%;
}

.title {
  margin:auto;

}

.title p {
  font-size: 1.7em;
  color:black;
}

.flex-container2 {
  display:flex;
  align-items: center;
}

.datail-rating {

  padding-top: 10px;
  margin-left:15%;

}

.cart-button {
  margin:auto;
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

