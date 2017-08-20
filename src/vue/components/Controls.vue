<template lang="html">
  <div id="controls">
    <div class="time-stamp">{{currentTrackTime | formatTime}} / {{totalTrackTime | formatTime}}</div>
    <div class="progress-bar">
      <div class="tuls" v-bind:style="{width: timeTrackInPer + '%'}"></div>
    </div>
    <div class="controls-bar"></div>
  </div>
</template>

<script>
  module.exports = {
    name: 'controls',
    props: ['player'],
    data() {
      return {
        currentTrackTime: 0,
        totalTrackTime: 1,
        timeTrackInPer: 10
      }
    },
    filters: {
      formatTime(time) {
        if(time == null) return '00:00';

        time = Math.floor(time);
        let m = Math.floor(time / 60);
        let s = time - m*60;

        return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
      }
    },
    mounted() {
      setInterval(() => {
        this.currentTrackTime = this.player.currentTime;
        this.totalTrackTime = this.player.duration;
        this.timeTrackInPer = this.currentTrackTime / this.totalTrackTime * 100;
      }, 1000);
    }
  }
</script>

<style lang="css">
  #controls {
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 20%;
  }
  .progress-bar {
    width: 100vw;
    height: 5%;
    transition: all .5s;
    background: #FFC107;
    box-shadow: 0 0 10px #FFC107;
  }
  .progress-bar .tuls {
    position: relative;
    height: 100%;
    background: #FF5722;
    box-shadow: 0 0 10px #FF5722;
  }
  .time-stamp {
    position: absolute;
    top: -50px;
    color: #fff;
    background: #FFC107;
    text-align: center;
    width: 110px;
    line-height: 30px;
    left: 50%;
    margin-left: -50px;
    padding-top: 0;
    height: 30px;
    font-size: 15px;
    border-radius: 20px;
    box-shadow: 0 0 10px #FFC107;
    font-family: Roboto;
  }
  .controls-bar {
    width: 100%;
    height: 95%;
    background: #fff;
  }
</style>
