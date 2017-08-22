<template lang="html">
  <div id="controls">
    <div class="time-stamp" v-show="false">{{currentTrackTime | formatTime}} / {{totalTrackTime | formatTime}}</div>
    <input name="timeslider" type="range">
    <div class="controls-bar">
      <div class="row middle-xs">
        <div class="col-xs-3">
          <div class="box button"><i class="material-icons" @click="!isDownloadedTrack && downloadTrack()">{{!isDownloadedTrack ? "playlist_add" : "playlist_add_check"}}</i></div>
        </div>
        <div class="col-xs-2">
          <div class="box button"><i class="material-icons">skip_previous</i></div>
        </div>
        <div class="col-xs-2">
          <div class="box button">
            <!-- ugly logic -->
            <i class="material-icons" @click="isRestartTrackBtnShow ? restartTrack() : isPlayTrack ? stopTrack() : playTrack()">{{isRestartTrackBtnShow ? "replay" : isPlayTrack ? "pause" : "play_arrow"}}</i>
          </div>
        </div>
        <div class="col-xs-2">
          <div class="box button"><i class="material-icons">skip_next</i></div>
        </div>
        <div class="col-xs-3">
          <div class="box button">
            <i class="material-icons" @click="isSoundTrackOn ? offSoundTrack() : onSoundTrack()">{{isSoundTrackOn ? "volume_up" : "volume_mute"}}</i>
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
    data() {
      return {
        currentTrackTime: null,
        totalTrackTime: null,
        timeTrackInPer: 0,
        isPlayTrack: true,
        isRestartTrackBtnShow: false,
        isDownloadedTrack: false,
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
      },
      downloadTrack() {
        // this.isDownloadedTrack = true;
        this.$emit('downloadTrack');
      },
      restartTrack() {
        this.isRestartTrackBtnShow = false;
        this.setTrackTime(0);
        this.playTrack();
      }
    },
    mounted() {
      this.player = document.querySelector('video');

      this.timeslider = document.querySelector('input[name="timeslider"]');
      rangeSlider.create(this.timeslider, {
        rangeClass: 'timeslider',
        fillClass: 'timeslider-fill',
        handleClass: 'timeslider-handle',
        min: 0,
        max: 100,
        step: 1,
        value: 0,
        onSlide: this.setTrackTime.bind(this)
      });

      // this.volumeslider = document.querySelector('input[name="volumeslider"]');
      // rangeSlider.create(this.volumeslider, {
      //   rangeClass: 'volumeslider',
      //   fillClass: 'volumeslider-fill',
      //   handleClass: 'volumeslider-handle',
      //   min: 0,
      //   max: 1,
      //   step: 0.1,
      //   value: .7,
      //   onSlide: (v) => this.setTrackVolume(v)
      // });

      this.player.ontimeupdate = () => this.updateTime();
      this.player.onended = () => this.isRestartTrackBtnShow = true;
      this.player.onplay = () => this.isRestartTrackBtnShow = false;
    }
  }
</script>

<style lang="css">
  #controls {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 20%;
    background: #434b60;
    border-radius: 0 0 10px 10px;
  }
  .timeslider {
    width: 100%;
    height: 5%;
    background: #515970;
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
    background: #2196F3;
  }
  .timeslider-handle, .volumeslider-handle {
    width: 20px;
    height: 10px;
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
    font-size: 3em;
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
    color: #ffffff;
    text-align: center;
  }
  .button i {
    font-size: 2em;
    cursor: pointer;
    transition: all .5s;
  }
</style>
