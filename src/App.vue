<template>
  <v-app>
    <div id="app">
      <router-view name="dialog"></router-view>
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color:#FBF1C7;
}
</style>
