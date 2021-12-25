
<template>
  <v-container>
    <v-app-bar
      fixed
      dense
      color="##B57614"


      height="14px"
      title="BASE-PC"
      elevation="0"
      dark
      >

      <template v-slot:extension>
        <v-app-title class="title"> BASE-PC </v-app-title>

        <div class="search">
          <v-text-field id="s"
                        fixed
                        dense
                        background-color="white"
                        color="black"
                        ></v-text-field>
        </div>

        <v-tabs optional>
          <v-spacer></v-spacer>
          <v-tab><v-btn>Wyloguj</v-btn>
          </v-tab>

          <div class="cart">
            <v-tab>
              <fa icon="shopping-cart" size="2x"/>
              <span class="counter">3</span>
            </v-tab>

          </div>

          <div class="avatar">
            <v-tab disabled>

              <v-avatar size="37">

                <img
                  src="https://f0.pngfuel.com/png/184/113/portrait-icon-user-profile-computer-icons-profile-png-clip-art.png"
                  alt="">

              </v-avatar>


            </v-tab>






          </div>
        </v-tabs>
      </template>
    </v-app-bar>
  </v-container>
</template>

<script>


export default {
  name: "UserNav",
};
</script>

<style>
.title {
  width: 200px !important;
}
#s {
  width: 400px;
  color:black;
}

.search {
  padding-top:20px;
  padding-left:10px
}

.counter {
  height: 17px;
  width: 17px;
  margin-bottom:17px;
  margin-left:2px;
  margin-top:10px;
  background-color: #bbb;
  color:black;
  border-radius: 50%;
  display: inline-block;
}

.avatar {
  padding-top:4px;
}

</style>

<style lang="scss">
$input-font-size: 72px;
</style>

