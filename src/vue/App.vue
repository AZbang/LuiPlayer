<template>
  <div id="app">
    <i class="material-icons close-app-btn" @click="closeApp">close</i>
    <player></player>
  </div>
</template>

<script>
  const remote = require('electron').remote;
  const Player = require('./components/Player');

  module.exports = {
    name: 'app',
    methods: {
      closeApp() {
        remote.getCurrentWindow().close();
      }
    },
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
      -webkit-user-select: none;
      width: 100vw;
      height: 100vh;
  }
  .app-drag {
    -webkit-app-region: drag;
  }
  .no-app-drag {
    z-index: 1000;
    -webkit-app-region: no-drag;
  }
  input,
  button,
  textarea {
    -webkit-app-region: no-drag;
  }

  #app {
    height: 95vh;
    width: 95vw;
    left: 2.5%;
    top: 2.5%;
    box-shadow: 0 0 10px #434b60;
    position: absolute;
    border-radius: 10px;
    background: url('../assets/screen.png');
    font-family: Roboto;
  }

  .close-app-btn {
    position: absolute;
    right: 15px;
    top: 14px;
    color: #fff;
    cursor: pointer;
    z-index: 100000;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
