<template lang="html">
  <div id="main-screen">
    <img src="../assets/icon.png" alt="logo">
    <div>Lui<br>Youtube Music Player</div>
  </div>
</template>

<script>
  module.exports = {
    name: 'main-screen'
  }
</script>

<style lang="css">
  #main-screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../assets/bg.png');
    border-radius: 10px;

    z-index: 1000;
    text-align: center;
    color: #fff;
  }
  #main-screen img {
    width: 100px;
    box-sizing: border-box;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    top: 32%;
    left: 50%;
    margin-left: -50px;
    border: 15px solid rgba(255, 255, 255, .4);
    animation: wave 1s normal;
    animation-iteration-count: infinite;
  }
  @keyframes wave {
    0% {
      border-width: 15px;
    }
    50% {
      border-width: 5px;
    }
    100% {
      border-width: 15px;
    }
  }

  #main-screen div {
    margin-top: 70%;
    font-size: 24px;
    font-family: Roboto Thin;
  }
</style>
