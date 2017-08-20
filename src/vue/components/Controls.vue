<template lang="html">
  <div id="controls">
    <div class="time-stamp" v-show="false">{{currentTrackTime | formatTime}} / {{totalTrackTime | formatTime}}</div>
    <input name="timeslider" type="range">
    <div class="controls-bar">
      <div class="row middle-xs">
        <div class="col-xs-2">
          <div class="box button"><i class="fa fa-download" aria-hidden="true"></i></div>
        </div>
        <div class="col-xs-2"></div>
        <div class="col-xs-1">
          <div class="box button"><i class="fa fa-backward" aria-hidden="true"></i></div>
        </div>
        <div class="col-xs-1">
          <div class="box button">
            <i class="fa"
               :class="{'fa-play': !isPlayTrack, 'fa-pause': isPlayTrack}"
               @click="isPlayTrack ? stopTrack() : playTrack()"
               aria-hidden="true"
            ></i>
          </div>
        </div>
        <div class="col-xs-1">
          <div class="box button"><i class="fa fa-forward" aria-hidden="true"></i></div>
        </div>
        <div class="col-xs-2"></div>
        <div class="col-xs-3">
          <div class="volumeslider-wrap">
            <label for="volumeslider">
              <i class="fa volumeslider-icon"
                 :class="{'fa-volume-off': !isSoundTrackOn, 'fa-volume-up': isSoundTrackOn}"
                 @click="isSoundTrackOn ? offSoundTrack() : onSoundTrack()"
                 aria-hidden="true"
              ></i>
            </label>
            <input name="volumeslider" type="range">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const rangeSlider = require('rangeslider-pure');

  module.exports = {
    name: 'controls',
    props: ['player'],
    data() {
      return {
        currentTrackTime: null,
        totalTrackTime: null,
        timeTrackInPer: 10,
        isPlayTrack: true,
        isSoundTrackOn: true
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
    methods:  {
      setTrackTime(value) {
        this.player.currentTime = value*(this.totalTrackTime/100);
        this.updateTime();
      },
      setTrackVolume(value) {
        this.player.volume = value;
      },
      updateTime() {
        this.currentTrackTime = this.player.currentTime;
        this.totalTrackTime = this.player.duration;
        this.timeTrackInPer = this.currentTrackTime / this.totalTrackTime * 100;
        this.timeslider.rangeSlider.update({value: this.timeTrackInPer});
      },
      stopTrack() {
        this.isPlayTrack = false;
        this.player.pause();
      },
      playTrack() {
        this.isPlayTrack = true;
        this.player.play();
      },
      offSoundTrack() {
        this.isSoundTrackOn = false;
        this.player.volume = 0;
      },
      onSoundTrack() {
        this.isSoundTrackOn = true;
        this.player.volume = 1;
      }
    },
    mounted() {
      this.timeslider = document.querySelector('input[name="timeslider"]');
      rangeSlider.create(this.timeslider, {
        rangeClass: 'timeslider',
        fillClass: 'timeslider-fill',
        handleClass: 'timeslider-handle',
        min: 0,
        max: 100,
        step: .1,
        value: 0,
        onSlide: (v) => this.setTrackTime(v)
      });

      this.volumeslider = document.querySelector('input[name="volumeslider"]');
      rangeSlider.create(this.volumeslider, {
        rangeClass: 'volumeslider',
        fillClass: 'volumeslider-fill',
        handleClass: 'volumeslider-handle',
        min: 0,
        max: 1,
        step: 0.1,
        value: .7,
        onSlide: (v) => this.setTrackVolume(v)
      });

      setInterval(() => this.updateTime(), 1000);
    }
  }
</script>

<style lang="css">
  #controls {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 20%;
    background: rgba(255, 255, 255, .3);
  }
  .timeslider {
    width: 100%;
    height: 5%;
    transition: all .5s;
    background: #FFC107;
    box-shadow: 0 0 10px #FFC107;
    transition: all .5s;
    cursor: pointer;
  }
  .timeslider:hover {
    height: 10%;
  }
  .timeslider-fill, .volumeslider-fill {
    position: relative;
    transition: all .5s;
    height: 100%;
    background: #FF5722;
    box-shadow: 0 0 10px #FF5722;
  }
  .timeslider-handle, .volumeslider-handle {
    width: 20px;
    height: 100%;
    position: absolute;
  }
  .volumeslider-wrap {
    position: relative;
  }
  .volumeslider {
    position: absolute;
    top: 11px;
    background: #FFC107;
    cursor: pointer;
    left: 42px;
    width: 65%;
    height: 10px;
  }
  .volumeslider-icon {
    font-size: 2em;
    color: #FFC107;
    cursor: pointer;
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
  }
  .controls-bar .row {
    height: 100%;
  }
  .button {
    font-size: 2.4em;
    color: #FFC107;
    text-align: center;
  }
  .button i {
    cursor: pointer;
    transition: all .5s;
  }
  .button i:hover {
    color: #FF5722;
    text-shadow: 0 0 10px #FF5722;
  }
</style>
