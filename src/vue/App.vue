<template>
  <div id="app">
    <player></player>
  </div>
</template>

<script>
  const Player = require('./components/Player');

  module.exports = {
    name: 'app',
    components: {
      Player
    }
  }
</script>

<style>
  #app {
    height: 95vh;
    width: 95vw;
    left: 2.5%;
    top: 2.5%;
    box-shadow: 0 0 10px #434b60;
    position: absolute;
    border-radius: 10px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
