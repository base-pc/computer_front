<template>
  <v-container>
    <div class="sidebar">
      <v-tabs vertical fixed background-color="white" color="black">
        <v-tab>
          Monitory
        </v-tab>
        <v-tab>
          Procesory
        </v-tab>
        <v-tab>
          Pamięci RAM
        </v-tab>
        <v-tab>
          Dyski twarde
        </v-tab>
        <v-tab>
          Myszki
        </v-tab>
        <v-tab>
          Klawiatury
        </v-tab>
      </v-tabs>
    </div>
  </v-container>
</template>


<script>
export default {
  name: "Sidebar",
  components: {},
};
</script>

<style>
.sidebar {
  height: 100%;
  width: auto;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding-top: 63px;
  margin-top: 10px;
  background-color: white;
  border: 3px black solid;
}

</style>


