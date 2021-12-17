<template>


  <v-container>

    <div class='sidebar'>


      <v-tabs vertical fixed centered background-color="#1d4647"
                                      color="white" center-active>


        <v-tab>
          <div class=imgpos>
            <v-img position="right" height=25 max-width=25 class="ml-auto">
              <img src="https://vectorified.com/images/monitor-icon-6.jpg" alt="">
            </v-img>
          </div>
          Monitory
        </v-tab>
        <v-tab>
          <div class=imgpos>
            <v-img position="right" height=25 max-width=25 class="ml-auto">
              <img src="https://vectorified.com/images/monitor-icon-6.jpg" alt="">
            </v-img>
          </div>
          Procesory
        </v-tab>
        <v-tab>
          <div class=imgpos>
            <v-img position="right" height=25 max-width=25 class="ml-auto">
              <img src="https://vectorified.com/images/monitor-icon-6.jpg" alt="">
            </v-img>
          </div>
          Pamięci RAM
        </v-tab>
        <v-tab>
          <div class=imgpos>
            <v-img position="right" height=25 max-width=25 class="ml-auto">
              <img src="https://vectorified.com/images/monitor-icon-6.jpg" alt="">
            </v-img>
          </div>
          Dyski twarde
        </v-tab>
        <v-tab>
          <div class=imgpos>
            <v-img position="right" height=25 max-width=25 class="ml-auto">
              <img src="https://vectorified.com/images/monitor-icon-6.jpg" alt="">
            </v-img>
          </div>
          Myszki
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-access-point
          </v-icon>
          Klawiatury
        </v-tab>

      </v-tabs>


    </div>



  </v-container>





</template>










<script>



export default {
  name: 'Sidebar',
  components: {
  },
}

</script>

<style>

.sidebar {
  height: auto; /* Full-height: remove this if you want "auto" height */
  width: auto; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 62px;
}


.v-image {
  display: inline-block;
}


.imgpos {
  margin:auto;
}



</style>


