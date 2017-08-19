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
  body {
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
</style>
