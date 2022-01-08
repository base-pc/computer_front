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

        <div class="cart-button">

          <v-btn color="primary"> <i class="fab fa-shopping-cart fa-2x"></i> Dodaj do koszyka</v-btn>

        </div>

      </div>

      <div class="store-comment">

        <div class="comment-input">

          <v-form lazy-validation v-model="Valid" ref="Form">
            <v-container class="text-center">
              <v-textarea
                v-model="form.opinion"
                filled
                height=100
                label="Dodaj komentarz i wystaw ocenę"
                :min="2"
                :counter="70"
                :value="Field_1"
                :rules="Rule_1"
                ></v-textarea>

            </v-container>
          </v-form>
        </div>

        <div class="comment-submit">
          <div class="set-rate">
            <v-rating background-color="black"
                      size="12"
                      :value="0"
                      color="black"></v-rating>

          </div>

          <v-btn
            :loading="loading"
            :disabled="!Valid || loading"

            @click="loader = 'loading', addComment()"
            color="success">Dodaj komentarz</v-btn>

        </div>

      </div>

      <v-btn @click="checkIfCommentsExist() ,loadComments()" color="normal" block>Załaduj komentarze</v-btn>
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
                                :value="product.rate"
                                color="black"></v-rating>

          </div>

        </div>
      </div>

    </v-card>
  </v-dialog>

</template>

<script>

import axios from "axios";

export default {

  props: {
    showDialog : Boolean,
    productId  : Number,
  },

  data() {
    return {
      show            : this.showDialog,
      products        : [],
      comments        : [],
      comments_exist  : true,
      snackbar        : false,
      text            : 'Ten produkt nie posiada jeszcze komentarzy ( ◔ ʖ̯ ◔ )',
      timeout         : 1500,
      product_id      : null,
      toggle_comments : false,
      loader          : null,
      loading         : false,
      Valid           : true,
      Field_1         : '',
      Rule_1          : [ v => v.length <= 10 && v.length >= 2 || "Możesz wpisać maksymalnie 70 "
        + 'znaków i minimum 5',  ],

      form: {
        opinion         : '',

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
      this.show=false;
    },

    getProductById()
    {
      this.product_id = this.productId;

      axios
        .get("https://icnav.online/api/product/show/" + this.product_id)
        .then(res => {
          this.products = res.data;
          this.comments = res.data[0].comments;
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
          this.loading = false;

        })

    }

  },

  beforeMount(){
    this.getProductById();
  },

}

</script>

<style>

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
}

.datail-rating {

  padding-top: 10px;
  margin-left:15%;

}

.cart-button {
  margin:auto;
}
</style>

