<template>

  <v-container>

    <v-app-bar fixed dense color="#1d4647"

                           height="14px"
                           title="BASE-PC"
                           elevation=0.2

                           dark>
      <template v-slot:extension>

        <v-app-title class="title">
          BASE-PC
        </v-app-title>


        <div class=search>
          <v-text-field fixed dense background-color="yellow"
                                    color="black"

                                    ></v-text-field>
        </div>


        <v-tabs>

          <v-spacer></v-spacer>
          <v-tab>Rejestracja</v-tab>
          <v-tab>Logowanie</v-tab>
        </v-tabs>
      </template>

    </v-app-bar>

  </v-container>


</template>

<script>



export default {
  name: 'Nav',
  components: {
  },
}

</script>

<style>

.title {
  width:200px !important;
}
</style>

<style lang="scss">

$input-font-size: 72px;









</style>

