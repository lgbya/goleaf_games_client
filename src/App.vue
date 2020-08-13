<template>
  <div id="app" >
    <div >
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">GAME</b-navbar-brand>
      </b-navbar>
    </div>
    <div  class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',

  }
</script>

<style>

</style>
