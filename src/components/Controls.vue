<!-- Big Component. In the future, it will be divided into subcomponents -->

<template lang="html">
  <div id="controls">
    <transition name="fade">
      <div class="time-stamp" v-show="isTimestampShow">{{currentTrackTime | formatTime}} / {{totalTrackTime | formatTime}}</div>
    </transition>

    <transition name="fade">
      <div class="volume-wrap no-app-drag" v-show="isVolumesliderShow">
        <input name="volumeslider" type="range">
      </div>
    </transition>

    <input name="timeslider" type="range">
    <div class="controls-bar">
      <div class="row middle-xs">
        <div class="col-xs-3">
          <div class="box button"><i class="material-icons" @click="downloadTrack">file_download</i></div>
        </div>
        <div class="col-xs-2">
          <div class="box button"><i class="material-icons" @click="backHistory">skip_previous</i></div>
        </div>
        <div class="col-xs-2">
          <div class="box button">
            <i class="material-icons" @click="clickBtnPlay">{{getIconBtnPlay}}</i>
          </div>
        </div>
        <div class="col-xs-2">
          <div class="box button"><i class="material-icons" @click="nextHistory">skip_next</i></div>
        </div>
        <div class="col-xs-3">
          <div class="box button">
            <i class="material-icons" @click="clickBtnSound">volume_up</i>
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
        currentTrackTime: 0,
        totalTrackTime: 0,
        timeTrackInPer: 0,
        isPlayTrack: true,
        isRestartTrackBtnShow: false,
        isDownloadedTrack: false,
        isTimestampShow: false,
        isVolumesliderShow: false
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
        this.isVolumesliderShow = false;
        this.player.currentTime = value*(this.totalTrackTime/100);
        this.currentTrackTime = this.player.currentTime;
      },
      setTrackVolume(value) {
        this.player.volume = value/100;
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
      clickBtnSound() {
        this.isTimestampShow = false;
        this.isVolumesliderShow = true;
        setTimeout(() => this.isVolumesliderShow = false, 5000);
      },
      clickBtnPlay() {
        if(this.isRestartTrackBtnShow) this.restartTrack()
        else if(this.isPlayTrack) this.stopTrack()
        else this.playTrack();
      },
      downloadTrack() {
        this.$emit('downloadTrack');
      },
      backHistory() {
        this.$emit('backHistory');
      },
      nextHistory() {
        this.$emit('nextHistory');
      },
      restartTrack() {
        this.isRestartTrackBtnShow = false;
        this.setTrackTime(0);
        this.playTrack();
      }
    },
    computed: {
      getIconBtnPlay() {
        if(this.isRestartTrackBtnShow) return "replay"
        else if(this.isPlayTrack) return "pause"
        else return "play_arrow";
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
        onSlide: (v) => this.setTrackTime(v),
        onSlideStart: () => this.isTimestampShow = true,
        onSlideEnd: () => this.isTimestampShow = false
      });

      this.volumeslider = document.querySelector('input[name="volumeslider"]');
      rangeSlider.create(this.volumeslider, {
        rangeClass: 'volumeslider',
        fillClass: 'volumeslider-fill',
        handleClass: 'volumeslider-handle',
        min: 0,
        max: 100,
        step: 1,
        value: 100,
        onSlide: (v) => this.setTrackVolume(v)
      });

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
    position: relative;
    height: 5%;
    background: #515970;
    cursor: pointer;
  }
  .timeslider:hover {
    height: 10%;
  }
  .timeslider-fill, .volumeslider-fill {
    position: relative;
    height: 100%;
    background: #2196F3;
  }
  .timeslider-handle, .volumeslider-handle {
    width: 10px;
    height: 100%;
    background: #2196F3;
    position: absolute;
  }
  .volume-wrap {
    position: absolute;
    left: 50%;
    width: 50%;
    height: 30px;
    margin-left: -25%;
    bottom: 115%;
    color: #fff;
    background: #434b60;
    text-align: center;
    line-height: 30px;
    padding-top: 0;
    font-size: 15px;
    border-radius: 20px;
    box-shadow: 0 0 10px #515970;
    font-family: Roboto;
  }
  .volumeslider {
    position: absolute;
    background: #515970;
    cursor: pointer;
    width: 85%;
    height: 5px;
    top: 12px;
    left: 12px;
  }

  .time-stamp {
    position: absolute;
    top: -50px;
    color: #fff;
    background: #434b60;
    text-align: center;
    width: 110px;
    line-height: 30px;
    left: 50%;
    margin-left: -50px;
    padding-top: 0;
    height: 30px;
    font-size: 15px;
    border-radius: 20px;
    box-shadow: 0 0 10px #515970;
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
