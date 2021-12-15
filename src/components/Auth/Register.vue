<template>

  <div id="register">

    <input id="elo" type="text" v-model="name" />
    <p>{{getName()}}</p>
  </div>

</template>


<script>

export default {

  data() {
    return {
      name:'elo'
    };
  },
  methods: {

    getName()
    {
      return this.name;
    }
  }
}


</script>

<style>

#register {
  background-color: lightblue;
}

#elo {
  color: white;
  background-color:black;
}




</style>



