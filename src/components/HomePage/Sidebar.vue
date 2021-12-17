<template>


  <v-container>

    <div class='sidebar'>
      <div class=links>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>

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
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 160px; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: yellow; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
  color: black;
}

.sidebar a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
}

</style>


