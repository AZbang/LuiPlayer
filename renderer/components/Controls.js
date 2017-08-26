var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n#controls {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 20%;\n  background: #434b60;\n  border-radius: 0 0 10px 10px;\n}\n.timeslider {\n  width: 100%;\n  position: relative;\n  height: 5%;\n  background: #515970;\n  cursor: pointer;\n}\n.timeslider:hover {\n  height: 10%;\n}\n.timeslider-fill, .volumeslider-fill {\n  position: relative;\n  height: 100%;\n  background: #2196F3;\n}\n.timeslider-handle, .volumeslider-handle {\n  width: 10px;\n  height: 100%;\n  background: #2196F3;\n  position: absolute;\n}\n.volume-wrap {\n  position: absolute;\n  left: 50%;\n  width: 50%;\n  height: 30px;\n  margin-left: -25%;\n  bottom: 115%;\n  color: #fff;\n  background: #434b60;\n  text-align: center;\n  line-height: 30px;\n  padding-top: 0;\n  font-size: 15px;\n  border-radius: 20px;\n  box-shadow: 0 0 10px #515970;\n  font-family: Roboto;\n}\n.volumeslider {\n  position: absolute;\n  background: #515970;\n  cursor: pointer;\n  width: 85%;\n  height: 5px;\n  top: 12px;\n  left: 12px;\n}\n\n.time-stamp {\n  position: absolute;\n  top: -50px;\n  color: #fff;\n  background: #434b60;\n  text-align: center;\n  width: 110px;\n  line-height: 30px;\n  left: 50%;\n  margin-left: -50px;\n  padding-top: 0;\n  height: 30px;\n  font-size: 15px;\n  border-radius: 20px;\n  box-shadow: 0 0 10px #515970;\n  font-family: Roboto;\n}\n\n.controls-bar {\n  width: 100%;\n  height: 95%;\n}\n.controls-bar .row {\n  height: 100%;\n}\n.button {\n  color: #ffffff;\n  text-align: center;\n}\n.button i {\n  font-size: 2em;\n  cursor: pointer;\n  transition: all .5s;\n}\n")




























































































































































































































































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

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div id=\"controls\">\n  <transition name=\"fade\">\n    <div class=\"time-stamp\" v-show=\"isTimestampShow\">{{currentTrackTime | formatTime}} / {{totalTrackTime | formatTime}}</div>\n  </transition>\n\n  <transition name=\"fade\">\n    <div class=\"volume-wrap no-app-drag\" v-show=\"isVolumesliderShow\">\n      <input name=\"volumeslider\" type=\"range\">\n    </div>\n  </transition>\n\n  <input name=\"timeslider\" type=\"range\">\n  <div class=\"controls-bar\">\n    <div class=\"row middle-xs\">\n      <div class=\"col-xs-3\">\n        <div class=\"box button\"><i class=\"material-icons\" @click=\"downloadTrack\">file_download</i></div>\n      </div>\n      <div class=\"col-xs-2\">\n        <div class=\"box button\"><i class=\"material-icons\" @click=\"backHistory\">skip_previous</i></div>\n      </div>\n      <div class=\"col-xs-2\">\n        <div class=\"box button\">\n          <i class=\"material-icons\" @click=\"clickBtnPlay\">{{getIconBtnPlay}}</i>\n        </div>\n      </div>\n      <div class=\"col-xs-2\">\n        <div class=\"box button\"><i class=\"material-icons\" @click=\"nextHistory\">skip_next</i></div>\n      </div>\n      <div class=\"col-xs-3\">\n        <div class=\"box button\">\n          <i class=\"material-icons\" @click=\"clickBtnSound\">volume_up</i>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n#controls {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 20%;\n  background: #434b60;\n  border-radius: 0 0 10px 10px;\n}\n.timeslider {\n  width: 100%;\n  position: relative;\n  height: 5%;\n  background: #515970;\n  cursor: pointer;\n}\n.timeslider:hover {\n  height: 10%;\n}\n.timeslider-fill, .volumeslider-fill {\n  position: relative;\n  height: 100%;\n  background: #2196F3;\n}\n.timeslider-handle, .volumeslider-handle {\n  width: 10px;\n  height: 100%;\n  background: #2196F3;\n  position: absolute;\n}\n.volume-wrap {\n  position: absolute;\n  left: 50%;\n  width: 50%;\n  height: 30px;\n  margin-left: -25%;\n  bottom: 115%;\n  color: #fff;\n  background: #434b60;\n  text-align: center;\n  line-height: 30px;\n  padding-top: 0;\n  font-size: 15px;\n  border-radius: 20px;\n  box-shadow: 0 0 10px #515970;\n  font-family: Roboto;\n}\n.volumeslider {\n  position: absolute;\n  background: #515970;\n  cursor: pointer;\n  width: 85%;\n  height: 5px;\n  top: 12px;\n  left: 12px;\n}\n\n.time-stamp {\n  position: absolute;\n  top: -50px;\n  color: #fff;\n  background: #434b60;\n  text-align: center;\n  width: 110px;\n  line-height: 30px;\n  left: 50%;\n  margin-left: -50px;\n  padding-top: 0;\n  height: 30px;\n  font-size: 15px;\n  border-radius: 20px;\n  box-shadow: 0 0 10px #515970;\n  font-family: Roboto;\n}\n\n.controls-bar {\n  width: 100%;\n  height: 95%;\n}\n.controls-bar .row {\n  height: 100%;\n}\n.button {\n  color: #ffffff;\n  text-align: center;\n}\n.button i {\n  font-size: 2em;\n  cursor: pointer;\n  transition: all .5s;\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-69e130d8", module.exports)
  } else {
    hotAPI.update("_v-69e130d8", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}