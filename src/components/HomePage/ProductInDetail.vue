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
      <v-btn @click="loadComments()" color="normal" block>Załaduj komentarze</v-btn>

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

            <p>Adipisicing voluptatibus explicabo ipsam voluptas iste exercitationem ex. Veritatis molestias consequuntur quas quos incidunt fugit. Reiciendis quos repellat eum est aliquid exercitationem neque. Exercitationem deserunt.</p>
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
      show     : this.showDialog,
      products : [],
      comments :[],
      product_id : null,
      toggle_comments: false,
    }
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
          this.loading  = false;
          this.products = res.data;
          this.comments = res.data[0].comments;
        })

      console.log(this.comments);

    },

    loadComments()
    {
      this.toggle_comments = !this.toggle_comments;
      this.getProductById();
    }

  },

  beforeMount(){
    this.getProductById();
  },

}

</script>

<style>

.comment-form {
  display:flex;
  text-align: left;
  background-color:#FBF1C7;
  border-bottom: 2px black solid;
}

.comment-avatar {
  /*border: 2px black solid;*/
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

